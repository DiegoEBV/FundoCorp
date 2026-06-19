import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelemetryService } from '../../services/telemetry.service';
import { FundoService } from '../../services/fundo.service';
import { LecturaSensor, Fundo } from '../../models';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  // Filtros locales
  selectedFundoId = signal<number | string>('TODOS');
  filtroValvula = signal<string>('TODOS'); // 'TODOS', 'ABIERTO', 'CERRADO'
  searchQuery = signal<string>('');

  // Notificación de descarga exitosa
  descargaCompletada = signal<string | null>(null);

  // Lista de fundos disponibles
  fundos = computed(() => this.fundoService.fundos());

  // Lecturas históricas completas
  todasLasLecturas = computed(() => this.telemetryService.lecturas());

  // Lecturas filtradas
  lecturasFiltradas = computed(() => {
    let list = this.todasLasLecturas();
    const fundoId = this.selectedFundoId();
    const valv = this.filtroValvula();
    const search = this.searchQuery().toLowerCase().trim();

    // 1. Filtrar por Fundo
    if (fundoId !== 'TODOS') {
      // Obtener los controladores asociados a los gateways del fundo seleccionado
      const gatewaysDelFundo = this.fundoService.gateways()
        .filter(g => g.idFundo === Number(fundoId))
        .map(g => g.idGateway);
      
      const controladoresDelFundo = this.fundoService.controladores()
        .filter(c => gatewaysDelFundo.includes(c.idGateway))
        .map(c => c.idControlador);

      list = list.filter(l => controladoresDelFundo.includes(l.idControlador));
    }

    // 2. Filtrar por Estado de Válvula
    if (valv !== 'TODOS') {
      const targetState = valv === 'ABIERTO';
      list = list.filter(l => l.valvula === targetState);
    }

    // 3. Filtrar por búsqueda textual (ID controlador o fecha)
    if (search !== '') {
      list = list.filter(l => 
        l.idControlador.toString().includes(search) || 
        l.fechaHora.includes(search)
      );
    }

    // Retornar ordenados por fecha descendente
    return [...list].sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
  });

  constructor(
    private telemetryService: TelemetryService,
    private fundoService: FundoService
  ) {}

  // Buscar el nombre del controlador en base a su ID
  getControladorNombre(idControlador: number): string {
    const ctrl = this.fundoService.controladores().find(c => c.idControlador === idControlador);
    return ctrl ? ctrl.nombre : `Dispositivo #${idControlador}`;
  }

  // Exportar reporte real en formato PDF o CSV
  exportarReporte(tipo: 'PDF' | 'CSV', norma: string): void {
    const fundosList = this.fundoService.fundos();
    const selectedFundo = this.selectedFundoId();
    const fundoNombre = selectedFundo === 'TODOS' 
      ? 'Todos los Fundos' 
      : fundosList.find(f => f.idFundo === Number(selectedFundo))?.nombre || 'Todos los Fundos';

    const lecturas = this.lecturasFiltradas();

    if (tipo === 'CSV') {
      this.exportarCSV(lecturas);
    } else {
      this.exportarPDF(lecturas, norma, fundoNombre);
    }

    this.descargaCompletada.set(
      `Exitoso: Reporte telemétrico bajo la norma ${norma} generado en formato ${tipo} para el ${fundoNombre}. Descargado correctamente.`
    );

    // Ocultar notificación tras 5 segundos
    setTimeout(() => {
      this.descargaCompletada.set(null);
    }, 5500);
  }

  // Generar y descargar archivo CSV
  private exportarCSV(lecturas: LecturaSensor[]): void {
    const encabezados = [
      'ID Lectura',
      'ID Controlador',
      'Controlador',
      'Humedad Promedio (%)',
      'Humedad 30cm (%)',
      'Humedad 60cm (%)',
      'Humedad 90cm (%)',
      'Radiacion (W/m2)',
      'Conductividad (dS/m)',
      'Temperatura (C)',
      'Valvula (Riego)',
      'Fecha y Hora'
    ];

    const filas = lecturas.map(l => [
      l.idLectura,
      l.idControlador,
      `"${this.getControladorNombre(l.idControlador)}"`,
      l.humedad,
      l.humedad30,
      l.humedad60,
      l.humedad90,
      l.radiacion,
      l.conductividad,
      l.temperatura,
      l.valvula ? 'ABIERTO' : 'CERRADO',
      `"${new Date(l.fechaHora).toLocaleString()}"`
    ]);

    const contenidoCSV = '\ufeff' + [ // Añadimos BOM para soporte de caracteres especiales en Excel
      encabezados.join(','),
      ...filas.map(f => f.join(','))
    ].join('\n');

    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_telemetria_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Generar y descargar archivo PDF
  private exportarPDF(lecturas: LecturaSensor[], norma: string, fundoNombre: string): void {
    const doc = new jsPDF();
    
    // Configurar título y metadatos con diseño premium
    doc.setFillColor(37, 99, 235); // Fondo azul para la cabecera
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ICASMART-WATER REPORT", 14, 18);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Sistema de Gestión e Historial de Telemetría Hídrica", 14, 25);
    doc.text(`FundoCorp - Ica, Perú`, 14, 31);
    
    // Metadatos a la derecha en la cabecera
    doc.setFontSize(9);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 130, 18);
    doc.text(`Fundo: ${fundoNombre}`, 130, 24);
    doc.text(`Norma: ${norma}`, 130, 30);
    
    doc.setTextColor(30, 41, 59); // Restablecer color de texto principal (Slate 800)
    
    // Título de Sección
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Historial de Lecturas Telemétricas de Sensores", 14, 52);
    
    // Línea divisoria
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setLineWidth(0.5);
    doc.line(14, 56, 196, 56);
    
    // Encabezado de tabla
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    let y = 64;
    
    doc.text("ID LECTURA", 14, y);
    doc.text("DISPOSITIVO / CONTROLADOR", 40, y);
    doc.text("HUM. PROM", 95, y);
    doc.text("PERFIL (30/60/90)", 118, y);
    doc.text("RAD. SOLAR", 152, y);
    doc.text("RIEGO", 178, y);
    
    doc.line(14, y + 3, 196, y + 3);
    doc.setFont("helvetica", "normal");
    y += 10;
    
    // Contenido de tabla
    lecturas.forEach((l) => {
      // Paginación si sobrepasa la página
      if (y > 275) {
        doc.addPage();
        y = 25;
        
        // Cabecera secundaria simple
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139); // Slate 500
        doc.text(`Reporte Hídrico - ${norma} - Fundo: ${fundoNombre}`, 14, 15);
        doc.line(14, 18, 196, 18);
        
        // Encabezados de tabla en nueva página
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text("ID LECTURA", 14, y);
        doc.text("DISPOSITIVO / CONTROLADOR", 40, y);
        doc.text("HUM. PROM", 95, y);
        doc.text("PERFIL (30/60/90)", 118, y);
        doc.text("RAD. SOLAR", 152, y);
        doc.text("RIEGO", 178, y);
        
        doc.line(14, y + 3, 196, y + 3);
        doc.setFont("helvetica", "normal");
        y += 10;
      }
      
      const dispositivo = this.getControladorNombre(l.idControlador);
      const perfil = `${l.humedad30}% / ${l.humedad60}% / ${l.humedad90}%`;
      const riegoEstado = l.valvula ? 'ABIERTO' : 'CERRADO';
      
      doc.setFontSize(8);
      doc.text(`#${l.idLectura}`, 14, y);
      doc.text(dispositivo, 40, y);
      doc.text(`${l.humedad}%`, 95, y);
      doc.text(perfil, 118, y);
      doc.text(`${l.radiacion} W/m²`, 152, y);
      doc.text(riegoEstado, 178, y);
      
      // Línea divisoria muy sutil entre filas
      doc.setDrawColor(241, 245, 249); // Slate 100
      doc.line(14, y + 2, 196, y + 2);
      
      y += 8;
    });
    
    // Guardar archivo PDF
    const filename = `reporte_${norma.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${new Date().getTime()}.pdf`;
    doc.save(filename);
  }
}

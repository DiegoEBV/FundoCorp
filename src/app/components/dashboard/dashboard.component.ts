import { Component, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetryService } from '../../services/telemetry.service';
import { FundoService } from '../../services/fundo.service';
import { ControlService } from '../../services/control.service';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexDataLabels,
  ApexTheme
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  theme: ApexTheme;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('chart') chart!: ChartComponent;

  refrescando = signal(false);

  // Computes de estado de los Gateways
  totalGateways = computed(() => this.fundoService.gateways().length);
  gatewaysActivos = computed(() => this.fundoService.gateways().filter(g => g.estado === 'ACTIVO').length);
  
  // Computes de controladores
  totalControladores = computed(() => this.fundoService.controladores().length);

  // Computes de lecturas actuales promedio
  lecturasActuales = computed(() => {
    const todas = this.telemetryService.lecturas();
    // Obtener la última lectura de cada controlador (201 a 205)
    const ultimasMap: Record<number, any> = {};
    todas.forEach(l => {
      if (!ultimasMap[l.idControlador] || new Date(l.fechaHora) > new Date(ultimasMap[l.idControlador].fechaHora)) {
        ultimasMap[l.idControlador] = l;
      }
    });
    return Object.values(ultimasMap);
  });

  // Humedad del suelo promedio actual en todo el fundo
  humedadPromedio = computed(() => {
    const actual = this.lecturasActuales();
    if (actual.length === 0) return 0;
    const sum = actual.reduce((acc, curr) => acc + curr.humedad, 0);
    return Math.round(sum / actual.length);
  });

  // Radiación solar actual promedio
  radiacionActual = computed(() => {
    const actual = this.lecturasActuales();
    if (actual.length === 0) return 0;
    // Filtrar controladores de campo (ej. 201, 202, 204)
    const campo = actual.filter(l => [201, 202, 204].includes(l.idControlador));
    if (campo.length === 0) return 0;
    const sum = campo.reduce((acc, curr) => acc + curr.radiacion, 0);
    return Math.round(sum / campo.length);
  });

  // Contador de electroválvulas abiertas
  valvulasAbiertas = computed(() => {
    const actual = this.lecturasActuales();
    return actual.filter(l => l.valvula === true).length;
  });

  // Indicador de última actualización en segundos transcurridos
  tiempoTranscurridoText = signal('Justo ahora');

  // Cálculos de Ahorro basados en el Informe Técnico de Ica (para 100 hectáreas de uva de mesa)
  // Consumo base anual: 1,200,000 m3 de agua. Ahorro de 35%. Costo bombeo: $0.50 por m3.
  ahorroAguaPorcentaje = 35.2; // %
  aguaAhorradaM3 = computed(() => {
    // Generar un número dinámico incremental para el efecto visual "premium"
    const segundos = new Date().getSeconds();
    const baseAhorro = 420000; // m3 anuales de ahorro para el fundo
    const ahorroPorSegundo = baseAhorro / (365 * 24 * 60 * 60);
    // Simular un contador en vivo desde el inicio del día
    const horasHoy = new Date().getHours();
    const minutosHoy = new Date().getMinutes();
    const totalSegundosHoy = (horasHoy * 3600) + (minutosHoy * 60) + segundos;
    return parseFloat((totalSegundosHoy * ahorroPorSegundo).toFixed(2));
  });

  dolaresAhorrados = computed(() => {
    // Ahorro económico es de $0.50 por m3
    return parseFloat((this.aguaAhorradaM3() * 0.50).toFixed(2));
  });

  // Alertas dinámicas basadas en el estado del sensor
  alertasCriticas = computed(() => {
    const actual = this.lecturasActuales();
    const list: Array<{ tipo: 'danger' | 'warning' | 'info'; msg: string; hora: string }> = [];

    // Alerta de inactividad de gateway
    const inactivo = this.fundoService.gateways().some(g => g.estado === 'INACTIVO');
    if (inactivo) {
      list.push({
        tipo: 'warning',
        msg: 'Red LoRaWAN: Gateway Dragino (Pisco Alto) reporta estado INACTIVO',
        hora: 'Hace 5 minutos'
      });
    }

    // Alerta de baja humedad (estrés hídrico)
    actual.forEach(l => {
      if (l.humedad < 25 && [201, 202, 204].includes(l.idControlador)) {
        list.push({
          tipo: 'danger',
          msg: `Estrés Hídrico: Humedad crítica del suelo en Sector ${l.idControlador === 201 ? '1' : l.idControlador === 202 ? '2' : '3'} (${l.humedad}%)`,
          hora: 'Hace 1 minuto'
        });
      }
    });

    // Alerta de radiación solar alta
    const radMax = Math.max(...actual.map(l => l.radiacion));
    if (radMax > 800) {
      list.push({
        tipo: 'info',
        msg: `Evapotranspiración Crítica: Radiación solar superior a 800 W/m² (${radMax} W/m²). Se recomienda programar turno de riego preventivo.`,
        hora: 'Justo ahora'
      });
    }

    // Si no hay alertas de peligro, agregar avisos estándar
    if (list.length === 0) {
      list.push({
        tipo: 'info',
        msg: 'Sistema operando normalmente. No se detectan anomalías de telemetría.',
        hora: 'Hace 10 minutos'
      });
    }

    return list;
  });

  // Opciones de Gráfico de ApexCharts
  chartOptionsHum: Partial<ChartOptions> | any;
  chartOptionsRad: Partial<ChartOptions> | any;

  constructor(
    private telemetryService: TelemetryService,
    private fundoService: FundoService,
    private controlService: ControlService
  ) {
    this.inicializarGraficos();
    this.iniciarTemporizadorActualizacion();
  }

  private inicializarGraficos(): void {
    // Configuración de gráfico de Humedad
    this.chartOptionsHum = {
      series: [
        {
          name: 'Humedad Suelo Promedio',
          data: [28, 29, 31, 30, 28, 27, 26, 28, 32, 33, 31, 30]
        }
      ],
      chart: {
        height: 240,
        type: 'area',
        toolbar: { show: false },
        animations: { enabled: true }
      },
      colors: ['#2563eb'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        categories: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        labels: { style: { colors: '#64748b' } }
      },
      grid: {
        borderColor: 'rgba(100, 116, 139, 0.1)',
        strokeDashArray: 4
      },
      dataLabels: { enabled: false },
      theme: { mode: 'light' }
    };

    // Configuración de gráfico de Radiación Solar
    this.chartOptionsRad = {
      series: [
        {
          name: 'Radiación Solar (W/m²)',
          data: [0, 0, 0, 50, 200, 500, 800, 750, 480, 120, 10, 0]
        }
      ],
      chart: {
        height: 240,
        type: 'line',
        toolbar: { show: false }
      },
      colors: ['#f59e0b'],
      stroke: {
        curve: 'straight',
        width: 2.5
      },
      xaxis: {
        categories: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        labels: { style: { colors: '#64748b' } }
      },
      grid: {
        borderColor: 'rgba(100, 116, 139, 0.1)',
        strokeDashArray: 4
      },
      dataLabels: { enabled: false },
      theme: { mode: 'light' }
    };
  }

  private iniciarTemporizadorActualizacion(): void {
    // Actualizar el texto del temporizador cada 5 segundos
    setInterval(() => {
      const ahora = new Date();
      const dif = ahora.getTime() - this.telemetryService.ultimaActualizacion().getTime();
      const segundos = Math.floor(dif / 1000);

      if (segundos < 10) {
        this.tiempoTranscurridoText.set('Justo ahora');
      } else if (segundos < 60) {
        this.tiempoTranscurridoText.set(`Hace ${segundos} segundos`);
      } else {
        const minutos = Math.floor(segundos / 60);
        this.tiempoTranscurridoText.set(`Hace ${minutos} min`);
      }
    }, 5000);
  }

  // Refrescar manualmente
  manualRefresh(): void {
    this.refrescando.set(true);
    this.telemetryService.refrescarTelemetria().subscribe(() => {
      setTimeout(() => {
        this.refrescando.set(false);
      }, 800);
    });
  }
}

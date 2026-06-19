import { Component, Input, OnChanges, SimpleChanges, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetryService } from '../../../services/telemetry.service';
import { LecturaSensor } from '../../../models';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexGrid,
  ApexDataLabels,
  ApexTooltip,
  ApexMarkers,
  ApexTheme
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  markers: ApexMarkers;
  colors: string[];
  theme: ApexTheme;
};

@Component({
  selector: 'app-grafico-humedad',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './grafico-humedad.component.html',
  styleUrl: './grafico-humedad.component.css'
})
export class GraficoHumedadComponent implements OnChanges {
  @Input() idControlador!: number;
  @ViewChild('chart') chartComponent!: ChartComponent;

  // Signal con las lecturas históricas obtenidas
  lecturasHistoricas = signal<LecturaSensor[]>([]);

  // Computes de métricas actuales
  ultimaLectura = computed(() => {
    const list = this.lecturasHistoricas();
    if (list.length === 0) return null;
    return list[list.length - 1];
  });

  // Opciones de configuración de ApexCharts
  chartOptions: Partial<ChartOptions> | any = null;

  constructor(private telemetryService: TelemetryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idControlador'] && this.idControlador) {
      this.cargarHistorico();
    }
  }

  cargarHistorico(): void {
    this.telemetryService.getHistoricoControlador(this.idControlador).subscribe(data => {
      // Ordenar por fecha ascendente para el gráfico
      const ordenado = [...data].sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime());
      this.lecturasHistoricas.set(ordenado);
      this.actualizarGrafico(ordenado);
    });
  }

  actualizarGrafico(lecturas: LecturaSensor[]): void {
    if (lecturas.length === 0) {
      this.chartOptions = null;
      return;
    }

    const series30 = lecturas.map(l => l.humedad30);
    const series60 = lecturas.map(l => l.humedad60);
    const series90 = lecturas.map(l => l.humedad90);
    
    const categories = lecturas.map(l => {
      const date = new Date(l.fechaHora);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    this.chartOptions = {
      series: [
        { name: 'Humedad (30 cm)', data: series30 },
        { name: 'Humedad (60 cm)', data: series60 },
        { name: 'Humedad (90 cm)', data: series90 }
      ],
      chart: {
        height: 320,
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true }
      },
      colors: ['#3b82f6', '#10b981', '#f59e0b'], // Azul, Verde, Ámbar
      stroke: {
        curve: 'smooth',
        width: 3
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: categories,
        labels: { style: { colors: '#64748b' } }
      },
      grid: {
        borderColor: 'rgba(100, 116, 139, 0.1)',
        strokeDashArray: 4
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => `${val}% Humedad`
        }
      },
      markers: {
        size: 4,
        hover: { size: 6 }
      }
    };
  }

  // Formateador de fecha/hora
  formatearFecha(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString();
  }
}

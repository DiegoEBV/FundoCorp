import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoreoFiltrosComponent } from './monitoreo-filtros/monitoreo-filtros.component';
import { GraficoHumedadComponent } from './grafico-humedad/grafico-humedad.component';

@Component({
  selector: 'app-monitoreo',
  standalone: true,
  imports: [CommonModule, MonitoreoFiltrosComponent, GraficoHumedadComponent],
  templateUrl: './monitoreo.component.html',
  styleUrl: './monitoreo.component.css'
})
export class MonitoreoComponent {
  selectedControladorId = signal<number | null>(null);

  onControladorSeleccionado(id: number): void {
    if (id > 0) {
      this.selectedControladorId.set(id);
    } else {
      this.selectedControladorId.set(null);
    }
  }
}

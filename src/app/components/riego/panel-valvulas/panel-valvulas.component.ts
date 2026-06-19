import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlService, ValveStatus } from '../../../services/control.service';
import { FundoService } from '../../../services/fundo.service';
import { Controlador } from '../../../models';

@Component({
  selector: 'app-panel-valvulas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-valvulas.component.html',
  styleUrl: './panel-valvulas.component.css'
})
export class PanelValvulasComponent {
  // Obtener controladores filtrados de tipo válvula (Milesight UC511)
  valvulas = computed(() => {
    return this.fundoService.controladores().filter(c => c.modelo === 'Milesight UC511');
  });

  // Acceder a los estados reactivos de las válvulas desde el servicio
  estadosValvulas = computed(() => this.controlService.valvulasState());

  constructor(
    private controlService: ControlService,
    private fundoService: FundoService
  ) {}

  // Enviar comando de apertura o cierre
  operarValvula(idControlador: number, abrir: boolean): void {
    this.controlService.cambiarEstadoValvula(idControlador, abrir).subscribe();
  }

  // Obtener la clase del badge del estado actual
  getBadgeClass(status: ValveStatus): string {
    switch (status) {
      case 'abierto': return 'bg-success text-white';
      case 'cerrado': return 'bg-secondary text-white';
      case 'pendiente': return 'bg-warning text-dark';
      case 'error': return 'bg-danger text-white';
      default: return 'bg-secondary';
    }
  }

  // Obtener el texto legible del estado
  getStatusText(status: ValveStatus): string {
    switch (status) {
      case 'abierto': return 'Abierta (Riego Activo)';
      case 'cerrado': return 'Cerrada';
      case 'pendiente': return 'Transmitiendo comando...';
      case 'error': return 'Error de enlace';
      default: return 'Desconocido';
    }
  }
}

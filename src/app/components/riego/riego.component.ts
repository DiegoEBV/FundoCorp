import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelValvulasComponent } from './panel-valvulas/panel-valvulas.component';
import { PanelBombasComponent } from './panel-bombas/panel-bombas.component';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-riego',
  standalone: true,
  imports: [CommonModule, PanelValvulasComponent, PanelBombasComponent],
  templateUrl: './riego.component.html',
  styleUrl: './riego.component.css'
})
export class RiegoComponent {
  // Obtener reactivamente el modo de riego (manual o automático)
  esModoManual = computed(() => this.controlService.riegoManualMode());

  constructor(private controlService: ControlService) {}

  // Alternar el modo
  setModoRiego(manual: boolean): void {
    this.controlService.toggleModoRiego(manual).subscribe();
  }
}

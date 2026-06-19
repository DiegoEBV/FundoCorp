import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlService } from '../../../services/control.service';
import { FundoService } from '../../../services/fundo.service';

@Component({
  selector: 'app-panel-bombas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-bombas.component.html',
  styleUrl: './panel-bombas.component.css'
})
export class PanelBombasComponent {
  // Obtener controladores filtrados de tipo bomba (Advantech ECU-1251)
  bombas = computed(() => {
    return this.fundoService.controladores().filter(c => c.modelo === 'Advantech ECU-1251');
  });

  // Acceder a las velocidades de las bombas reactivamente
  velocidadesBombas = computed(() => this.controlService.bombasSpeed());

  constructor(
    private controlService: ControlService,
    private fundoService: FundoService
  ) {}

  // Actualizar velocidad por slider o número
  cambiarFrecuencia(idControlador: number, hz: any): void {
    const valor = Number(hz.target.value);
    this.controlService.ajustarVelocidadBomba(idControlador, valor).subscribe();
  }

  // Calcular porcentaje de potencia en base a 60Hz
  getPotenciaPorcentaje(hz: number): number {
    return Math.round((hz / 60) * 100);
  }
}

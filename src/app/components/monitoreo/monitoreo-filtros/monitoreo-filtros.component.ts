import { Component, Output, EventEmitter, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FundoService } from '../../../services/fundo.service';
import { Fundo, Gateway, Controlador } from '../../../models';

@Component({
  selector: 'app-monitoreo-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monitoreo-filtros.component.html',
  styleUrl: './monitoreo-filtros.component.css'
})
export class MonitoreoFiltrosComponent {
  @Output() controladorSeleccionado = new EventEmitter<number>();

  // Signals locales para selección
  selectedFundoId = signal<number | null>(null);
  selectedGatewayId = signal<number | null>(null);
  selectedControladorId = signal<number | null>(null);

  // Computes reactivos
  fundosList = computed(() => this.fundoService.fundos());
  
  gatewaysList = computed(() => {
    const fundoId = this.selectedFundoId();
    if (!fundoId) return [];
    return this.fundoService.gateways().filter(g => g.idFundo === Number(fundoId));
  });

  controladoresList = computed(() => {
    const gwId = this.selectedGatewayId();
    if (!gwId) return [];
    return this.fundoService.controladores().filter(c => c.idGateway === Number(gwId));
  });

  constructor(private fundoService: FundoService) {
    // Autoseleccionar primer fundo al cargar
    effect(() => {
      const fundos = this.fundosList();
      if (fundos.length > 0 && this.selectedFundoId() === null) {
        this.selectedFundoId.set(fundos[0].idFundo);
      }
    }, { allowSignalWrites: true });

    // Autoseleccionar primer gateway cuando cambia el fundo
    effect(() => {
      const gateways = this.gatewaysList();
      if (gateways.length > 0) {
        this.selectedGatewayId.set(gateways[0].idGateway);
      } else {
        this.selectedGatewayId.set(null);
      }
    }, { allowSignalWrites: true });

    // Autoseleccionar primer controlador cuando cambia el gateway
    effect(() => {
      const controladores = this.controladoresList();
      if (controladores.length > 0) {
        const firstId = controladores[0].idControlador;
        this.selectedControladorId.set(firstId);
        this.controladorSeleccionado.emit(firstId);
      } else {
        this.selectedControladorId.set(null);
        this.controladorSeleccionado.emit(0);
      }
    }, { allowSignalWrites: true });
  }

  onFundoChange(event: any): void {
    const id = Number(event.target.value);
    this.selectedFundoId.set(id);
  }

  onGatewayChange(event: any): void {
    const id = Number(event.target.value);
    this.selectedGatewayId.set(id);
  }

  onControladorChange(event: any): void {
    const id = Number(event.target.value);
    this.selectedControladorId.set(id);
    this.controladorSeleccionado.emit(id);
  }
}

import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FundoService } from '../../services/fundo.service';
import { Fundo, Gateway, Controlador, Usuario, UsuarioFundo } from '../../models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  // Tab activo
  activeTab = signal<'fundos' | 'gateways' | 'controladores' | 'usuarios'>('fundos');

  // Signals reactivos del servicio
  fundos = computed(() => this.fundoService.fundos());
  gateways = computed(() => this.fundoService.gateways());
  controladores = computed(() => this.fundoService.controladores());
  usuarios = computed(() => this.fundoService.usuarios());
  asignaciones = computed(() => this.fundoService.asignaciones());

  // Formulario Fundo
  nuevoFundo = { nombre: '', ubicacion: '', hectareas: 0 };
  
  // Formulario Gateway
  nuevoGateway = { idGateway: 0, idFundo: 0, modelo: '', ipGateway: '', estado: 'ACTIVO' as const, ubicacion: '' };

  // Formulario Controlador
  nuevoControlador = { idControlador: 0, idGateway: 0, nombre: '', modelo: '', ubicacion: '' };

  // Formulario Asignación
  nuevaAsignacion = { idFundo: 0, idUsuario: 0 };

  constructor(private fundoService: FundoService) {
    this.resetForms();
  }

  resetForms(): void {
    this.nuevoFundo = { nombre: '', ubicacion: '', hectareas: 100 };
    this.nuevoGateway = { idGateway: 106, idFundo: 1, modelo: 'Milesight UG67', ipGateway: '192.168.0.27', estado: 'ACTIVO', ubicacion: 'Lote Nuevo' };
    this.nuevoControlador = { idControlador: 206, idGateway: 101, nombre: 'Controlador Nuevo', modelo: 'Milesight UC511', ubicacion: 'Lote A' };
    this.nuevaAsignacion = { idFundo: 1, idUsuario: 1 };
  }

  // --- Operaciones Fundo ---
  guardarFundo(): void {
    if (!this.nuevoFundo.nombre || !this.nuevoFundo.ubicacion) return;
    this.fundoService.addFundo(this.nuevoFundo).subscribe(() => {
      this.resetForms();
    });
  }

  eliminarFundo(id: number): void {
    this.fundoService.deleteFundo(id).subscribe();
  }

  // --- Operaciones Gateway ---
  guardarGateway(): void {
    if (!this.nuevoGateway.modelo || !this.nuevoGateway.ipGateway) return;
    this.nuevoGateway.idGateway = Math.max(0, ...this.fundoService.gateways().map(g => g.idGateway)) + 1;
    this.nuevoGateway.idFundo = Number(this.nuevoGateway.idFundo);
    this.fundoService.addGateway({ ...this.nuevoGateway }).subscribe(() => {
      this.resetForms();
    });
  }

  eliminarGateway(id: number): void {
    this.fundoService.deleteGateway(id).subscribe();
  }

  // --- Operaciones Controlador ---
  guardarControlador(): void {
    if (!this.nuevoControlador.nombre || !this.nuevoControlador.modelo) return;
    this.nuevoControlador.idControlador = Math.max(0, ...this.fundoService.controladores().map(c => c.idControlador)) + 1;
    this.nuevoControlador.idGateway = Number(this.nuevoControlador.idGateway);
    this.fundoService.addControlador({ ...this.nuevoControlador }).subscribe(() => {
      this.resetForms();
    });
  }

  eliminarControlador(id: number): void {
    this.fundoService.deleteControlador(id).subscribe();
  }

  // --- Operaciones Asignaciones ---
  guardarAsignacion(): void {
    this.nuevaAsignacion.idFundo = Number(this.nuevaAsignacion.idFundo);
    this.nuevaAsignacion.idUsuario = Number(this.nuevaAsignacion.idUsuario);
    const fecha = new Date().toISOString().split('T')[0];
    
    this.fundoService.asignarUsuarioFundo({
      ...this.nuevaAsignacion,
      fechaAsignacion: fecha
    }).subscribe(() => {
      this.resetForms();
    });
  }

  eliminarAsignacion(idFundo: number, idUsuario: number): void {
    this.fundoService.desasignarUsuarioFundo(idFundo, idUsuario).subscribe();
  }

  // Helpers para nombres en listas
  getFundoNombre(idFundo: number): string {
    return this.fundos().find(f => f.idFundo === idFundo)?.nombre || `Fundo #${idFundo}`;
  }

  getUsuarioNombre(idUsuario: number): string {
    return this.usuarios().find(u => u.idUsuario === idUsuario)?.nombres || `Usuario #${idUsuario}`;
  }

  getGatewayNombre(idGateway: number): string {
    return this.gateways().find(g => g.idGateway === idGateway)?.modelo || `Gateway #${idGateway}`;
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Fundo, Gateway, Controlador, Usuario, UsuarioFundo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FundoService {
  private apiUrl = 'http://localhost:8080/api/fundos';

  // Signals para gestionar el estado global reactivamente
  readonly fundos = signal<Fundo[]>([]);
  readonly gateways = signal<Gateway[]>([]);
  readonly controladores = signal<Controlador[]>([]);
  readonly usuarios = signal<Usuario[]>([]);
  readonly asignaciones = signal<UsuarioFundo[]>([]);

  constructor(private http: HttpClient) {
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {
    // Datos semilla iniciales basados en agroexpor.sql y el informe técnico
    const mockFundos: Fundo[] = [
      { idFundo: 1, nombre: 'Fundo Villacurí Grande', ubicacion: 'Ica - Villacurí', hectareas: 2200 },
      { idFundo: 2, nombre: 'Fundo Salas Guadalupe', ubicacion: 'Ica - Salas', hectareas: 1500 },
      { idFundo: 3, nombre: 'Fundo Chincha Sur', ubicacion: 'Chincha - El Carmen', hectareas: 800 },
      { idFundo: 4, nombre: 'Fundo Pisco Alto', ubicacion: 'Pisco - Humay', hectareas: 500 }
    ];

    const mockGateways: Gateway[] = [
      { idFundo: 1, idGateway: 101, modelo: 'Milesight UG67', ipGateway: '192.168.0.22', estado: 'ACTIVO', ubicacion: 'Caseta Principal Villacurí' },
      { idFundo: 1, idGateway: 102, modelo: 'Milesight UG67', ipGateway: '192.168.0.23', estado: 'ACTIVO', ubicacion: 'Pozo 2 Villacurí' },
      { idFundo: 2, idGateway: 103, modelo: 'RAK WisGate Edge Pro', ipGateway: '192.168.0.24', estado: 'ACTIVO', ubicacion: 'Caseta Control Salas' },
      { idFundo: 3, idGateway: 104, modelo: 'Dragino DLOS8N', ipGateway: '192.168.0.25', estado: 'ACTIVO', ubicacion: 'Sector A Chincha' },
      { idFundo: 4, idGateway: 105, modelo: 'Milesight UG67', ipGateway: '192.168.0.26', estado: 'INACTIVO', ubicacion: 'Límite Norte Pisco' }
    ];

    const mockControladores: Controlador[] = [
      { idControlador: 201, idGateway: 101, nombre: 'Controlador Válvula Sector 1', modelo: 'Milesight UC511', ubicacion: 'Válvula Sector 1 - Lote A' },
      { idControlador: 202, idGateway: 101, nombre: 'Controlador Válvula Sector 2', modelo: 'Milesight UC511', ubicacion: 'Válvula Sector 2 - Lote A' },
      { idControlador: 203, idGateway: 102, nombre: 'Bomba Pozo Profundo 1', modelo: 'Advantech ECU-1251', ubicacion: 'Pozo 1 - Estación Eléctrica' },
      { idControlador: 204, idGateway: 103, nombre: 'Controlador Válvula Sector 3', modelo: 'Milesight UC511', ubicacion: 'Válvula Sector 3 - Salas Lote B' },
      { idControlador: 205, idGateway: 203, nombre: 'Bomba Pozo Profundo 2', modelo: 'Advantech ECU-1251', ubicacion: 'Pozo 2 - Salas Lote B' }
    ];

    const mockUsuarios: Usuario[] = [
      { idUsuario: 1, nombres: 'Diego Ballon', correo: 'diego.ballon@fundocorp.com', rol: 'AGRONOMO' },
      { idUsuario: 2, nombres: 'Peter Pacherres', correo: 'peter.pacherres@ana.gob.pe', rol: 'REGULADOR' },
      { idUsuario: 3, nombres: 'Sergio Saavedra', correo: 'sergio.saavedra@fundocorp.com', rol: 'GERENTE' },
      { idUsuario: 4, nombres: 'Alessandro Bravo', correo: 'alessandro.bravo@fundocorp.com', rol: 'AGRONOMO' }
    ];

    const mockAsignaciones: UsuarioFundo[] = [
      { idFundo: 1, idUsuario: 1, fechaAsignacion: '2026-01-10' },
      { idFundo: 1, idUsuario: 3, fechaAsignacion: '2026-01-05' },
      { idFundo: 2, idUsuario: 4, fechaAsignacion: '2026-02-15' },
      { idFundo: 3, idUsuario: 1, fechaAsignacion: '2026-03-01' }
    ];

    this.fundos.set(mockFundos);
    this.gateways.set(mockGateways);
    this.controladores.set(mockControladores);
    this.usuarios.set(mockUsuarios);
    this.asignaciones.set(mockAsignaciones);
  }

  // Métodos CRUD para Fundos
  addFundo(fundo: Omit<Fundo, 'idFundo'>): Observable<Fundo> {
    const nuevoFundo: Fundo = {
      ...fundo,
      idFundo: Math.max(0, ...this.fundos().map(f => f.idFundo)) + 1
    };
    this.fundos.update(list => [...list, nuevoFundo]);
    return of(nuevoFundo);
  }

  updateFundo(fundo: Fundo): Observable<Fundo> {
    this.fundos.update(list => list.map(f => f.idFundo === fundo.idFundo ? fundo : f));
    return of(fundo);
  }

  deleteFundo(id: number): Observable<boolean> {
    this.fundos.update(list => list.filter(f => f.idFundo !== id));
    return of(true);
  }

  // Métodos CRUD para Gateways
  addGateway(gw: Gateway): Observable<Gateway> {
    this.gateways.update(list => [...list, gw]);
    return of(gw);
  }

  updateGateway(gw: Gateway): Observable<Gateway> {
    this.gateways.update(list => list.map(g => g.idGateway === gw.idGateway ? gw : g));
    return of(gw);
  }

  deleteGateway(id: number): Observable<boolean> {
    this.gateways.update(list => list.filter(g => g.idGateway !== id));
    return of(true);
  }

  // Métodos CRUD para Controladores
  addControlador(ctrl: Controlador): Observable<Controlador> {
    this.controladores.update(list => [...list, ctrl]);
    return of(ctrl);
  }

  updateControlador(ctrl: Controlador): Observable<Controlador> {
    this.controladores.update(list => list.map(c => c.idControlador === ctrl.idControlador ? ctrl : c));
    return of(ctrl);
  }

  deleteControlador(id: number): Observable<boolean> {
    this.controladores.update(list => list.filter(c => c.idControlador !== id));
    return of(true);
  }

  // Métodos CRUD para Asignaciones
  asignarUsuarioFundo(asig: UsuarioFundo): Observable<UsuarioFundo> {
    this.asignaciones.update(list => {
      const existe = list.some(a => a.idFundo === asig.idFundo && a.idUsuario === asig.idUsuario);
      if (existe) return list;
      return [...list, asig];
    });
    return of(asig);
  }

  desasignarUsuarioFundo(idFundo: number, idUsuario: number): Observable<boolean> {
    this.asignaciones.update(list => list.filter(a => !(a.idFundo === idFundo && a.idUsuario === idUsuario)));
    return of(true);
  }
}

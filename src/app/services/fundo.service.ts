import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Fundo, Gateway, Controlador, Usuario, UsuarioFundo } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundoService {
  private apiUrl = environment.apiUrl;

  // Signals para gestionar el estado global reactivamente
  readonly fundos = signal<Fundo[]>([]);
  readonly gateways = signal<Gateway[]>([]);
  readonly controladores = signal<Controlador[]>([]);
  readonly usuarios = signal<Usuario[]>([]);
  readonly asignaciones = signal<UsuarioFundo[]>([]);

  constructor(private http: HttpClient) {
    this.cargarDatosIniciales();
  }

  // Cargar el estado inicial desde la API de Spring Boot
  private cargarDatosIniciales(): void {
    forkJoin({
      fundos: this.http.get<Fundo[]>(`${this.apiUrl}/fundos`),
      gateways: this.http.get<Gateway[]>(`${this.apiUrl}/gateways`),
      controladores: this.http.get<Controlador[]>(`${this.apiUrl}/controladores`),
      usuarios: this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`),
      asignaciones: this.http.get<UsuarioFundo[]>(`${this.apiUrl}/usuarios/asignaciones`)
    }).subscribe(({ fundos, gateways, controladores, usuarios, asignaciones }) => {
      this.fundos.set(fundos);
      this.gateways.set(gateways);
      this.controladores.set(controladores);
      this.usuarios.set(usuarios);
      this.asignaciones.set(asignaciones);
    });
  }

  // Métodos CRUD para Fundos
  addFundo(fundo: Omit<Fundo, 'idFundo'>): Observable<Fundo> {
    return this.http.post<Fundo>(`${this.apiUrl}/fundos`, fundo).pipe(
      tap(nuevoFundo => this.fundos.update(list => [...list, nuevoFundo]))
    );
  }

  updateFundo(fundo: Fundo): Observable<Fundo> {
    return this.http.put<Fundo>(`${this.apiUrl}/fundos/${fundo.idFundo}`, fundo).pipe(
      tap(actualizado => this.fundos.update(list => list.map(f => f.idFundo === actualizado.idFundo ? actualizado : f)))
    );
  }

  deleteFundo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/fundos/${id}`).pipe(
      tap(() => this.fundos.update(list => list.filter(f => f.idFundo !== id)))
    );
  }

  // Métodos CRUD para Gateways
  addGateway(gw: Gateway): Observable<Gateway> {
    return this.http.post<Gateway>(`${this.apiUrl}/gateways`, gw).pipe(
      tap(nuevoGateway => this.gateways.update(list => [...list, nuevoGateway]))
    );
  }

  updateGateway(gw: Gateway): Observable<Gateway> {
    return this.http.put<Gateway>(`${this.apiUrl}/gateways/${gw.idGateway}`, gw).pipe(
      tap(actualizado => this.gateways.update(list => list.map(g => g.idGateway === actualizado.idGateway ? actualizado : g)))
    );
  }

  deleteGateway(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/gateways/${id}`).pipe(
      tap(() => this.gateways.update(list => list.filter(g => g.idGateway !== id)))
    );
  }

  // Métodos CRUD para Controladores
  addControlador(ctrl: Controlador): Observable<Controlador> {
    return this.http.post<Controlador>(`${this.apiUrl}/controladores`, ctrl).pipe(
      tap(nuevoControlador => this.controladores.update(list => [...list, nuevoControlador]))
    );
  }

  updateControlador(ctrl: Controlador): Observable<Controlador> {
    return this.http.put<Controlador>(`${this.apiUrl}/controladores/${ctrl.idControlador}`, ctrl).pipe(
      tap(actualizado => this.controladores.update(list => list.map(c => c.idControlador === actualizado.idControlador ? actualizado : c)))
    );
  }

  deleteControlador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/controladores/${id}`).pipe(
      tap(() => this.controladores.update(list => list.filter(c => c.idControlador !== id)))
    );
  }

  // Métodos CRUD para Asignaciones
  asignarUsuarioFundo(asig: UsuarioFundo): Observable<UsuarioFundo> {
    return this.http.post<UsuarioFundo>(
      `${this.apiUrl}/usuarios/fundo/${asig.idFundo}/asignar/${asig.idUsuario}`, {}
    ).pipe(
      tap(nuevaAsignacion => this.asignaciones.update(list => {
        const existe = list.some(a => a.idFundo === nuevaAsignacion.idFundo && a.idUsuario === nuevaAsignacion.idUsuario);
        if (existe) return list;
        return [...list, nuevaAsignacion];
      }))
    );
  }

  desasignarUsuarioFundo(idFundo: number, idUsuario: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/fundo/${idFundo}/desasignar/${idUsuario}`).pipe(
      tap(() => this.asignaciones.update(list => list.filter(a => !(a.idFundo === idFundo && a.idUsuario === idUsuario))))
    );
  }
}

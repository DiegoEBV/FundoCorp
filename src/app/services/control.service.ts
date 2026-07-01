import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type ValveStatus = 'abierto' | 'cerrado' | 'pendiente' | 'error';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private apiUrl = `${environment.apiUrl}/control`;

  // Signals para gestionar el estado de las electroválvulas en la interfaz
  // Llave: idControlador, Valor: Estado actual ('abierto' | 'cerrado' | 'pendiente' | 'error')
  readonly valvulasState = signal<Record<number, ValveStatus>>({
    201: 'cerrado',
    202: 'cerrado',
    204: 'cerrado'
  });

  // Signals para gestionar la velocidad de las bombas (variadores VFD en Hz, 0 a 60 Hz)
  readonly bombasSpeed = signal<Record<number, number>>({
    203: 45, // Pozo 1 operando a 45 Hz
    205: 0   // Pozo 2 apagado (0 Hz)
  });

  // Signal para gestionar el modo del controlador de riego (Automático o Manual)
  readonly riegoManualMode = signal<boolean>(true); // Por defecto manual en la consola

  constructor(private http: HttpClient) {}

  // Enviar comando para abrir o cerrar una electroválvula (POST /api/control/valvula)
  cambiarEstadoValvula(idControlador: number, abrir: boolean): Observable<ValveStatus> {
    // 1. Cambiar el estado en la UI a 'pendiente' inmediatamente para reflejar la latencia LoRaWAN
    this.valvulasState.update(states => ({
      ...states,
      [idControlador]: 'pendiente'
    }));

    return this.http.post<{ estado: string }>(`${this.apiUrl}/valvula`, { idControlador, abrir }).pipe(
      map(res => res.estado as ValveStatus),
      tap(status => {
        // 2. Al recibir la confirmación del backend, actualizamos el estado final en el Signal
        this.valvulasState.update(states => ({
          ...states,
          [idControlador]: status
        }));
      }),
      catchError(err => {
        this.valvulasState.update(states => ({
          ...states,
          [idControlador]: 'error'
        }));
        return throwError(() => err);
      })
    );
  }

  // Ajustar la velocidad de frecuencia en un variador de frecuencia de pozo (POST /api/control/bomba)
  ajustarVelocidadBomba(idControlador: number, hz: number): Observable<number> {
    const velocidadValida = Math.max(0, Math.min(60, hz));

    return this.http.post<{ idControlador: number; velocidad: number }>(`${this.apiUrl}/bomba`, {
      idControlador,
      velocidadValida
    }).pipe(
      map(res => res.velocidad),
      tap(velocidad => {
        this.bombasSpeed.update(speeds => ({
          ...speeds,
          [idControlador]: velocidad
        }));
      })
    );
  }

  // Alternar entre modo Automático e Inteligente (IoT Cloud) y Manual (estado solo de UI)
  toggleModoRiego(manual: boolean): Observable<boolean> {
    this.riegoManualMode.set(manual);
    return of(manual);
  }
}

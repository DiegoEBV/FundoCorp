import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export type ValveStatus = 'abierto' | 'cerrado' | 'pendiente' | 'error';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private apiUrl = 'http://localhost:8080/api/control';

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

  // Enviar comando para abrir o cerrar una electroválvula con simulación de latencia de red
  cambiarEstadoValvula(idControlador: number, abrir: boolean): Observable<ValveStatus> {
    // 1. Cambiar el estado en la UI a 'pendiente' inmediatamente para reflejar la latencia LoRaWAN
    this.valvulasState.update(states => ({
      ...states,
      [idControlador]: 'pendiente'
    }));

    // Simulación del endpoint de Spring Boot que enviará el mensaje MQTT
    // return this.http.post<ValveStatus>(`${this.apiUrl}/valvula`, { idControlador, abrir }).pipe( ... );

    const estadoFinal: ValveStatus = abrir ? 'abierto' : 'cerrado';

    // Retornamos un observable con retraso (delay) de 3 segundos para simular el viaje de ida y vuelta LoRaWAN
    return of(estadoFinal).pipe(
      delay(3000), 
      tap(status => {
        // 2. Al recibir la confirmación, actualizamos el estado final en el Signal
        this.valvulasState.update(states => ({
          ...states,
          [idControlador]: status
        }));
      })
    );
  }

  // Ajustar la velocidad de frecuencia en un variador de frecuencia de pozo (Delta MS300 VFD)
  ajustarVelocidadBomba(idControlador: number, hz: number): Observable<number> {
    // Validar rangos (0 a 60 Hz)
    const velocidadValida = Math.max(0, Math.min(60, hz));

    // Si es 0 Hz, la válvula/bomba se apaga virtualmente
    // return this.http.post<number>(`${this.apiUrl}/bomba`, { idControlador, velocidadValida }).pipe( ... );

    this.bombasSpeed.update(speeds => ({
      ...speeds,
      [idControlador]: velocidadValida
    }));

    return of(velocidadValida);
  }

  // Alternar entre modo Automático e Inteligente (IoT Cloud) y Manual
  toggleModoRiego(manual: boolean): Observable<boolean> {
    this.riegoManualMode.set(manual);
    return of(manual);
  }
}

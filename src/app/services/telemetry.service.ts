import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LecturaSensor } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  private apiUrl = `${environment.apiUrl}/telemetry`;

  // Signals para almacenar la telemetría en tiempo real
  readonly lecturas = signal<LecturaSensor[]>([]);

  // Última actualización global del sistema
  readonly ultimaActualizacion = signal<Date>(new Date());

  constructor(private http: HttpClient) {
    this.cargarTelemetriaInicial();
    this.iniciarSimulacionEnvios();
  }

  // Cargar el historial real de telemetría desde el backend (GET /api/telemetry)
  private cargarTelemetriaInicial(): void {
    this.http.get<LecturaSensor[]>(this.apiUrl).subscribe(lecturas => {
      this.lecturas.set(lecturas);
      this.ultimaActualizacion.set(new Date());
    });
  }

  // Generar una lectura de sensor con fluctuaciones realistas basadas en el tipo de controlador/zona
  private crearLecturaAleatoria(idControlador: number, fecha: Date): LecturaSensor {
    // Definición de rangos según controlador
    let hum30 = 25 + Math.random() * 15; // Humedad promedio
    let hum60 = 20 + Math.random() * 10;
    let hum90 = 15 + Math.random() * 8;
    let rad = 0; // Radiación nocturna por defecto
    let cond = 1.2 + Math.random() * 0.4;
    let temp = 16 + Math.random() * 6;
    let valvState = false;

    const hora = fecha.getHours();

    // Simular radiación y temperatura diurna
    if (hora >= 6 && hora <= 18) {
      // Pico de radiación a mediodía (12:00)
      const factorRadiacion = Math.sin((hora - 6) * Math.PI / 12);
      rad = Math.round(factorRadiacion * 850 + Math.random() * 50);
      temp = Math.round(20 + factorRadiacion * 12 + Math.random() * 3);
    } else {
      temp = Math.round(14 + Math.random() * 4);
    }

    // Variaciones específicas por zona
    if (idControlador === 201 || idControlador === 202) {
      // Sector Villacurí
      hum30 = 32 + Math.sin(fecha.getTime() / 100000) * 5 + Math.random() * 2;
      hum60 = 28 + Math.sin(fecha.getTime() / 200000) * 3 + Math.random() * 1.5;
      hum90 = 25 + Math.random() * 2;
      valvState = idControlador === 201 ? (hora >= 22 || hora <= 2) : false; // Riego nocturno
    } else if (idControlador === 203 || idControlador === 205) {
      // Bombas de pozo
      hum30 = 40 + Math.random() * 5;
      hum60 = 38 + Math.random() * 3;
      hum90 = 35 + Math.random() * 2;
      valvState = true; // Bomba encendida
    } else {
      // Salas Guadalupe
      hum30 = 22 + Math.random() * 4;
      hum60 = 19 + Math.random() * 3;
      hum90 = 16 + Math.random() * 2;
    }

    // Asegurar límites en porcentaje de humedad
    hum30 = Math.max(0, Math.min(100, Math.round(hum30)));
    hum60 = Math.max(0, Math.min(100, Math.round(hum60)));
    hum90 = Math.max(0, Math.min(100, Math.round(hum90)));

    return {
      idLectura: Math.floor(Math.random() * 10000000),
      idControlador,
      humedad: Math.round((hum30 + hum60 + hum90) / 3),
      humedad30: hum30,
      humedad60: hum60,
      humedad90: hum90,
      radiacion: rad,
      conductividad: parseFloat(cond.toFixed(2)),
      temperatura: parseFloat(temp.toFixed(1)),
      valvula: valvState,
      fechaHora: fecha.toISOString()
    };
  }

  // Simular la llegada de nuevos paquetes de sensores mientras no exista una pasarela LoRaWAN/MQTT
  // real conectada al backend. Estas lecturas son solo de UI y no se persisten en la base de datos.
  private iniciarSimulacionEnvios(): void {
    setInterval(() => {
      const controladores = [201, 202, 203, 204, 205];
      const ahora = new Date();

      const nuevasLecturas = controladores.map(idCtrl => this.crearLecturaAleatoria(idCtrl, ahora));

      // Actualizar el Signal agregando las nuevas lecturas al final del historial
      this.lecturas.update(prev => {
        // Mantener solo los últimos 150 registros para evitar consumo de memoria
        const combinadas = [...prev, ...nuevasLecturas];
        if (combinadas.length > 150) {
          return combinadas.slice(combinadas.length - 150);
        }
        return combinadas;
      });

      this.ultimaActualizacion.set(ahora);
    }, 30000); // 30 segundos
  }

  // Filtrar lecturas históricas por controlador (GET /api/telemetry/controlador/{id})
  getHistoricoControlador(idControlador: number): Observable<LecturaSensor[]> {
    return this.http.get<LecturaSensor[]>(`${this.apiUrl}/controlador/${idControlador}`);
  }

  // Refrescar la telemetría desde el backend
  refrescarTelemetria(): Observable<LecturaSensor[]> {
    return this.http.get<LecturaSensor[]>(this.apiUrl).pipe(
      tap(lecturas => {
        this.lecturas.set(lecturas);
        this.ultimaActualizacion.set(new Date());
      })
    );
  }
}

import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LecturaSensor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  private apiUrl = 'http://localhost:8080/api/telemetry';

  // Signals para almacenar la telemetría en tiempo real
  readonly lecturas = signal<LecturaSensor[]>([]);
  
  // Última actualización global del sistema
  readonly ultimaActualizacion = signal<Date>(new Date());

  constructor(private http: HttpClient) {
    this.generarTelemetriaSemilla();
    this.iniciarSimulacionEnvios();
  }

  // Generar datos iniciales históricos de telemetría (últimas 24 horas por ejemplo)
  private generarTelemetriaSemilla(): void {
    const baseLecturas: LecturaSensor[] = [];
    const fechaBase = new Date();

    // Generar lecturas históricas para los controladores 201, 202, 203, 204, 205
    const controladores = [201, 202, 203, 204, 205];
    
    // Generar 12 puntos de datos históricos (cada 2 horas) por controlador
    for (let i = 12; i >= 0; i--) {
      const fecha = new Date(fechaBase.getTime() - i * 2 * 60 * 60 * 1000);
      
      controladores.forEach(idCtrl => {
        baseLecturas.push(this.crearLecturaAleatoria(idCtrl, fecha));
      });
    }

    this.lecturas.set(baseLecturas);
    this.ultimaActualizacion.set(fechaBase);
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

  // Simular la llegada de nuevos paquetes de sensores (cada 30 segundos en UI para demostración, simula los 15 min de LoRaWAN)
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

  // Filtrar lecturas históricas por controlador para ApexCharts
  getHistoricoControlador(idControlador: number): Observable<LecturaSensor[]> {
    // return this.http.get<LecturaSensor[]>(`${this.apiUrl}/controlador/${idControlador}`);
    const historico = this.lecturas().filter(l => l.idControlador === idControlador);
    return of(historico);
  }

  // Simular un trigger de refresco manual
  refrescarTelemetria(): Observable<boolean> {
    const ahora = new Date();
    const controladores = [201, 202, 203, 204, 205];
    const nuevasLecturas = controladores.map(idCtrl => this.crearLecturaAleatoria(idCtrl, ahora));

    this.lecturas.update(prev => [...prev, ...nuevasLecturas]);
    this.ultimaActualizacion.set(ahora);
    return of(true);
  }
}

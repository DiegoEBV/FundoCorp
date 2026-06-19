export interface Usuario {
  idUsuario: number;
  nombres: string;
  correo: string;
  rol: 'AGRONOMO' | 'GERENTE' | 'REGULADOR';
}

export interface Fundo {
  idFundo: number;
  nombre: string;
  ubicacion: string;
  hectareas: number;
}

export interface Gateway {
  idFundo: number;
  idGateway: number;
  modelo: string;
  ipGateway: string;
  estado: 'ACTIVO' | 'INACTIVO';
  ubicacion: string;
}

export interface Controlador {
  idControlador: number;
  idGateway: number;
  nombre: string;
  modelo: string;
  ubicacion: string;
}

export interface LecturaSensor {
  idLectura: number;
  idControlador: number;
  humedad: number;      // Humedad del suelo % (promedio o a 30cm)
  humedad30: number;    // Sensor a 30cm %
  humedad60: number;    // Sensor a 60cm %
  humedad90: number;    // Sensor a 90cm %
  radiacion: number;    // Radiación solar W/m2
  conductividad: number; // Conductividad eléctrica dS/m
  temperatura: number;  // Temperatura ambiental °C
  valvula: boolean;     // Estado de válvula (abierta/cerrada)
  fechaHora: string;    // Fecha y hora del registro
}

export interface UsuarioFundo {
  idFundo: number;
  idUsuario: number;
  fechaAsignacion: string;
}

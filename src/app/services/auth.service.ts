import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base del backend en Spring Boot (configurable)
  private apiUrl = 'http://localhost:8080/api/auth';

  // Signals para reactividad moderna
  readonly currentUser = signal<Usuario | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly userRole = computed(() => this.currentUser()?.rol || null);

  constructor(private http: HttpClient) {
    this.loadSession();
  }

  // Cargar sesión guardada en LocalStorage
  private loadSession(): void {
    const savedUser = localStorage.getItem('usuario_sesion');
    if (savedUser) {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('usuario_sesion');
      }
    }
  }

  // Simulación de inicio de sesión (con preparación para HTTP Real de Spring Boot)
  login(correo: string, contrasena: string): Observable<Usuario> {
    // Si queremos habilitar la conexión directa a Spring Boot, descomentar la siguiente línea:
    // return this.http.post<Usuario>(`${this.apiUrl}/login`, { correo, contrasena }).pipe( ... );

    // Simulación del login (Mock data basada en roles definidos)
    let mockUser: Usuario;

    if (correo.includes('agronomo')) {
      mockUser = {
        idUsuario: 1,
        nombres: 'Diego Ballon (Agrónomo de Riego)',
        correo: correo,
        rol: 'AGRONOMO'
      };
    } else if (correo.includes('regulador') || correo.includes('ana')) {
      mockUser = {
        idUsuario: 2,
        nombres: 'Peter Pacherres (Evaluador ANA)',
        correo: correo,
        rol: 'REGULADOR'
      };
    } else {
      mockUser = {
        idUsuario: 3,
        nombres: 'Sergio Saavedra (Gerente de Producción)',
        correo: correo,
        rol: 'GERENTE'
      };
    }

    return of(mockUser).pipe(
      tap(user => {
        this.currentUser.set(user);
        localStorage.setItem('usuario_sesion', JSON.stringify(user));
      })
    );
  }

  // Cerrar sesión
  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('usuario_sesion');
  }

  // Helper para verificar roles
  hasRole(roles: ('AGRONOMO' | 'GERENTE' | 'REGULADOR')[]): boolean {
    const current = this.currentUser();
    if (!current) return false;
    return roles.includes(current.rol);
  }
}

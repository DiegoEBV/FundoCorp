import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

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

  // Inicio de sesión contra el backend Spring Boot (POST /api/auth/login)
  login(correo: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
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

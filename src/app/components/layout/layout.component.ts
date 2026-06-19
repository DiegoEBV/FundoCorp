import { Component, signal, effect, computed } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarOpen = signal(false);
  darkMode = signal(false);
  
  // Conexión simulada al backend Spring Boot
  backendConnected = signal(true);

  // Obtener reactivamente datos del usuario
  usuarioNombres = computed(() => this.authService.currentUser()?.nombres || 'Usuario');
  usuarioRol = computed(() => this.authService.currentUser()?.rol || 'AGRONOMO');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Detectar y configurar el tema inicial
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      this.darkMode.set(true);
      document.body.setAttribute('data-theme', 'dark');
    } else {
      this.darkMode.set(false);
      document.body.removeAttribute('data-theme');
    }

    // Efecto reactivo para escribir el tema cuando cambia
    effect(() => {
      if (this.darkMode()) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Alternar el tema claro/oscuro
  toggleTheme(): void {
    this.darkMode.update(mode => !mode);
  }

  // Alternar apertura de barra lateral
  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Helper para verificar rol de usuario
  verificarRol(roles: string[]): boolean {
    const rolActual = this.usuarioRol();
    return roles.includes(rolActual);
  }
}

import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);
  loading = signal(false);
  selectedRole = signal<'agronomo' | 'gerente' | 'regulador' | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(4)]]
    });

    // Sincronizar selección de rol si se modifican los campos
    this.loginForm.valueChanges.subscribe(() => {
      const { correo, contrasena } = this.loginForm.value;
      const agronomoMatch = correo === 'agronomo@fundocorp.com' && contrasena === 'agronomo123';
      const gerenteMatch = correo === 'gerente@fundocorp.com' && contrasena === 'gerente123';
      const reguladorMatch = correo === 'regulador@ana.gob.pe' && contrasena === 'regulador123';
      
      if (agronomoMatch) {
        this.selectedRole.set('agronomo');
      } else if (gerenteMatch) {
        this.selectedRole.set('gerente');
      } else if (reguladorMatch) {
        this.selectedRole.set('regulador');
      } else {
        this.selectedRole.set(null);
      }
    });
  }

  // Alternar visibilidad de contraseña
  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  // Cargar credenciales preestablecidas para demostración rápida
  cargarDemoCredenciales(rol: 'agronomo' | 'gerente' | 'regulador'): void {
    this.selectedRole.set(rol);
    if (rol === 'agronomo') {
      this.loginForm.patchValue({
        correo: 'agronomo@fundocorp.com',
        contrasena: 'agronomo123'
      });
    } else if (rol === 'gerente') {
      this.loginForm.patchValue({
        correo: 'gerente@fundocorp.com',
        contrasena: 'gerente123'
      });
    } else if (rol === 'regulador') {
      this.loginForm.patchValue({
        correo: 'regulador@ana.gob.pe',
        contrasena: 'regulador123'
      });
    }
    this.errorMessage.set(null);
  }

  // Enviar el formulario de login
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Por favor, ingrese un correo válido y contraseña.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const { correo, contrasena } = this.loginForm.value;

    // Simular retraso de red
    setTimeout(() => {
      this.authService.login(correo, contrasena).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set('Credenciales incorrectas o error de conexión con Spring Boot.');
        }
      });
    }, 1000);
  }
}

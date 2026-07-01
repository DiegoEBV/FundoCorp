# IcaSmart-Water - FundoCorp

## Descripción General
**IcaSmart-Water** es la plataforma premium de FundoCorp para la gestión inteligente, monitorización telemétrica y control automatizado de recursos hídricos en el acuífero de Ica, Perú. 

Diseñado con una arquitectura moderna bajo **Angular**, el sistema permite visualizar en tiempo real la humedad del suelo a distintas profundidades, regular las bombas de pozo profundo mediante variadores de frecuencia, simular la automatización de riego basada en IA (en AWS Cloud) y asegurar el cumplimiento normativo exigido por la Autoridad Nacional del Agua (ANA).

---

## Características Principales

1. **Dashboard en Tiempo Real**: Resumen de indicadores clave de telemetría (humedad promedio, radiación solar, conductividad eléctrica y temperatura) con gráficos interactivos dinámicos provistos por ApexCharts.
2. **Monitoreo IoT Avanzado**: Grilla y filtros detallados por Fundo, Gateway LoRaWAN y Controlador de Telemetría para auditar lecturas históricas de sensores de perfil de suelo (a 30cm, 60cm y 90cm).
3. **Consola de Actuadores y Riego**:
   - Apertura y cierre de electroválvulas solenoide (Hunter PGV) con confirmación de estado a través de la red.
   - Ajuste de frecuencia en variadores (Delta MS300) mediante deslizadores interactivos (0 a 60 Hz) simulando el protocolo Modbus RS-485.
   - Alternancia entre Control Manual y Control Automatizado Inteligente (Edge computing con Advantech ECU-1251 y AWS).
4. **Módulo de Reportes Normativos (Descargas Reales)**:
   - **Exportar CSV**: Genera archivos estructurados UTF-8 (con soporte para acentos) compatibles con Microsoft Excel.
   - **Descargar PDF**: Genera informes vectoriales formales y paginados (usando `jsPDF`) bajo las normativas hídricas *R.J. N° 0092-2026-ANA* y *R.J. N° 0010-2025-ANA*.
5. **Administración Completa (CRUD)**: Configuración dinámica de Fundos, Gateways, Controladores y asignación de personal técnico.
6. **Diseño Visual Premium**:
   - Soporte para **Modo Claro** y **Modo Oscuro** de alto contraste.
   - Menú lateral (Sidebar) autodesplegable mediante eventos de cursor (Hover) en escritorio, con adaptabilidad completa en pantallas táctiles y móviles.

---

## Pila Tecnológica
- **Framework**: Angular (Componentes Standalone)
- **Reactividad**: Angular Signals (`signal`, `computed`, `effect`)
- **Estilos**: Bootstrap (CSS Vanilla Premium)
- **Iconos**: Bootstrap Icons
- **Gráficos**: ApexCharts (`ng-apexcharts`)
- **Generación de PDF**: `jsPDF`
- **Gestión de Rutas**: Angular Router con Guards de Autenticación (`AuthGuard`)

---

## Estructura del Código
```text
src/app/
├── components/
│   ├── admin/            # CRUD de configuración (Fundo, Gateways, Dispositivos)
│   ├── dashboard/        # Métricas de consumo y gráficos de humedad
│   ├── layout/           # Estructura principal, barra de navegación, tema y sidebar hover
│   ├── login/            # Acceso con carga de credenciales demo de un solo clic
│   ├── monitoreo/        # Filtros de red IoT y tabla histórica de sensores
│   ├── riego/            # Control manual de electroválvulas y deslizadores de bombas VFD
│   └── reportes/         # Descarga de reportes en PDF/CSV para la ANA e ISO 27001
├── guards/
│   └── auth.guard.ts     # Control de acceso por roles y estado de sesión
├── models/
│   └── index.ts          # Modelos de interfaces (Usuario, LecturaSensor, Fundo, etc.)
├── services/
│   ├── auth.service.ts   # Autenticación contra el backend Spring Boot (POST /api/auth/login)
│   ├── fundo.service.ts  # CRUD de fundos, gateways, controladores, usuarios y asignaciones
│   ├── control.service.ts# Comandos de válvulas/bombas contra /api/control
│   └── telemetry.service.ts # Lecturas reales desde /api/telemetry + simulación visual en vivo
├── app.routes.ts         # Definición de rutas hijas e integración de Lazy Loading
└── styles.css            # Hoja de estilos global y variables de tema claro/oscuro

src/environments/
├── environment.ts        # Configuración de desarrollo (apiUrl -> http://localhost:8080/api)
└── environment.prod.ts   # Configuración de producción (apiUrl -> backend en Render)
```

---

## Requisitos Previos
- Node.js (versión 18 o superior recomendada)
- npm (administrador de paquetes)
- El backend [FundoCorp_Backend](https://github.com/DiegoEBV/FundoCorp_Backend) corriendo (local o en Render)

---

## Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo** (usa `src/environments/environment.ts`, `apiUrl: http://localhost:8080/api`):
   ```bash
   npm start
   ```
   *El portal se compilará y estará disponible en `http://localhost:4200/`.*

3. **Compilar para producción** (usa `src/environments/environment.prod.ts` vía `fileReplacements`):
   ```bash
   npm run build -- --configuration=production
   ```
   *Los archivos optimizados de distribución se generarán en `dist/FundoCorp-Front/browser`.*

---

## Conexión con el backend

Los servicios (`auth`, `fundo`, `control`, `telemetry`) consumen la API REST de Spring Boot mediante
`HttpClient`, usando la URL base definida en `src/environments/environment.ts` (desarrollo) y
`environment.prod.ts` (producción). Antes de desplegar, actualiza `environment.prod.ts` con la URL
real del backend en Render, por ejemplo:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://fundocorp-backend.onrender.com/api'
};
```

---

## Despliegue en Netlify

El repositorio incluye `netlify.toml` con el comando de build, el directorio de publicación
(`dist/FundoCorp-Front/browser`) y una regla de redirección para el enrutamiento de Angular (SPA).
Basta con conectar el repositorio en Netlify; no se requiere configuración manual adicional salvo
mantener `environment.prod.ts` actualizado con la URL del backend.

---

## Credenciales de Acceso de Demostración
El portal de login cuenta con botones de **acceso rápido** para probar los diferentes perfiles del sistema
(coinciden con los usuarios semilla del backend, ver `DataSeeder.java`):

| Rol | Correo Corporativo | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Agrónomo** | `agronomo@fundocorp.com` | `123456` | Control de riego, telemetría y reportes. |
| **Gerente** | `gerente@fundocorp.com` | `123456` | Acceso total (Control, Reportes, Administración CRUD). |
| **Regulador (ANA)** | `regulador@ana.gob.pe` | `123456` | Solo lectura de telemetría y descarga de reportes normativos. |

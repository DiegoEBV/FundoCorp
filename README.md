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
│   ├── auth.service.ts   # Autenticación simulada / conexión preparada a Spring Boot
│   ├── fundo.service.ts  # Datos de fundos, gateways y controladores activos
│   ├── control.service.ts# Estado de riego (Modo automático/manual, variadores)
│   └── telemetry.service.ts # Simulador de telemetría de sensores cada 30 segundos
├── app.routes.ts         # Definición de rutas hijas e integración de Lazy Loading
└── styles.css            # Hoja de estilos global y variables de tema claro/oscuro
```

---

## Requisitos Previos
- Node.js (versión 18 o superior recomendada)
- npm (administrador de paquetes)

---

## Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo**:
   ```bash
   npm start
   ```
   *El portal se compilará y estará disponible en `http://localhost:4200/`.*

3. **Compilar para producción**:
   ```bash
   npm run build
   ```
   *Los archivos optimizados de distribución se generarán en la carpeta `dist/FundoCorp-Front`.*

---

## Credenciales de Acceso de Demostración
El portal de login cuenta con botones de **acceso rápido** para probar los diferentes perfiles del sistema:

| Rol | Correo Corporativo | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Agrónomo** | `agronomo@fundocorp.com` | `agronomo123` | Control de riego, telemetría y reportes. |
| **Gerente** | `gerente@fundocorp.com` | `gerente123` | Acceso total (Control, Reportes, Administración CRUD). |
| **Regulador (ANA)** | `regulador@ana.gob.pe` | `regulador123` | Solo lectura de telemetría y descarga de reportes normativos. |

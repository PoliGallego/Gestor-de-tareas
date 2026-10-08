# Gestor de tareas

Aplicación de gestión de tareas desarrollada como un monorepo con múltiples frontends y servicios backend desacoplados. El proyecto combina React + TypeScript para la experiencia de usuario, Java + Spring Boot para la lógica del negocio y PostgreSQL para el entorno local.

## Descripción general

Este repositorio centraliza la construcción de una plataforma para administrar tareas con diferentes módulos de experiencia:

- autenticación y registro de usuarios
- home y landing page
- panel principal con gestión visual de tareas
- dashboard de información y métricas
- reportes de actividad
- biblioteca compartida de componentes reutilizables

La estructura está pensada para separar responsabilidades por módulo, facilitando el desarrollo paralelo de cada parte del sistema.

## Stack tecnológico

- Frontend: React 19, Vite, TypeScript
- Component library: biblioteca local en `ReactLibrary`
- Backend: Java 21, Spring Boot, Spring Web MVC, Spring Data JPA
- Base de datos: PostgreSQL 16
- Gestión de dependencias: npm y Maven
<!-- - Contenedores: Docker Compose -->

## Estructura del repositorio

<!-- ├── .env
├── dockercompose.yml -->
```text
Gestor-de-tareas/
├── ReactLibrary/
├── Login/
│   ├── login-backend/
│   └── login-frontend/
├── Dashboard/
│   ├── dashboard-backend/
│   └── dashboard-frontend/
├── Home/
├── Principal/
├── Panel/
├── Reportes/
├── SignUp/
└── README.md
```

Principales módulos:

- [ReactLibrary](./ReactLibrary) — componentes reutilizables compartidos por los frontends.
- [Login/login-frontend](./Login/login-frontend) — interfaz de login.
- [Login/login-backend](./Login/login-backend) — API de autenticación.
- [Dashboard/dashboard-frontend](./Dashboard/dashboard-frontend) — panel de gestión y resumen.
- [Dashboard/dashboard-backend](./Dashboard/dashboard-backend) — backend del dashboard.
- [Principal](./Principal) — frontend principal del sistema.
- [Reportes](./Reportes) — módulo de reportes.
- [Panel](./Panel) — registro y gestión de usuarios.
- [Home](./Home) — landing page inicial.
- [SignUp](./SignUp) — flujo de registro.

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js 18+ o superior
- npm
- Java 21
- Maven
- Docker y Docker Compose
- Git

## Configuración inicial

1. Clona el repositorio:

```bash
git clone https://github.com/PoliGallego/Gestor-de-tareas.git
cd Gestor-de-tareas
```

2. Inicializa submodulos si los necesitas:

```bash
git submodule update --init --recursive
```

<!-- 3. Configura las variables de entorno del proyecto. El repositorio ya incluye un archivo `.env` en la raíz con la configuración base para desarrollo local.

Variables relevantes:

```env
AUTH_BACK_PORT=8090
PANEL_BACK_PORT=8081
PROFILE_BACK_PORT=8082
REPORT_BACK_PORT=8083
LOGIN_PORT=3000
SIGNUP_PORT=3010
PRIN_PORT=3020
PROFILE_PORT=3030
REPORT_PORT=3040
HOME_PORT=3050
DB_URL=jdbc:postgresql://postgres_db:5432/tasks_db
DB_USERNAME=postgres
DB_PASSWORD=postgres123
``` -->

<!-- ## Levantar la base de datos

El proyecto incluye un `dockercompose.yml` para levantar PostgreSQL junto con el servicio de autenticación backend.

```bash
docker compose up -d
```

Esto dejará disponible la base de datos en el puerto `5432` y el backend de autenticación en el puerto configurado por `AUTH_BACK_PORT`. -->

## Ejecutar frontend

Cada frontend es un proyecto independiente con su propio `package.json`.

Ejemplos:

```bash
cd "Principal/principal-frontend"
npm install
npm run dev
```

Otros módulos se ejecutan de forma similar:

```bash
cd "Dashboard/dashboard-frontend/dashboard"
npm install
npm run dev
```

```bash
cd "Login/login-frontend/gestor-tareas-login-frontend/frontend/login-usuario"
npm install
npm run dev
```

```bash
cd "SignUp/signup-frontend/frontend/signup-usuario"
npm install
npm run dev
```

```bash
cd "Home/home-page"
npm install
npm run dev
```

```bash
cd "Reportes/reportes-frontend/reportes"
npm install
npm run dev
```

## Ejecutar backend

Los servicios backend están desarrollados con Spring Boot.

Ejemplo para el backend del dashboard:

```bash
cd "Dashboard/dashboard-backend/app"
./mvnw spring-boot:run
```

En Windows, usa:

```powershell
cd "Dashboard\dashboard-backend\app"
.\mvnw.cmd spring-boot:run
```

Algunos módulos backend adicionales del proyecto se ejecutan con el mismo patrón mediante Maven:

```bash
cd "Login/login-backend/gestor-tareas-login-usuario/login-usuario"
./mvnw spring-boot:run
```

```bash
cd "Reportes/app"
./mvnw spring-boot:run
```

## Compilar y validar

Para compilar un frontend React:

```bash
npm run build
```

Para compilar un backend Spring Boot:

```bash
./mvnw clean package
```

Para compilar la biblioteca compartida:

```bash
cd ReactLibrary
npm install
npm run build
```

## Convenciones de desarrollo

- Mantén los frontends desacoplados y reutiliza componentes desde `ReactLibrary` cuando sea posible.
- Usa variables de entorno para puertos y credenciales sensibles.
- Si agregas un nuevo módulo, documenta su ruta y su puerto de ejecución.
- Para desarrollo local evita editar directamente archivos de configuración compartidos sin revisar el impacto en todos los microfrontends.

## Licencia

Este proyecto no incluye una licencia explícita en este repositorio. Consulta con el equipo o el propietario del proyecto antes de reutilizarlo en producción o compartirlo públicamente.

## Proyecto relacionado

Repositorio principal:

- GitHub: https://github.com/PoliGallego/Gestor-de-tareas

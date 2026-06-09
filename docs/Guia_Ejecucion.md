# Manual Técnico de Ejecución

Este documento detalla los procedimientos necesarios para el despliegue y ejecución del proyecto, abarcando tanto el entorno contenedorizado mediante Docker Compose como el entorno de desarrollo local.

---

## 1. Ejecución mediante Docker Compose

Esta opción automatiza el despliegue de la infraestructura completa (Base de Datos PostgreSQL, API REST y Aplicación Cliente).

### Requisitos previos
- Docker Engine
- Docker Compose v2.x

### Configuración de Entorno
Antes de iniciar los contenedores, es necesario establecer las variables de entorno.
1. En el directorio raíz del proyecto (donde reside `docker-compose.yml`), crear un archivo `.env` con las variables requeridas por el backend:
   ```env
   JWT_SECRET=tu_secreto_seguro
   JWT_EXPIRES_IN=24h
   ```
2. En el directorio `frontend/`, crear o verificar el archivo `.env` con la URL del API (que será embebida durante la construcción de la imagen):
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Instrucciones de Despliegue
1. Ubicarse en el directorio raíz del proyecto.
2. Compilar las imágenes de los servicios:
   ```bash
   docker compose build
   ```
3. Levantar la infraestructura en segundo plano:
   ```bash
   docker compose up -d
   ```
   *Nota: El contenedor del backend está configurado para ejecutar automáticamente las migraciones estructurales de Prisma hacia la base de datos durante su inicialización.*

### Puntos de Acceso
- **Frontend (Interfaz de Usuario):** http://localhost:5173
- **Backend (API REST):** http://localhost:3000

Para detener y remover los contenedores de la memoria, ejecutar:
```bash
docker compose down
```

---

## 2. Ejecución Local Manual

Procedimiento para ejecutar los servicios de forma independiente para fines de evaluación técnica o depuración.

### Requisitos previos
- Node.js (v18.x o superior)
- `pnpm` (Gestor de paquetes)
- Docker (Exclusivo para proveer el servicio de base de datos)

### 2.1. Inicialización de la Base de Datos
Para garantizar la conectividad de los servicios, se debe iniciar el contenedor de PostgreSQL de forma aislada:
1. Desde la raíz del proyecto, ejecutar:
   ```bash
   docker compose up db -d
   ```

### 2.2. Configuración y Ejecución del Backend
1. Navegar al directorio del backend:
   ```bash
   cd backend
   ```
2. Instalar dependencias del servidor:
   ```bash
   pnpm install
   ```
3. Configurar las variables de entorno estableciendo un archivo `.env` en la raíz del backend:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/disagro_db?schema=public"
   JWT_SECRET=tu_secreto_seguro
   JWT_EXPIRES_IN=24h
   ```
4. Aplicar las migraciones del ORM Prisma hacia la base de datos local:
   ```bash
   pnpm prisma migrate dev
   ```
5. Iniciar el entorno de desarrollo del servidor:
   ```bash
   pnpm dev
   ```
   El servicio estará disponible recibiendo peticiones en `http://localhost:3000`.

### 2.3. Configuración y Ejecución del Frontend
1. En una nueva sesión de terminal, navegar al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instalar dependencias del cliente:
   ```bash
   pnpm install
   ```
3. Configurar las variables de entorno en el archivo `.env` del frontend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Iniciar el servidor de desarrollo (Vite):
   ```bash
   pnpm dev
   ```
   La aplicación cliente estará operativa en `http://localhost:5173`.

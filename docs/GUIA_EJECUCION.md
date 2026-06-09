# Guía de Ejecución del Proyecto Disagro

En este documento se explica cómo poner en marcha el proyecto (Frontend + Backend + Base de Datos), ya sea utilizando Docker Compose (recomendado) o de forma manual para desarrollo local.

---

## Opción 1: Ejecución con Docker Compose (Recomendado)

Esta es la forma más rápida y sencilla, ya que levanta la base de datos (PostgreSQL), el backend y el frontend automáticamente en contenedores aislados.

### Requisitos previos
- Docker instalado y ejecutándose.
- Docker Compose instalado.

### Pasos
1. Abre una terminal en la raíz del proyecto (donde se encuentra el archivo `docker-compose.yml`).
2. Si es la primera vez que lo corres o si hiciste cambios en el código/dependencias, construye las imágenes:
   ```bash
   docker-compose build
   ```
3. Levanta todos los servicios:
   ```bash
   docker-compose up -d
   ```
   *(La bandera `-d` lo ejecuta en segundo plano). El contenedor del backend aplicará las migraciones de la base de datos automáticamente al iniciar.*

### Accesos
- **Frontend:** http://localhost:5173
- **Backend (API):** http://localhost:3000

Para detener todos los servicios, simplemente ejecuta:
```bash
docker-compose down
```

---

## Opción 2: Ejecución Manual (Desarrollo Local)

Si deseas desarrollar o hacer debug paso a paso, puedes ejecutar cada servicio por separado.

### Requisitos previos
- Node.js (v18+)
- `pnpm` instalado (`npm install -g pnpm`)
- Docker (para levantar solo la base de datos localmente).

### 1. Levantar la Base de Datos Local
En lugar de levantar todos los servicios, solo levantaremos Postgres:
1. Desde la raíz del proyecto, ejecuta:
   ```bash
   docker-compose up db -d
   ```

### 2. Configuración del Backend

1. Abre una terminal y navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Configura tus variables de entorno. Asegúrate de tener un archivo `.env` en la carpeta `backend/` con las siguientes variables:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/disagro_db?schema=public"
   JWT_SECRET="tu_secreto_super_seguro"
   ```
4. Aplica las migraciones a tu base de datos:
   ```bash
   pnpm prisma migrate dev
   ```
   *(Opcional: Si tienes un seed, puedes correrlo con `pnpm prisma db seed` para tener datos de prueba).*
5. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
   *El backend estará escuchando en `http://localhost:3000`.*

### 2. Configuración del Frontend

1. Abre **otra** terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Configura tus variables de entorno. Si es necesario, crea un archivo `.env` en la carpeta `frontend/`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
   *El frontend estará disponible en `http://localhost:5173`.*

---

## 📁 Estructura de esta carpeta (`docs/`)
Puedes utilizar este directorio para guardar:
- Diagramas de Entidad-Relación (ERD) de la base de datos (`.png`, `.pdf`, `.drawio`).
- Documentación extra de APIs o manuales de usuario.
- Archivos de diseño o requerimientos.

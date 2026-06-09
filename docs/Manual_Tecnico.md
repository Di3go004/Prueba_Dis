# Manual Técnico - Catálogo Digital Disagro

## 1. Introducción
El presente documento describe la arquitectura, stack tecnológico, y la estructura interna del sistema "Catálogo Digital" desarrollado para Disagro. El sistema está concebido como una aplicación web moderna, escalable y robusta para la gestión de un inventario de productos agrícolas.

## 2. Arquitectura del Sistema
El sistema emplea un patrón de arquitectura **Cliente-Servidor** comunicándose a través de una API RESTful. El entorno está completamente dockerizado para asegurar la homogeneidad en desarrollo y producción.

*   **Frontend (Cliente):** Single Page Application (SPA) que consume los servicios de la API.
*   **Backend (Servidor):** API REST encargada de la lógica de negocio, validaciones y acceso a datos.
*   **Base de Datos:** Motor relacional para la persistencia segura e íntegra de la información.

## 3. Stack Tecnológico

### 3.1. Frontend
*   **Librería Principal:** React 19
*   **Entorno de Construcción:** Vite (por su rapidez en HMR y compilación).
*   **Lenguaje:** TypeScript (Asegura tipado estricto con `verbatimModuleSyntax`).
*   **Estilos:** Tailwind CSS v4 + Vanilla CSS (Variables y Design Tokens).
*   **Peticiones HTTP:** Axios (con interceptores para el manejo del token JWT).
*   **Enrutamiento:** React Router v7.

### 3.2. Backend
*   **Entorno de Ejecución:** Node.js v20.x
*   **Framework:** Express.js
*   **Lenguaje:** TypeScript
*   **Validación de Datos:** Zod (Esquemas de validación integrados como middleware).
*   **Seguridad:** JSON Web Tokens (JWT) para autenticación y `bcryptjs` para el hash de contraseñas.
*   **ORM:** Prisma v7.8 (Gestión de esquemas y migraciones).

### 3.3. Base de Datos
*   **Motor:** PostgreSQL 15

## 4. Estructura y Patrones de Diseño

### 4.1. Frontend (Atomic Design)
El código de la interfaz gráfica está estructurado siguiendo la metodología **Atomic Design**, lo que favorece la reutilización de código y la escalabilidad:
*   `atoms/`: Componentes indivisibles (Ej. `Button`, `Input`, `Badge`).
*   `molecules/`: Combinación de átomos (Ej. `FormField`, `ProductRow`).
*   `organisms/`: Componentes complejos funcionales (Ej. `Sidebar`, `ProductTable`, `AuthForm`).
*   `pages/`: Vistas completas a las que acceden las rutas (Ej. `ProductsPage`).

### 4.2. Backend (Arquitectura en Capas)
El backend aísla responsabilidades para que el código sea mantenible:
*   `routes/`: Definen las URL de la API y vinculan middlewares y controladores.
*   `controllers/`: Gestionan el objeto `req` y `res` (Entrada/Salida HTTP).
*   `services/`: Contienen la lógica de negocio pura y la comunicación con Prisma.
*   `middlewares/`: Bloques interceptores (Ej. `validate` para esquemas Zod, `verifyToken` para autenticación).

## 5. Endpoints de la API REST

A continuación se listan todos los endpoints expuestos por el backend para la comunicación con el cliente:

| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| **Auth** | | | |
| `POST` | `/auth/registrar` | Crea un nuevo administrador en el sistema | No |
| `POST` | `/auth/login` | Valida credenciales y retorna un Bearer JWT | No |
| **Productos** | | | |
| `GET` | `/products/listado` | Retorna el catálogo completo de productos | Sí (JWT) |
| `GET` | `/products/producto/:id` | Retorna los datos de un producto en específico | Sí (JWT) |
| `POST` | `/products/crear` | Crea un nuevo producto (Valida datos con Zod) | Sí (JWT) |
| `PUT` | `/products/modificar/:id`| Actualiza los datos de un producto existente | Sí (JWT) |
| `DELETE`| `/products/eliminar/:id` | Da de baja un producto por su identificador | Sí (JWT) |

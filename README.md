# Datta Able Free Angular Admin Template

## Descripción

Datta Able Free Angular Admin Template es una aplicación web desarrollada con Angular 18 que proporciona una interfaz de administración para gestionar usuarios, categorías y clientes. La aplicación utiliza Bootstrap para un diseño responsivo y está integrada con una API RESTful para operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Incluye autenticación de usuarios, autorización mediante tokens JWT, y una interfaz de usuario moderna basada en el template Datta Able.

## Características principales

### Gestión de entidades

- **Usuarios:** Crear, editar, eliminar y listar usuarios con roles y estados.
- **Categorías:** Crear, editar, eliminar y listar categorías con atributos como nombre, descripción, color, orden y estado activo.
- **Clientes:** Crear, editar, eliminar y listar clientes asociados a categorías.

- **Confirmación de eliminación:** Cada acción de eliminación en las tablas de usuarios, categorías y clientes muestra un modal de confirmación para evitar eliminaciones accidentales.
- **Modales para crear/editar:** Formularios modales para crear y editar entidades, con validación básica en el frontend.
- **Autenticación:** Login y logout con soporte para tokens JWT y refresco de tokens.
- **Tablas dinámicas:** Componente reutilizable DataTableComponent con búsqueda, ordenación y paginación.
- **Despliegue:** Configurado para despliegue en Vercel con soporte para variables de entorno.

## Requisitos previos

- **Node.js:** v18.x o superior
- **Angular CLI:** v18.x (`npm install -g @angular/cli`)
- **Backend API:** Servidor RESTful (por ejemplo, Node.js con endpoints `/api/login`, `/api/register`, `/api/users`, `/api/categories`, `/api/clients`)
- **Vercel CLI:** Para despliegue (`npm install -g vercel`)

## Instalación

```bash
git clone <url-del-repositorio>
cd datta-able-free-angular-admin-template
npm install
```

### Configurar variables de entorno

**src/environments/environment.ts**

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**src/environments/environment.prod.ts**

```ts
export const environment = {
  production: true,
  apiUrl: 'https://your-api.com/api'
};
```

### Iniciar el servidor backend

Asegúrate de que el backend esté en `http://localhost:3000`.  
Configura CORS en el backend:

```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));
```

### Ejecutar la aplicación

```bash
ng serve
```

Abrir [http://localhost:4200](http://localhost:4200)

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── confirm-modal/
│   │   ├── data-table/
│   │   ├── header/
│   │   ├── modal/
│   ├── demo/
│   │   ├── pages/
│   │   │   ├── users/
│   │   │   ├── categories/
│   │   │   ├── clients/
│   │   ├── dashboard/
│   ├── models/
│   ├── repositories/
│   ├── theme/
│   │   ├── layout/
│   │   │   ├── admin/
│   │   │   ├── guest/
│   ├── environments/
│   ├── app-routing.module.ts
│   ├── auth.guard.ts
│   ├── auth.interceptor.ts
├── styles.scss
├── angular.json
├── vercel.json
```

## Componentes principales

- **ConfirmModalComponent**
- **DataTableComponent**
- **ModalComponent**
- **UsersComponent, CategoriesComponent, ClientsComponent**
- **HeaderComponent**
- **AuthRepository, UsersRepository, CategoriesRepository, ClientsRepository**

## Endpoints de la API

| Método | Endpoint            | Descripción              |
| ------ | ------------------- | ------------------------ |
| POST   | /api/login          | Autenticación de usuario |
| POST   | /api/register       | Registro de usuario      |
| POST   | /api/refresh        | Refresco de token JWT    |
| POST   | /api/logout         | Cierre de sesión         |
| GET    | /api/users          | Lista de usuarios        |
| POST   | /api/users          | Crear usuario            |
| PUT    | /api/users/:id      | Actualizar usuario       |
| DELETE | /api/users/:id      | Eliminar usuario         |
| GET    | /api/categories     | Lista de categorías      |
| POST   | /api/categories     | Crear categoría          |
| PUT    | /api/categories/:id | Actualizar categoría     |
| DELETE | /api/categories/:id | Eliminar categoría       |
| GET    | /api/clients        | Lista de clientes        |
| POST   | /api/clients        | Crear cliente            |
| PUT    | /api/clients/:id    | Actualizar cliente       |
| DELETE | /api/clients/:id    | Eliminar cliente         |

## Despliegue en Vercel

```bash
npm install -g vercel
```

**vercel.json**

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Pruebas

1. Iniciar backend
2. `ng serve`
3. Probar funcionalidades CRUD y modales
4. Verificar en despliegue de Vercel

## Contribuciones

1. Hacer fork
2. Crear rama
3. Commit & Push
4. Pull Request

## Licencia

MIT License

## Contacto

📧 <correo@ejemplo.com>

---

Última actualización: 15 de septiembre de 2025

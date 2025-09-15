Datta Able Free Angular Admin Template
Descripción
Datta Able Free Angular Admin Template es una aplicación web desarrollada con Angular 18 que proporciona una interfaz de administración para gestionar usuarios, categorías y clientes. La aplicación utiliza Bootstrap para un diseño responsivo y está integrada con una API RESTful para operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Incluye autenticación de usuarios, autorización mediante tokens JWT, y una interfaz de usuario moderna basada en el template Datta Able.
Características principales

Gestión de entidades:
Usuarios: Crear, editar, eliminar y listar usuarios con roles y estados.
Categorías: Crear, editar, eliminar y listar categorías con atributos como nombre, descripción, color, orden y estado activo.
Clientes: Crear, editar, eliminar y listar clientes asociados a categorías.

Confirmación de eliminación: Cada acción de eliminación en las tablas de usuarios, categorías y clientes muestra un modal de confirmación para evitar eliminaciones accidentales.
Modales para crear/editar: Formularios modales para crear y editar entidades, con validación básica en el frontend.
Autenticación: Login y logout con soporte para tokens JWT y refresco de tokens.
Tablas dinámicas: Componente reutilizable DataTableComponent con búsqueda, ordenación y paginación.
Despliegue: Configurado para despliegue en Vercel con soporte para variables de entorno.

Requisitos previos

Node.js: v18.x o superior
Angular CLI: v18.x (npm install -g @angular/cli)
Backend API: Servidor RESTful (por ejemplo, Node.js con endpoints /api/login, /api/register, /api/users, /api/categories, /api/clients)
Vercel CLI: Para despliegue (npm install -g vercel)

Instalación

Clonar el repositorio:
git clone <url-del-repositorio>
cd datta-able-free-angular-admin-template

Instalar dependencias:
npm install

Configurar variables de entorno:

Crea un archivo src/environments/environment.ts:export const environment = {
production: false,
apiUrl: '<http://localhost:3000/api>'
};

Para producción, crea src/environments/environment.prod.ts:export const environment = {
production: true,
apiUrl: '<https://your-api.com/api>'
};

Iniciar el servidor backend:

Asegúrate de que el servidor backend esté ejecutándose en <http://localhost:3000> (o la URL configurada en environment.ts).
Configura CORS en el backend para permitir solicitudes desde <http://localhost:4200:const> cors = require('cors');
app.use(cors({ origin: '<http://localhost:4200>' }));

Ejecutar la aplicación:
ng serve

Abre <http://localhost:4200> en tu navegador.

Estructura del proyecto
src/
├── app/
│ ├── components/
│ │ ├── confirm-modal/ # Modal de confirmación para eliminación
│ │ ├── data-table/ # Componente de tabla dinámica
│ │ ├── header/ # Componente de cabecera con navegación
│ │ ├── modal/ # Modal para crear/editar entidades
│ ├── demo/
│ │ ├── pages/
│ │ │ ├── users/ # Componente para gestionar usuarios
│ │ │ ├── categories/ # Componente para gestionar categorías
│ │ │ ├── clients/ # Componente para gestionar clientes
│ │ ├── dashboard/ # Dashboard principal
│ ├── models/ # Interfaces para User, Category, Client
│ ├── repositories/ # Servicios para interactuar con la API
│ ├── theme/
│ │ ├── layout/
│ │ │ ├── admin/ # Layout para rutas autenticadas
│ │ │ ├── guest/ # Layout para rutas públicas (login/register)
│ ├── environments/ # Configuraciones de entorno
│ ├── app-routing.module.ts # Configuración de rutas
│ ├── auth.guard.ts # Guardia de autenticación
│ ├── auth.interceptor.ts # Interceptor para añadir token JWT
├── styles.scss # Estilos globales (Bootstrap)
├── angular.json # Configuración de Angular CLI
├── vercel.json # Configuración para despliegue en Vercel

Componentes principales

ConfirmModalComponent: Muestra un modal de confirmación antes de eliminar un usuario, categoría o cliente.
DataTableComponent: Tabla reusable con soporte para búsqueda, ordenación y paginación. Emite eventos para crear, editar y eliminar.
ModalComponent: Modal para formularios de creación y edición de entidades.
UsersComponent, CategoriesComponent, ClientsComponent: Gestionan las respectivas entidades, integrando DataTableComponent y ModalComponent.
HeaderComponent: Barra de navegación con opciones de logout y enlaces a usuarios, categorías y clientes.
AuthRepository: Maneja autenticación (login, logout, refresco de token).
UsersRepository, CategoriesRepository, ClientsRepository: Servicios para operaciones CRUD en las respectivas entidades.

Endpoints de la API
La aplicación espera los siguientes endpoints en el servidor backend:

Método
Endpoint
Descripción

POST
/api/login
Autenticación de usuario

POST
/api/register
Registro de usuario

POST
/api/refresh
Refresco de token JWT

POST
/api/logout
Cierre de sesión

GET
/api/users
Lista de usuarios

POST
/api/users
Crear usuario

PUT
/api/users/:id
Actualizar usuario

DELETE
/api/users/:id
Eliminar usuario

GET
/api/categories
Lista de categorías

POST
/api/categories
Crear categoría

PUT
/api/categories/:id
Actualizar categoría

DELETE
/api/categories/:id
Eliminar categoría

GET
/api/clients
Lista de clientes

POST
/api/clients
Crear cliente

PUT
/api/clients/:id
Actualizar cliente

DELETE
/api/clients/:id
Eliminar cliente

Notas:

Los endpoints deben devolver códigos de estado HTTP estándar (200, 201, 204).
Las respuestas GET deben tener el formato { data: [], hasNextPage: boolean }.

Despliegue en Vercel

Instalar Vercel CLI:
npm install -g vercel

Configurar vercel.json:
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

Configurar variables de entorno en Vercel:

En el panel de Vercel, añade:
Key: API_URL
Value: <https://your-api.com/api>

Desplegar:
git add .
git commit -m "Actualización con modal de confirmación de eliminación"
git push origin main
vercel --prod

Verificar:

Accede a la URL proporcionada por Vercel.
Inicia sesión y verifica que las tablas de usuarios, categorías y clientes funcionan correctamente.
Confirma que los modales de creación/edición y eliminación aparecen y realizan las acciones esperadas.

Pruebas

Iniciar el backend:

Asegúrate de que el servidor backend esté ejecutándose en <http://localhost:3000> (o la URL configurada).

Probar la aplicación localmente:
ng serve

Navega a <http://localhost:4200>.
Inicia sesión con credenciales válidas (por ejemplo, <test1@example.com>).
Verifica las siguientes funcionalidades:
Tablas: Listado, búsqueda, ordenación y paginación en /users, /categories, /clients.
Crear/Editar: Usa los botones "Create" y "Edit" para abrir modales y enviar datos a la API.
Eliminar: Haz clic en "Delete", verifica que aparece un modal de confirmación con el mensaje adecuado:
Usuarios: "Are you sure you want to delete this user?"
Categorías: "Are you sure you want to delete this category?"
Clientes: "Are you sure you want to delete this client?"

Confirmación de eliminación: Confirma que "Cancel" cierra el modal sin acción y "Delete" elimina el registro y actualiza la tabla.
Errores: Simula fallos en la API (por ejemplo, ID inválido) y verifica que los mensajes de error aparecen debajo de la tabla.

Probar en Vercel:

Tras el despliegue, verifica que todas las funcionalidades (login, CRUD, modales) funcionan correctamente.
Revisa la consola del navegador para confirmar los logs esperados:
API response for /api/users: { data: [...], hasNextPage: false }
Fetched users: [...]
API response for /api/categories: { data: [...], hasNextPage: true }
Fetched categories: [...]
Fetched categories for clients: [...]
API response for /api/clients: { data: [...], hasNextPage: true }
Fetched clients: [...]
DataTable received data: [...]

Verifica las solicitudes de red para confirmar que los endpoints devuelven códigos 200/201/204 y que el encabezado Authorization: Bearer <token> está presente.

Resolución de problemas

El modal de confirmación no aparece:
Verifica que isConfirmModalOpen se establece en true en openDeleteModal.
Asegúrate de que <app-confirm-modal> está incluido en las plantillas de UsersComponent, CategoriesComponent y ClientsComponent con las vinculaciones correctas.

Las solicitudes API fallan:
Confirma que API_URL está configurado correctamente en Vercel o en environment.ts.
Asegúrate de que el backend permite CORS para la URL de la aplicación (local o desplegada).
Verifica que los endpoints DELETE están implementados y devuelven 200/204.

La tabla no se actualiza tras eliminar:
Confirma que loadUsers, loadCategories o loadClients se llama tras una eliminación exitosa.
Revisa la consola para detectar errores en las respuestas de la API.

Errores de despliegue en Vercel:
Revisa los logs de compilación en Vercel para identificar problemas (por ejemplo, dependencias faltantes).
Asegúrate de que angular.json y vercel.json están alineados en distDir: "dist".

Contribuciones

Crea un fork del repositorio.
Crea una rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -m "Añadir nueva funcionalidad").
Envía la rama al repositorio remoto (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.

Licencia
Este proyecto está licenciado bajo la MIT License.
Contacto
Para preguntas o soporte, contacta al equipo de desarrollo en <correo@ejemplo.com>.

Última actualización: 15 de septiembre de 2025

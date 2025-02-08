# Nitbit Backoffice Server

## Descripción

Este proyecto es una API RESTful construida con Node.js, TypeScript y Prisma ORM. Utiliza una arquitectura orientada al dominio (DDD) con screaming architecture para organizar el código de manera clara y escalable.

## Requisitos

- Node.js >= 22.13.1
- pnpm >= 9.15.4
- TypeScript >= 5.7
- Prisma >= 5.x

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ChemaCLi/nitbit-backoffice-server.git
```

2. Navega al directorio del proyecto:

```bash
cd nitbit-backoffice-server
```

3. Instala las dependencias:

```bash
pnpm install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:

```env
REST_API_PORT=3000
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"
```

## Levantar el proyecto para desarrollo

1. Genera el cliente de Prisma ORM:

```bash
pnpm prisma:generate
```

3. Inicia el servidor:

```bash
pnpm dev
```

## Scripts

- `pnpm dev`: Inicia el servidor en modo desarrollo.
- `pnpm run build`: Compila el proyecto TypeScript a JavaScript para el modo de producción.
- `npm start`: Inicia el servidor en modo producción (ejecuta el código compilado y optimizado).

## Estructura del Proyecto

- `/prisma`: Configuración de Prisma ORM, modelos de base de datos y migraciones.
- `/src`: Código fuente del proyecto.
  - `/docs`: La documentación de swagger
  - `/modules`: La lógica del sistema organizada por los módulos más relevantes.
    - `/auth`: Módulo de autenticación y autorización.
    - `/places`: Registrar y administrar los lugares que se mostrarán a los usuarios
    - `/users`: Registrar y administrar los usuarios que usan la aplicación
    - `/shared`: Funcionalidades reutilizables compartidas entre módulos. Considera que al colocar nuevas funcionalidades aquí, estas deben ser generales y no específicas de un módulo. También representan un compromiso de mantenimiento, ya que cualquier cambio en esta carpeta afectará a otros módulos.
  - `/routes`: Sistema de enrutamiento de Express para manejar las solicitudes HTTP.

## Estructura de cada módulo

- `/application`: Lógica de aplicación y casos de uso.
- `/domain`: Entidades, repositorios base y lógica de dominio.
- `/infrastructure`: Implementaciones de infraestructura, como bases de datos y servicios externos.

## Extensiones de VSCode

Se recomienda usar la extensión Prisma y Prettier para VSCode.

## Contribuciones

Solo los colaboradores autorizados pueden realizar cambios en el código fuente.

Para contribuir, sigue estos pasos:

```bash
## parte de la rama principal main, descarga los cambios más recientes y crea una nueva rama
git checkout main
git pull --ff
git checkout -b feature/my-feature

## realiza los cambios necesarios y haz un commit (usa conventional commits)
git commit -m "feat: add my feature"

## sube los cambios al repositorio
git push origin feature/my-feature

## Crea el PR en GitHub y solicita la revisión de los colaboradores. Si los cambios son aprobados, se fusionarán con la rama principal.
```

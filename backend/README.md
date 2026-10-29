# Backend DiagramAR

## Requisitos

- Node.js >= 24
- npm >= 10

## Instalación

```bash
npm install
```

## Configuración

Copia `.env.example` a `.env` y ajusta las variables necesarias.

Variables relevantes:

- `PORT` (por defecto 3000)
- `NODE_ENV` (`development` | `test` | `production`)
- `DATABASE_TYPE` (`better-sqlite3` | `sqlite` | `postgres` | `cockroachdb` | `mysql` | `mariadb` | `mssql` | `oracle`; por defecto `better-sqlite3`)
- `DATABASE_URL` (opcional; en SQLite acepta una ruta o `:memory:`; en motores de red actúa como override de la conexión)
- `DATABASE_HOST` (obligatorio para motores de red)
- `DATABASE_PORT` (obligatorio para motores de red, 1-65535)
- `DATABASE_USER` (obligatorio para motores de red)
- `DATABASE_PASSWORD` (obligatorio para motores de red)
- `DATABASE_NAME` (opcional en SQLite; obligatorio para motores de red)
- `DATABASE_SSL` (opcional; `true`, `false`, `1`, `0`, `yes` o `no`; se envía como `ssl` a los motores de red)
- `CORS_ORIGINS` (lista separada por comas)
- `LOG_LEVEL` (opcional)

## Arquitectura

El backend sigue una arquitectura limpia con las siguientes capas: `routes/`, `controllers/`, `services/`, `repositories/`, `middlewares/`, `schemas/`, `entities/`, `config/`, `errors/`, `docs/`, `utils/`.  
La inyección de dependencias se hace de forma manual en el composition root (`server.ts`) sin contenedores.  
El acceso a datos se realiza con TypeORM sobre un motor relacional seleccionable mediante `DATABASE_TYPE`; el valor por defecto es `better-sqlite3`. Las entidades TypeORM son las fuentes de verdad en `src/entities/`. Los puertos (`src/repositories/interfaces/`) se mantienen desacoplados y el adaptador (`src/repositories/typeorm-user.repository.ts`) traduce entre la entidad y los contratos del dominio.  
Las migraciones se ejecutan con TypeORM CLI.

## Base de datos y migraciones

### Motores de base de datos

`DATABASE_TYPE` selecciona el motor. SQLite es el valor por defecto.

- SQLite (`better-sqlite3`, `sqlite`): `DATABASE_URL` acepta una ruta o `:memory:`; también se puede usar `DATABASE_NAME`. En desarrollo el valor por defecto es `data/database.sqlite` y en pruebas `:memory:`.
- Motores de red (`postgres`, `cockroachdb`, `mysql`, `mariadb`, `mssql`, `oracle`): `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD` y `DATABASE_NAME` son obligatorios. `DATABASE_URL` es un override opcional de la conexión.
- `DATABASE_SSL`: se envía como opción `ssl` a los motores de red; SQLite lo ignora.

Cada motor requiere su paquete de controlador: `pg` para `postgres` y `cockroachdb`, `mysql2` para `mysql` y `mariadb`, `mssql` para `mssql`, `oracledb` para `oracle`, y `sqlite3` para `sqlite` (`better-sqlite3` ya está incluido).

Ejemplo con PostgreSQL:

```bash
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=usuario
DATABASE_PASSWORD=password
DATABASE_NAME=diagramar
DATABASE_SSL=false
```

```bash
# Generar una migración a partir de los cambios en las entidades
npm run db:migrate:generate

# Ejecutar migraciones
npm run db:migrate

# Revertir última migración
npm run db:migrate:undo
```

## Desarrollo

El backend compila con TypeScript y se ejecuta desde `dist/`.

```bash
# Compilar
npm run build

# Desarrollo (compila y ejecuta con watch)
npm run dev

# Ejecutar en producción
npm start
```

## Pruebas

```bash
# Ejecutar pruebas
npm test

# Cobertura
npm run test:coverage
```

## Lint

```bash
npm run lint
```

## Documentación API

En desarrollo, Swagger UI está disponible en `/api-docs`.

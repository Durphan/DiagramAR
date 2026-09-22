# DiagramAR

DiagramAR is a web application for creating Entity-Relationship diagrams, focused on providing a simpler and more complete experience than traditional diagramming tools (e.g. Draw.io): cluttered sidebars, lack of composite/multivalued/derived attributes, and complicated cardinality handling.

---

## Project structure

This is a monorepo managed with npm workspaces:

```text
diagramar/
├── frontend/   React + Vite app
├── back-end/   Express API
└── package.json Root workspaces and scripts
```

---

## Requirements

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

Check your versions:

```bash
node -v
npm -v
```

---

## Getting started

### 1. Clone the repository

```bash
git clone <repository-url>
cd diagramar
```

### 2. Install dependencies

From the repository root:

```bash
npm i
```

This installs dependencies for both `frontend/` and `backend/` at once, thanks to npm workspaces.

### 3. Configure environment variables (backend)

Copy the example file and adjust it if needed:

```bash
cp backend/.env.example
```

Default values:

```env
PORT=5000
NODE_ENV=development
```

### 4. Run in development

```bash
npm run dev:front   # Vite dev server on http://localhost:5173
npm run dev:back    # Express server on http://localhost:5000
```

### 5. Build for production

```bash
npm run build       # compiles the frontend into frontend/dist/
npm run start       # starts the backend in production mode
```

---

## Available scripts

### From the root

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev:front` | Starts only the frontend              |
| `npm run dev:back`  | Starts only the backend               |
| `npm run build`     | Builds the frontend for production    |
| `npm run start`     | Starts the backend in production mode |

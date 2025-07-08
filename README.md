
# Vite + React + TypeScript Project

This project is built using [Vite](https://vitejs.dev/) with React and TypeScript. It follows a scalable and organized folder structure to help teams maintain and grow the application efficiently.

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

---

## Folder Structure

```
src/
├── components/
│   └── ui/                # Reusable UI components (e.g. Button, Input)
├── features/
│   └── auth/              # Encapsulated feature logic (e.g. LoginForm, Auth hooks)
├── pages/
│   └── dashboard/         # Page-level components (compositions of features and UI)
├── lib/                   # Core libraries or service clients (e.g. API wrapper)
├── utils/                 # Utility functions (e.g. className merger, validators)
├── hooks/                 # Reusable custom React hooks
├── index.css              # Global styles
└── main.tsx               # Application entry point
```

---

## Aliases

We use a `@/` alias pointing to the `src/` directory, making imports cleaner and easier to manage.

### Example:

```ts
import { Button } from "@/components/ui/Button";
import { LoginForm } from "@/features/auth/LoginForm";
```

---

## Conventions

* **`components/ui/`**: Only dumb/presentational components or shadcn-styled UI building blocks.
* **`features/`**: Self-contained business logic and feature modules.
* **`pages/`**: Route-level pages that compose features and UI.
* **`lib/`**: Singletons, clients, services (e.g. Axios instances, API interfaces).
* **`utils/`**: Stateless utility helpers and formatters.
* **`hooks/`**: Shared custom React hooks (e.g. `useToggle`, `useDebounce`).

---

## 🧹 Formatting

This project uses [Prettier](https://prettier.io) for code formatting. Config is in `.prettierrc`.

```bash
npx prettier --write .
```

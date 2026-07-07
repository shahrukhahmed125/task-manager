# Task Manager

A full-stack task management application built with Next.js 16, TypeScript, Prisma, MySQL, NextAuth, and Tailwind CSS.

## What this app does

This application allows users to:

- register and log in securely
- view a personal task dashboard
- create new tasks
- view task details
- edit existing tasks
- delete tasks
- switch between light and dark mode
- access protected routes only after authentication

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL database
- NextAuth credentials authentication
- bcryptjs for password hashing
- Lucide Icons

## Project structure

```text
app/
  api/                # API routes
  dashboard/          # Dashboard page
  lib/                # Prisma, route helpers, validation, task helpers
  login/              # Login page
  register/           # Register page
  tasks/              # Task list, create, detail, edit pages
  ui/                 # Shared UI components like header, theme toggle, sign out
auth.ts               # NextAuth configuration
prisma/               # Prisma schema, migrations, seed data
```

## Create the project from scratch

### 1. Create the Next.js project

```bash
npx create-next-app@latest task_manager --ts --tailwind --eslint --app
cd task_manager
```

### 2. Install the required packages

```bash
npm install next-auth zod bcryptjs @prisma/client prisma @prisma/adapter-mariadb dotenv lucide-react
npm install -D @types/bcryptjs
```

### 3. Initialize Prisma

```bash
npx prisma init --datasource-provider mysql
```

### 4. Add your Prisma schema

Create a schema that includes users and tasks:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
}

model User {
  id       Int    @id @default(autoincrement())
  name     String?
  email    String @unique
  password String
  tasks    Task[]
}

model Task {
  id          Int    @id @default(autoincrement())
  title       String
  description String?
  status      String @default("TODO")
  user_id     Int
  user        User   @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 7. Seed the database

```bash
npx tsx prisma/seed.ts
```

## Environment variables

Create a `.env` file in the project root and add your database and auth settings:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=task_manager
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
AUTH_SECRET=your-secret-key
```

## Run the application

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Useful commands

```bash
npm run build
npm run lint
npx prisma studio
npx prisma migrate dev
npx prisma generate
```

## Development workflow

1. Start the database.
2. Add environment variables.
3. Run Prisma generate and migrate.
4. Start the development server.
5. Register a user or use the seeded admin account.
6. Create, edit, and delete tasks from the dashboard.

## Notes

- The task routes are protected and require authentication.
- The app uses a shared route helper for consistent navigation.
- The UI includes a reusable shell for header, logout, and theme toggle.

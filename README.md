📌 LinkVault

A minimal, fast, and type-safe link bookmarking app built with the bun create bhvr stack. Save, organize, and filter your favorite links—all with end-to-end type safety and blazing-fast performance.


✅ Project Structure Overview

    ├── client/   → React + Tailwind frontend
    ├── server/   → Hono backend with Hono RPC
    ├── shared/   → Shared types/schemas using Zod
    ├── .gitignore, LICENSE, README.md, etc.


🚀 Tech Stack

   * Bun – ultra-fast JavaScript runtime

   * Hono – lightweight web framework for building edge-ready APIs

   * Hono RPC – type-safe API communication between backend and frontend

   * React + Tailwind CSS – modern UI with utility-first styling

   * Zod – schema validation for input safety

   * SQLite (via Drizzle ORM) – local, lightweight database

   * React-icons - For icons

   * React-router - for routing  

✅ Features

   * Add and manage links with tags

   * Filter by tag or search text

   * Full-stack type safety with Hono RPC client

   * Beautiful, minimal UI with Tailwind

   * Fast startup & build times using Bun

🛠 Coming Soon

   * Auth (optional)

   * Cloud deployment (Vercel/Cloudflare)

   * Tag autocomplete

   * Dark mode


📦 Run the project 
```
  bun run dev:client   # Start the client
  bun run dev:server   # Start the server in another terminal
  bun run dev          # Start all
```

✅ Run the docker-compose
```
    docker-compose up -d
```

✅ Create Migration
Run this to generate your SQL migration from the schema:
```
    npx drizzle-kit generate
```
  This will read your schema and create SQL migration files inside ./drizzle/migrations.

✅ Apply the Migration to the Database
```
npx drizzle-kit migrate
```
  This will apply the migration and create the actual users and links tables in your PostgreSQL database.

📄 License

MIT – feel free to fork, remix, and improve.

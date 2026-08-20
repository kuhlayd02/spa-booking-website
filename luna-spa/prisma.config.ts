import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Prisma's config datasource.url has no directUrl counterpart in v7 — this is
    // used by the CLI (migrate/db push), so it points at the non-pooled connection.
    // The running client connects separately via DATABASE_URL through the pg adapter
    // in lib/prisma.ts.
    url: env("DIRECT_URL"),
  },
});
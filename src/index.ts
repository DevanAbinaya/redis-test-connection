// src/index.ts
import { Hono } from "hono";
import Redis from "ioredis";

import "dotenv/config";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis = new Redis(redisUrl);

const app = new Hono();

app.get("/", (c) => c.text("Hono + Redis API is running 🚀"));

app.get("/ping", async (c) => {
  try {
    const pong = await redis.ping();
    return c.json({ success: true, message: pong });
  } catch (err) {
    return c.json({ success: false, error: (err as Error).message }, 500);
  }
});

export default app;

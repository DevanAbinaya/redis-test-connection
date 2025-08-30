import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const count = await redis.incr("page_visits");
    res.status(200).json({ visits: count });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

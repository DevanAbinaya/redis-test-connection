import { useEffect, useState } from "react";

export default function Home() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/redis")
      .then((res) => res.json())
      .then((data) => setVisits(data.visits))
      .catch(() => setVisits(-1));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>🚀 Next.js + Redis Test</h1>
      {visits === null && <p>Loading...</p>}
      {visits !== null && visits >= 0 && <p>Visits counter: {visits}</p>}
      {visits === -1 && <p>❌ Could not connect to Redis</p>}
    </main>
  );
}

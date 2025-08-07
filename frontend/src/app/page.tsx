"use client";

import { useEffect, useState } from "react";
import getConfig from "next/config";

export default function Home() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">AI Contract Review</h1>
      <p className="mt-4 text-lg">
        Backend Status: <span className="font-bold">{status}</span>
      </p>
    </main>
  );
}

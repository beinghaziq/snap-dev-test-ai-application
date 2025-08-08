"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/services/authService";
import { User } from "@/types/user";
import UserProfile from "@/components/UserProfile";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe(token)
        .then(setUser)
        .catch(() => setError("Please login to continue"));
    } else {
      setError("Please login to continue");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">AI Contract Review</h1>
      {user && <UserProfile user={user} />}
      {error && <p className="mt-4 text-lg text-red-500">{error}</p>}
    </main>
  );
}

"use client";

import { logout } from "@/auth";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  if (error.cause instanceof Response && error.cause.status === 401) {
    logout();
    return router.push("/login");
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
}

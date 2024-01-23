"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  if (error.cause instanceof Response && error.cause.status === 401) {
    router.push("/login");
  }

  return (
    <section className="w-full h-full flex items-center justify-center flex-col gap-y-0.5">
      <h2 className="text-secondary-400 text-2xl lg:text-4xl font-mono">
        Something went wrong!
      </h2>
      <span className="flex gap-1 items-center text-stone-700 text-sm lg:text-lg">
        This is still a working in progress. You can
        <Link
          href="https://twitter.com/hnrbs_"
          className="text-secondary-600 hover:text-secondary-500 hover:-translate-y-0.5 transition"
        >
          message me
        </Link>
        or
        <Link
          href="https://github.com/hnrbs/zap/issues"
          className="text-secondary-600 hover:text-secondary-500 hover:-translate-y-0.5 transition"
        >
          open an issue.
        </Link>
      </span>
    </section>
  );
}

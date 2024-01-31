"use client";

import { Logo } from "@/components/Logo";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { login } from "@/auth";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { loginHandler, useLoginForm, useLoginMutation } from "@/components/auth/Login";

const Error = ({ error }: { error: string | null }) => {
  return (
    <div className="w-full flex justify-center pt-2.5">
      <span className="text-sm text-rose-500 font-semibold">{error}</span>
    </div>
  );
};

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useLoginForm();
  const [commitMutation, inFlight] = useLoginMutation();

  const onSubmit = loginHandler({
    commitMutation,
    onSent: (token) => {
      login(token);
      router.push("/messages");
      router.refresh();
    },
    onError: (error) => setError(error)
  })

  return (
    <main className="w-full h-full flex flex-col gap-y-6 items-center justify-center">
      <div className="flex flex-col items-center gap-y-2">
        <Logo />
        <span className="text-zinc-700">Login to your account.</span>
      </div>

      <section className="bg-white rounded-2xl shadow px-8 py-6 flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 items-center"
        >
          <div className="flex flex-col gap-y-3">
            <div>
              <label
                className="block  leading-6 text-zinc-800"
                htmlFor="username"
              >
                Username
              </label>
              <Input
                placeholder="john_doe"
                className="border rounded-lg text-lg w-full"
                {...register("username")}
              />
            </div>

            <div>
              <label
                className="block  leading-6 text-zinc-800"
                htmlFor="username"
              >
                Password
              </label>
              <Input
                type="password"
                className="border rounded-lg text-xl"
                placeholder="••••••••"
                {...register("password")}
              />
            </div>
          </div>
          <Button
            disabled={inFlight}
            className="flex items-center gap-1 w-full justify-center"
          >
            <span>Login</span>
            <LogIn strokeWidth={1} />
          </Button>
        </form>
        <Error error={error} />
      </section>

      <div className="flex gap-1.5">
        Doesn't have an account?
        <a href="/register" className="font-semibold text-primary-500">
          Sign up here
        </a>
      </div>
    </main>
  );
};

export default LoginPage;

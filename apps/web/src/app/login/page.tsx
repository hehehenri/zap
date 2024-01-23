"use client";

import { Button, Input } from "@/components";
import { Logo } from "@/components/Logo";
import { graphql, useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useState } from "react";
import {
  pageLoginMutation,
  pageLoginMutation$data,
  pageLoginMutation$variables,
} from "@/__generated__/pageLoginMutation.graphql";
import { login } from "@/auth";

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
  const [commitMutation, inFlight] = useMutation<pageLoginMutation>(graphql`
    mutation pageLoginMutation($username: String!, $password: String!) {
      login(input: { username: $username, password: $password }) {
        token
        user {
          id
          username
        }
      }
    }
  `);

  const { register, handleSubmit } = useForm<pageLoginMutation$variables>();

  const onSubmit = (variables: pageLoginMutation$variables) => {
    commitMutation({
      variables,
      onCompleted: ({ login: response }: pageLoginMutation$data) => {
        if (!response?.token || !response.user) {
          return;
        }

        login(response.token);
        // TODO: refresh is needed to load cookies before redirecting
        router.push("/messages");
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

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
                className="block  leading-6 text-zinc-800 dark:text-zinc-400"
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
                className="block  leading-6 text-zinc-800 dark:text-zinc-400"
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

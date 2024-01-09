"use client";

import { Button, Input } from "@/components";
import { Login } from "@/components/mutations";
import { Logo } from "@/components/Logo";
import { useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import {
  LoginMutation,
  LoginMutation$variables as Variables,
  LoginMutation$data as Response,
} from "@/__generated__/LoginMutation.graphql";

const LoginPage = () => {
  const [commitMutation, inFlight] = useMutation<LoginMutation>(Login);

  const { register, handleSubmit } = useForm<Variables>();

  // TODO: validate with zod before commiting
  const onSubmit = (variables: Variables) => {
    commitMutation({
      variables,
      onCompleted: (response: Response) => {
        console.log(response);
      },
    });
  };

  return (
    <main className="w-full h-full flex items-center justify-center">
      <section className="bg-white rounded-2xl shadow px-8 py-6 space-y-4">
        <Logo />
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
          <Button className="flex items-center gap-1 w-full justify-center">
            <span>Login</span>
            <LogIn strokeWidth={1} />
          </Button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;

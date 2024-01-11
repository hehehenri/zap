"use client";

import { Button, Input } from "@/components";
import { Login } from "@/components/mutations";
import { Logo } from "@/components/Logo";
import { useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import Cookie from "js-cookie";
import {
  LoginMutation,
  LoginMutation$variables as Variables,
  LoginMutation$data as Response,
} from "@/__generated__/LoginMutation.graphql";

const LoginPage = () => {
  const [commitMutation] = useMutation<LoginMutation>(Login);
  const { register, handleSubmit } = useForm<Variables>();
  const router = useRouter();

  // TODO: validate with zod before commiting
  // TODO: display errors
  const onSubmit = (variables: Variables) => {
    commitMutation({
      variables,
      onCompleted: ({ login }: Response) => {
        if (!login?.token) {
          throw new Error("failed to login user: " + JSON.stringify(register));
        }

        Cookie.set("auth.token", login.token);
        router.push("/messages");
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
          <Button className="flex items-center gap-1 w-full justify-center">
            <span>Login</span>
            <LogIn strokeWidth={1} />
          </Button>
        </form>
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

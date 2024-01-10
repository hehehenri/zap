"use client";

import { Button, Input } from "@/components";
import { Logo } from "@/components/Logo";
import { Register } from "@/components/mutations/RegisterMutation";
import { useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import Cookie from "js-cookie";
import {
  RegisterMutation,
  RegisterMutation$variables as Variables,
  RegisterMutation$data as Response,
} from "@/__generated__/RegisterMutation.graphql";

import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [commitMutation, inFlight] = useMutation<RegisterMutation>(Register);
  const { register, handleSubmit } = useForm<Variables>();
  const router = useRouter();

  // TODO: validate with zod before commiting
  const onSubmit = (variables: Variables) => {
    commitMutation({
      variables,
      onCompleted: ({ register }: Response) => {
        // TODO: move this somewhere else
        // TODO: properly handle error
        if (!register?.token) {
          throw new Error(
            "failed to register user: " + JSON.stringify(register),
          );
        }

        Cookie.set("auth.token", register.token, {
          sameSite: "None",
          secure: true,
        });
        router.push("/messages");
      },
    });
  };

  return (
    <main className="w-full h-full flex flex-col gap-y-6 items-center justify-center">
      <div className="flex flex-col items-center gap-y-2">
        <Logo />
        <span className="text-zinc-700">Register to your account.</span>
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
            Register
            <LogIn strokeWidth={1} />
          </Button>
        </form>
      </section>

      <div className="flex gap-1.5">
        Already have an account?
        <a href="/login" className="font-semibold text-primary-500">
          Sign in here.
        </a>
      </div>
    </main>
  );
};

export default RegisterPage;

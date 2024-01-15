"use client";

import { Button, Input } from "@/components";
import { Logo } from "@/components/Logo";
import { graphql, useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import {
  pageRegisterMutation,
  pageRegisterMutation$data,
  pageRegisterMutation$variables,
} from "@/__generated__/pageRegisterMutation.graphql";
import { useState } from "react";
import { login } from "@/auth";

const Error = ({ error }: { error: string | null }) => {
  return (
    <div className="w-full flex justify-center pt-2.5">
      <span className="text-sm text-rose-500 font-semibold">{error}</span>
    </div>
  );
};

const RegisterMutation = graphql`
  mutation pageRegisterMutation($username: String!, $password: String!) {
    register(input: { username: $username, password: $password }) {
      token
      user {
        id
        username
      }
    }
  }
`;

const RegisterPage = () => {
  const [commitMutation, inFlight] =
    useMutation<pageRegisterMutation>(RegisterMutation);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<pageRegisterMutation$variables>();
  const router = useRouter();

  // TODO: validate with zod before commiting
  const onSubmit = (variables: pageRegisterMutation$variables) => {
    commitMutation({
      variables,
      onCompleted: ({ register: response }: pageRegisterMutation$data) => {
        if (!response?.token || !response.user) {
          return;
        }

        login(response.token);
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
        <Error error={error} />
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

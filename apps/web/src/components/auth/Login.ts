import { LoginMutation } from "@/__generated__/LoginMutation.graphql";
import { useForm } from "react-hook-form";
import { UseMutationConfig, useMutation } from "react-relay";
import { graphql, Disposable } from "relay-runtime";
import { z } from "zod";

const loginSchema = z.object({
    username: z
      .string()
      .min(4, "Username must have at least 4 characters")
      .max(24, "Username must have at most 24 characters"),
    password: z
      .string()
      .min(6, "Password must have at least 6 characters")
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = useForm<LoginFormData>;

export const loginMutation = graphql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const useLoginMutation = () => useMutation<LoginMutation>(loginMutation);

type HandlerConfig = {
  commitMutation: (config: UseMutationConfig<LoginMutation>) => Disposable,
  onSent: (token: string) => void,
  onError: (error: string) => void,
};

export const loginHandler = ({commitMutation, onSent, onError}: HandlerConfig) => (
  async (unsafeInput: LoginFormData) => {
    const parsedInput = loginSchema.safeParse(unsafeInput);

    if (!parsedInput.success) {
      const error = parsedInput.error;
      const issue = error.issues[0];

      if (issue) {
        onError(issue.message);
      }

      return;
    }

    commitMutation({
      variables: {
        username: parsedInput.data.username,
        password: parsedInput.data.password
      },
      onCompleted: (response, errors) => {
        const token = response.login?.token;

        if (token) {
          return onSent(token);
        }

        if (errors && errors[0]) {
          const error = errors[0];
          onError(error.message);
        }
      },
    });
  }
)

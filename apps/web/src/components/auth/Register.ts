import { RegisterMutation } from "@/__generated__/RegisterMutation.graphql";
import { useForm } from "react-hook-form";
import { UseMutationConfig, useMutation } from "react-relay";
import { graphql, Disposable } from "relay-runtime";
import { z } from "zod";

const registerSchema = z.object({
    username: z
      .string()
      .min(4, "There are no usernames with less than 4 characters")
      .max(24, "There are no usernames with more than 24 characters"),
    password: z
      .string()
      .min(1, "Password cannot be empty")
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const useRegisterForm = useForm<RegisterFormData>;

export const registerMutation = graphql`
  mutation RegisterMutation($username: String!, $password: String!) {
    register(input: { username: $username, password: $password }) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const useRegisterMutation = () => useMutation<RegisterMutation>(registerMutation);

type HandlerConfig = {
  commitMutation: (config: UseMutationConfig<RegisterMutation>) => Disposable,
  onSent: (token: string) => void,
  onError: (error: string) => void,
};

export const registerHandler = ({commitMutation, onSent, onError}: HandlerConfig) => (
  async (unsafeInput: RegisterFormData) => {
    const parsedInput = registerSchema.safeParse(unsafeInput);

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
        const token = response.register?.token;

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

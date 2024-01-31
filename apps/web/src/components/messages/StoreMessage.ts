import { StoreMessageMutation } from "@/__generated__/StoreMessageMutation.graphql";
import { useForm } from "react-hook-form";
import { UseMutationConfig } from "react-relay";
import { graphql, Disposable } from "relay-runtime";
import z from "zod";

const storeMessageSchema = z.object({
  roomId: z.string(),
  content: z.string().max(1024, "Message exceeds the limit of 1024 characters")
});

export type StoreMessageFormData = z.infer<typeof storeMessageSchema>;

export const useStoreMessageForm = ({ roomId }: {roomId: string}) => (
  useForm<StoreMessageFormData>({
    defaultValues: {
      roomId,
      content: "",
    }
  })
);

export const storeMessageMutation = graphql`
  mutation StoreMessageMutation($input: StoreMessageInput!) {
    storeMessage(input: $input) {
      message {
        node {
          id
          content
        }
      }
    }
  }
`;

type HandlerConfig = {
  commitMutation: (config: UseMutationConfig<StoreMessageMutation>) => Disposable,
  onSent: (message: string) => void,
  onValidationError: (error: string) => void,
};

export const sendMessageHandler = ({commitMutation, onSent, onValidationError}: HandlerConfig) => (
  async (unsafeInput: StoreMessageFormData) => {
    const parsedInput = storeMessageSchema.safeParse(unsafeInput);

    if (!parsedInput.success) {
      const error = parsedInput.error;
      const issue = error.issues[0];

      if (issue) {
        onValidationError(issue.message);
      }

      return;
    }

    const input = parsedInput.data;

    if (!input.content) {
      return;
    }

    commitMutation({ variables: { input }, updater: (store) => store.invalidateStore() });
    onSent(input.content);
  }
);

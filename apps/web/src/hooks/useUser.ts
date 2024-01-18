import { useRouter } from "next/navigation";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { useUserQuery } from "./__generated__/useUserQuery.graphql";
import { User } from "@/auth";

const MeQuery = graphql`
  query useUserQuery {
    me { id username }
  }
`;

export const useUser = (): User | null => {
  const { me } = useLazyLoadQuery<useUserQuery>(MeQuery, {});
  const { push } = useRouter();

  if (!me) {
    push("/login");
    return null;
  }

  return me;
}

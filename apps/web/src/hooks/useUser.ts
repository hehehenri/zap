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

const getUser = () => {
  const userString = localStorage.getItem("user");
  if (!userString) return null;

  try {  
    const user: User = JSON.parse(userString);
    return user;
  } catch(e) {
    return null;
  }
}

const storeUser = (user: User) => {
  const userString = JSON.stringify(user);

  localStorage.setItem("user", userString);
}

export const useUser = () => {
  const { push } = useRouter();
  const user = getUser(); 

  if (user) return user;

  const { me } = useLazyLoadQuery<useUserQuery>(MeQuery, {});

  if (!me) return push("/login");

  storeUser(me);  
  return me;
}

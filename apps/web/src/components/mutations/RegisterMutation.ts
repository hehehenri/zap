import { graphql } from "react-relay";

export const Register = graphql`
  mutation RegisterMutation($username: String!, $password: String!) {
    register(input: {username: $username, password: $password}) {
      token
    }
  }
`;

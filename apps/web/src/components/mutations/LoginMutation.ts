import { graphql } from "react-relay";

export const Login = graphql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
    }
  }
`;

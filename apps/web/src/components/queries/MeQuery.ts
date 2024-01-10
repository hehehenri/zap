import { graphql } from "react-relay";

export const Me = graphql`
  query MeQuery {
    me { id username }
  }
`

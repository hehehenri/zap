import { graphql } from 'relay-runtime';

const MeQuery = graphql`
  query useUserQuery {
    me {
      id
      username
    }
  }
`;

const useUser = () => {
    
}

export default useUser;

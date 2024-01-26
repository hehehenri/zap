import { UserDefinition } from "../../UserModel";
import { generateToken } from "../../../../authentication";
import { createUser } from "../../fixture";
import { describeWithDb, testQuery } from "../../../../test/helpers";

const query = {
  query: `
    query Users {
      users(first: 1) {
        edges {
          node {
            username
          }
        }
      }
    }
  `,
  variables: {}
};

describeWithDb('user/queries/users', () => {  
  it("should return a collection of all users", async () => {
    const firstUser: UserDefinition = await createUser(); 
    await createUser(); 

    const token = generateToken(firstUser);

    const response = await testQuery({ query, token });

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchSnapshot();
  });

  it(
    "should return unauthorized error when token is not provided",
    async () => {
      const response = await testQuery({ query });

      expect(response.status).toBe(401);
      expect(response.body.errors).toMatchSnapshot();
    });
  }
);

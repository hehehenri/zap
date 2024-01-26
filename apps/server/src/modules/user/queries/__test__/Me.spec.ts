import { generateToken } from "../../../../authentication";
import { createUser } from "../../fixture";
import { describeWithDb, testQuery } from "../../../../test/helpers";

const query = {
  query: `
    query Me {
      me { username }
    }
  `,
  variables: {}
};

describeWithDb('user/queries/me', () => {  
  it("should return logged user", async () => {
    const user = await createUser();
    const token = generateToken(user);

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
    }
  );
});

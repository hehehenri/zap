import { createUser } from "../../fixture";
import { getAuth } from "../../../../authentication";
import { describeWithDb, testQuery } from "../../../../test/helpers";


const query = ({ username, password }: { username?: string, password?: string }) => ({
  query: `
    mutation Register($username: String! $password: String!) {
      register(input: { username: $username, password: $password}) { token }
    }
  `,
  variables: {
    username: username ?? "username",
    password: password ?? "password",
  }
});

describeWithDb('user/mutations/register', () => {
  it("should create user and return user token and info", async () => {      
    const response = await testQuery({ query: query({}) })
    expect(response.status).toBe(200);

    const data = response.body.data.register;
    const { user: tokenUser } = await getAuth(data.token);

    expect(tokenUser?.username).toBe("username");
  });

  it(
    "should return invalid payload when username already exists",
    async () => {
      const queryData = { username: "username", password: "password" };
      await createUser(queryData);

      const response = await testQuery({ query: query(queryData) });

      expect(response.status).toBe(422);
      expect(response.body.errors).toMatchSnapshot();
    });
  }
);

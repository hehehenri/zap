import { createUser } from "../../fixture";
import { describeWithDb, testQuery } from "../../../../test/helpers";
import { getAuth } from "../../../../authentication";
import { buildContext, initialContext } from "@/context";
import { buildLoaders } from "@/dataloaders";

const query = ({ username, password }: { username?: string, password?: string }) => ({
  query: `
    mutation Login($username: String! $password: String!) {
      login(input: { username: $username, password: $password}) { token }
    }
  `,
  variables: {
    username: username ?? "username",
    password: password ?? "password",
  }
})

describeWithDb('user/mutations/login', () => {
  const context = initialContext();
  
  it("should return user token", async () => {
    const data = { username: "username", password: "password"};
    const user = await createUser(data);
      
    const response = await testQuery({ query: query(data) });

    expect(response.status).toBe(200);

    const token = response.body.data.login.token;
    const { user: u } = await getAuth(token, context); 

    expect(u?.username).toBe(user.username);
  });

  it(
    "should return invalid payload when username or password is invalid",
    async () => {
      const data = { username: "username", password: "password" };
      await createUser(data);
      
      const response = await testQuery({ query: query({ ...data, password: "invalidPassword" }) })

      expect(response.status).toBe(422);
      expect(response.body.errors).toMatchSnapshot();
    });
  }
);

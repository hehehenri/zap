import request from "supertest";
import { createApp } from "../../../../app";
import { createUser } from "../../fixture";
import { database } from "../../../../test";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getAuth } from "../../../../authentication";

describe('user/mutations/register', () => {
  let db: MongoMemoryServer;
  
  beforeAll(async () => {
    db = await MongoMemoryServer.create();
    database.connect(db) 
  });
  afterAll(async () => database.disconnect(db));
  afterEach(database.clear);
  
  it("should create user and return user token and info", async () => {
    const variables = { username: "registeruserusername", password: "password" };
    
    const payload = {
      query: `
        mutation Register($username: String! $password: String!) {
          register(input: { username: $username, password: $password}) { token user { username } }
        }
      `,
      variables
    };
  
    const response = await request(createApp().callback())
      .post("/graphql")
      .set({
        Accept: "application/json",
        'Content-Type': "application/json",
      })
      .send(JSON.stringify(payload));

    expect(response.status).toBe(200);

    const data = response.body.data.register;
    const { user: tokenUser } = await getAuth(data.token);

    expect(data.user.username).toBe(variables.username);
    expect(tokenUser?.username).toBe(variables.username);
  });

  it(
    "should return invalid payload when username already exists",
    async () => {
      const variables = { username: "logininvaliduser", password: "password" };
      await createUser(variables);
      
      const payload = {
        query: `
          mutation Register($username: String! $password: String!) {
            register(input: { username: $username, password: $password}) { token }
          }
        `,
        variables
      };

      const response = await request(createApp().callback())
        .post("/graphql")
        .set({
          Accept: "application/json",
          'Content-Type': "application/json",
        })
        .send(JSON.stringify(payload));

      expect(response.status).toBe(422);
      expect(response.body.errors[0].message).toBe("Username already registered")
    });
  }
);

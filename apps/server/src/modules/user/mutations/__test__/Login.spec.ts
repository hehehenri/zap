import request from "supertest";
import { createApp } from "../../../../app";
import { createUser } from "../../fixture";
import { database } from "../../../../test";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getAuth } from "../../../../authentication";

describe('user/mutations/login', () => {
  let db: MongoMemoryServer;
  
  beforeAll(async () => {
    db = await MongoMemoryServer.create();
    database.connect(db) 
  });
  afterAll(async () => database.disconnect(db));
  afterEach(database.clear);
  
  it("should return user token", async () => {
    const username = "loginusername";
    await createUser({ username, password: "password" });
    
    const payload = {
      query: `
        mutation Login($username: String! $password: String!) {
          login(input: { username: $username, password: $password}) { token }
        }
      `,
      variables: {
        username,
        password: "password"
      }
    };
  
    const response = await request(createApp().callback())
      .post("/graphql")
      .set({
        Accept: "application/json",
        'Content-Type': "application/json",
      })
      .send(JSON.stringify(payload));

    const token = response.body.data.login.token;
    const { user } = await getAuth(token);

    expect(response.status).toBe(200);
    expect(user?.username).toBe(username);
  });

  it(
    "should return invalid payload when username or password is invalid",
    async () => {
      const username = "loginivnalidusername";
      await createUser({ username, password: "password" });
      
      const payload = {
        query: `
          mutation Login($username: String! $password: String!) {
            login(input: { username: $username, password: $password}) { token }
          }
        `,
        variables: {
          username,
          password: "invalidpassword"
        }
      };

      const response = await request(createApp().callback())
        .post("/graphql")
        .set({
          Accept: "application/json",
          'Content-Type': "application/json",
        })
        .send(JSON.stringify(payload));

      expect(response.status).toBe(422);
      expect(response.body.errors[0].message).toBe("Invalid password or user not found")
    });
  }
);

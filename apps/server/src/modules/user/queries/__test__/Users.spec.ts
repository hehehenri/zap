import { UserDefinition } from "../../UserModel";
import { generateToken } from "../../../../authentication";
import request from "supertest";
import { createApp } from "../../../../app";
import { createUser } from "../../fixture";
import { database } from "../../../../test";
import { MongoMemoryServer } from "mongodb-memory-server";

describe('user/queries/users', () => {
  let db: MongoMemoryServer;
  
  beforeAll(async () => {
    db = await MongoMemoryServer.create();
    database.connect(db) 
  });
  afterAll(async () => database.disconnect(db));
  afterEach(database.clear);
  
  it("should return a collection of all users", async () => {
    const firstUser: UserDefinition = await createUser(); 
    await createUser(); 

    const token = generateToken(firstUser);

    const payload = {
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

    const response = await request(createApp().callback())
      .post("/graphql")
      .set({
        Accept: "application/json",
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`
      })
      .send(JSON.stringify(payload));

    const users: any[] = response.body.data.users.edges;

    expect(response.status).toBe(200);
    expect(users.length).toBe(1)
    expect(users[0].node.username).toBe("user#1");
  });

  it(
    "should return unauthorized error when token is not provided",
    async () => {
      const payload = {
        query: `
          query User {
            users { __typename }
          }
        `,
        variables: {}
      };

      const response = await request(createApp().callback())
        .post("/graphql")
        .set({
          Accept: "application/json",
          'Content-Type': "application/json",
        })
        .send(JSON.stringify(payload));

      expect(response.status).toBe(401);
      expect(response.body.errors[0].message).toBe("User not authorized")
    });
  }
);

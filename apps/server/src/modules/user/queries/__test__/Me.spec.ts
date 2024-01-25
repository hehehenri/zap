import { UserDefinition } from "../../UserModel";
import { generateToken } from "../../../../authentication";
import request from "supertest";
import { createApp } from "../../../../app";
import { createUser } from "../../fixture";
import { database } from "../../../../test";
import { MongoMemoryServer } from "mongodb-memory-server";

describe('user/me', () => {
  let db: MongoMemoryServer;
  
  beforeAll(async () => {
    db = await MongoMemoryServer.create();
    database.connect(db) 
  });
  afterAll(async () => database.disconnect(db));
  afterEach(database.clear);
  
  it("should return logged user", async () => {
    const user: UserDefinition = await createUser(); 

    const token = generateToken(user);

    const payload = {
      query: `
        query Me {
          me { id }
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

    expect(response.status).toBe(200);
  });  
});

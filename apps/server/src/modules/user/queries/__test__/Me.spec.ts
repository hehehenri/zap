import { UserDefinition } from "../../UserModel";
import { generateToken } from "../../../../authentication";
import request from "supertest";
import { createApp } from "../../../../app";
import { createUser } from "../../fixture";
import { database } from "../../../../test";

beforeAll(database.connect);
afterEach(database.clear);
afterAll(database.disconnect);

describe('user/me', () => {
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

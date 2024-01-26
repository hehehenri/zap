import { MongoMemoryServer } from "mongodb-memory-server";
import { database } from ".";
import request from "supertest";
import { createApp } from "../app";

export const describeWithDb = (name: string, fn: jest.EmptyFunction) => {
  describe(name, () => {
    let db: MongoMemoryServer;
  
    beforeAll(async () => {
      db = await MongoMemoryServer.create();
      database.connect(db) 
    });
    afterAll(async () => database.disconnect(db));
    afterEach(database.clear);
    fn();
  })
}

type Query = {
  query: string,
  variables: Record<any, any>  
}

export const testQuery = async (input: {
  query: Query,
  token?: string,
}) => {  
  let headers: Record<string, string> = {
    Accept: "application/json",
    'Content-Type': "application/json",
  }

  if (input.token) {
    headers.Authorization = `Bearer ${input.token}`;
  }

  return await request(createApp().callback())
    .post("/graphql")
    .set(headers)
    .send(JSON.stringify(input.query));
}

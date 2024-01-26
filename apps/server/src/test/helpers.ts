import { MongoMemoryServer } from "mongodb-memory-server";
import { database } from ".";

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

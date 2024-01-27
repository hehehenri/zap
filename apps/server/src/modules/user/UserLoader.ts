import { createLoader } from "@entria/graphql-mongo-helpers";
import { UserModel } from "./UserModel";

export const UserLoader = createLoader({ model: UserModel, loaderName: "UserLoader" });

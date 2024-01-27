import { UserLoader } from "./modules/user/UserLoader"

export type DataLoaders = {
  UserLoader: ReturnType<typeof UserLoader.getLoader>
}

export const buildLoaders = (): DataLoaders => {
  return {
    UserLoader: UserLoader.getLoader(),
  }
}

import { RoomLoader } from "./modules/room/RoomLoader"
import { UserLoader } from "./modules/user/UserLoader"

export type DataLoaders = {
  UserLoader: ReturnType<typeof UserLoader.getLoader>
  RoomLoader: ReturnType<typeof RoomLoader.getLoader>
}

export const buildLoaders = (): DataLoaders => {
  return {
    UserLoader: UserLoader.getLoader(),
    RoomLoader: RoomLoader.getLoader(),
  }
}

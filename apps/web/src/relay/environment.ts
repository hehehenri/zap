import { Environment } from "relay-runtime";
import { getNetwork, IS_SERVER } from "./network";
import store from './store';

export const getEnvironment = ({ token }: { token: string | undefined }) => {
  const network = getNetwork({ token });
  
  return new Environment({ network, store, isServer: IS_SERVER });
}

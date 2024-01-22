import { Environment } from "relay-runtime";
import { getNetwork, IS_SERVER, NetworkProps } from "./network";
import store from './store';

type EnvironmentProps = {} & NetworkProps

export const getEnvironment = (props: EnvironmentProps) => {
  const network = getNetwork(props);
  
  return new Environment({ network, store, isServer: IS_SERVER });
}

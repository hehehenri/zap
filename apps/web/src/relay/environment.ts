import { Environment } from "relay-runtime";
import { network, IS_SERVER } from "./network";
import store from './store';

const environment = new Environment({ network, store, isServer: IS_SERVER });
export default environment;

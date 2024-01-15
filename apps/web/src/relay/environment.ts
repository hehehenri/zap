import { Environment, Network, RecordSource, Store } from "relay-runtime";
import network from "./network";
import store from './store';

const environment = new Environment({ network, store });
export default environment;
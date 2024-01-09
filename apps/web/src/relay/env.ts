import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { fetchFunction, subscribeFunction } from "./network";

export const env = () => {
  const network = Network.create(fetchFunction, subscribeFunction);
  const store = new Store(new RecordSource());

  return new Environment({ network, store });
}

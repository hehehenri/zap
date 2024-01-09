import { QueryResponseCache } from "relay-runtime";

const ONE_MINUTE = 60 * 1000;

export const cache = new QueryResponseCache({ size: 250, ttl: ONE_MINUTE });

const env = process.env.NEXT_PUBLIC_API_ENV;

const useSSL = env === "prod";
const httpSchema = useSSL ? "https" : "http";
const wsSchema = useSSL ? "wss" : "ws";

export const config = {
  api: {
    httpUrl: `${httpSchema}://${process.env.NEXT_PUBLIC_API_URL}`,
    wsUrl: `${wsSchema}://${process.env.NEXT_PUBLIC_API_URL}`
  }
}

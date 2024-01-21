import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const schema = z.object({
  DATABASE_URL: z.string().url(),
  API_PORT: z.string(),
  TOKEN_SECRET: z.string(),
  TOKEN_SALT_ROUNDS: z.string(),
})

const env = schema.parse(process.env);

export default {
  database: {
    uri: env.DATABASE_URL,
  },
  app: {
    port: env.API_PORT
  },
  jwt: {
    secret: env.TOKEN_SECRET,
    saltRounds: env.TOKEN_SALT_ROUNDS,
  }
} as const

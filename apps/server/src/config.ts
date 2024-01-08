export default {
  database: {
    uri: 'mongodb://localhost:27017/'
  },
  app: {
    port: 8000
  },
  jwt: {
    secret: "zap.secret",
    saltRounds: 10,
  },
}

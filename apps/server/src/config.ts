export default {
  database: {
    uri: 'mongodb://localhost:27017/'
  },
  pubsub: {
    host: '127.0.0.1',
    port: 6379
  },
  app: {
    port: 8000
  },
  jwt: {
    secret: "zap.secret",
    saltRounds: 10,
  }
}

const serverConfig = {
  mongoUrl: process.env.MONGO_URL ?? "mongodb://localhost:27017",
  appName: process.env.PROJECT_NAME ?? "Default name",
  port: process.env.PORT ? +process.env.PORT : 3000,
  environment: process.env.NODE_ENV ?? "development",
  jwtSecret: process.env.SECRET ?? "secret-phrase",
  jwtExpires: process.env.JWT_EXPIRES ?? "1d",
  metaEmailUser: process.env.META_MAIL,
  metaEmailPass: process.env.META_PASS,
};

module.exports = serverConfig;

const app = require("./app");
const mongoose = require("mongoose");
const { serverConfig } = require("./configs");

mongoose
  .connect(serverConfig.mongoUrl)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.listen(process.env.PORT ?? 300, () => {
  console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
});

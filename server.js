const app = require("./app");

app.listen(process.env.PORT ?? 300, () => {
  console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
});

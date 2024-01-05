const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./envs/production.env"
      : "./envs/development.env",
});

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const { errorController } = require("./controllers/contactsController/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorController.globalErrorHandler);

module.exports = app;

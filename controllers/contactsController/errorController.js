const { serverConfig } = require("../../configs");

exports.globalErrorHandler = (err, req, res, next) => {
  if (serverConfig.environment === "production") {
    return res.status(err.status ?? 500).json({
      message:
        !err.status || err.status === 500
          ? "Internal server error"
          : err.message,
    });
  }

  res.status(err.status ?? 500).json({
    message: err.message,
    stack: err.stack,
  });
};

const { model, Schema } = require("mongoose");
const { userRoleEnum } = require("../constants");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(userRoleEnum),
      default: userRoleEnum.STARTER,
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

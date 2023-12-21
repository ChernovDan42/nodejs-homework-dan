// const { Types } = require("mongoose");

const { userSubscriptionEnum } = require("../constants");
const { User } = require("../models");
const { HttpError } = require("../utils");
const { signToken } = require("./jwtServices");

exports.createNewUser = async (userData) => {
  const newUserData = {
    ...userData,
    subscription: userSubscriptionEnum.STARTER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  return {
    user: { email: newUser.email, subscription: newUser.subscription },
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new HttpError(401, "Email or password is wrong");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw new HttpError(401, "Email or password is wrong");

  const token = signToken(user.id);

  user.token = token;

  await user.save();

  user.password = undefined;

  return {
    user: { email: user.email, subscription: user.subscription },
    token,
  };
};

exports.logout = async (user) => {
  user.token = undefined;

  await user.save();
};

exports.checkUserExist = async (filter) => {
  const userExists = await User.exists(filter);

  if (userExists) throw new HttpError(409, "Email in use");
};

const { userSubscriptionEnum } = require("../constants");
const { User } = require("../models");
const { HttpError } = require("../utils");
const ImageService = require("./imageServices");
const { signToken } = require("./jwtServices");
const { v4: uuidv4 } = require("uuid");
const Email = require("./emailServices");
const { serverConfig } = require("../configs");

exports.createNewUser = async (userData) => {
  const newUserData = {
    ...userData,
    subscription: userSubscriptionEnum.STARTER,
    verificationToken: uuidv4(),
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      verificationToken: newUser.verificationToken,
    },
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user.verify) throw new HttpError(403, "Verify your email");

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

exports.updateUserSubscription = async (id, subscriptionType) => {
  const user = await User.findById(id);
  user.subscription = subscriptionType.subscription;

  return user.save();
};

exports.updateMe = async (userData, user, file) => {
  if (file) {
    user.avatarURL = await ImageService.saveImage(
      file,
      { maxFileSize: 1.2, width: 250, height: 250 },
      "avatars",
      "users",
      user.id
    );
  } else {
    throw new HttpError(400, "Please add your avatar");
  }

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

exports.getUserByVerificationToken = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) throw new HttpError(404, "User not found");

  user.verificationToken = "null";
  user.verify = true;

  await user.save();
};

exports.resendVerificationMail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new HttpError(404, "User not found");

  if (user.verify)
    throw new HttpError(400, "Verification has already been passed");

  try {
    await new Email(
      user,
      `http://127.0.0.1:${serverConfig.port}/api/users/verify/${user.verificationToken}`
    ).sendHello();
  } catch (error) {
    console.log(error);
  }
};

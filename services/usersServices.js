// const { Types } = require("mongoose");

const { User } = require("../models");

exports.createNewUser = async (userData) => {
  const newUser = User.create(userData);

  return newUser;
};

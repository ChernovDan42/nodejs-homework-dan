const { usersServices, jwtServices } = require("../services");
const { catchAsync, usersValidation, HttpError } = require("../utils");
const { User } = require("../models");

exports.checkUserRegisterData = catchAsync(async (req, res, nex) => {
  const { error, value } = usersValidation.userDataValidation(req.body);

  if (error) throw new HttpError(400, error.details[0].message);

  await usersServices.checkUserExist({ email: value.email });

  req.body = value;

  nex();
});

exports.checkUserLoginData = catchAsync(async (req, res, nex) => {
  const { error, value } = usersValidation.userDataValidation(req.body);

  if (error) throw new HttpError(400, error.details[0].message);

  req.body = value;

  nex();
});

exports.protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = jwtServices.checkToken(token);


  if (!userId) throw new HttpError(401, "Not authorized");


  const currentUser = await User.findById(userId);

  if (!currentUser || currentUser.token !== token)
    throw new HttpError(401, "Not authorized"); 

  req.user = currentUser;

  next();
});

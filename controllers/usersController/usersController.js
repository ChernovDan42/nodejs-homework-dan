const { usersServices } = require("../../services");
const { catchAsync } = require("../../utils");

exports.register = catchAsync(async (req, res) => {
  const { user, token } = await usersServices.createNewUser(req.body);

  res.status(201).json({
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { user, token } = await usersServices.login(req.body);

  res.status(200).json({
    user,
    token,
  });
});

exports.logout = catchAsync(async (req, res) => {
  await usersServices.logout(req.user);

  res.status(204).send();
});

exports.getCurrentUser = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
});

exports.updateUserSubscription = catchAsync(async (req, res) => {
  const user = await usersServices.updateUserSubscription(
    req.params.id,
    req.body
  );

  res.status(200).json(user);
});
exports.updateMe = catchAsync(async (req, res) => {
  const updatedUser = await usersServices.updateMe(
    req.body,
    req.user,
    req.file
  );

  res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  });
});

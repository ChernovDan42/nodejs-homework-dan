const { usersServices } = require("../../services");
const { catchAsync } = require("../../utils");

exports.register = catchAsync(async (req, res) => {
  const newUser = await usersServices.createNewUser(req.body);
  newUser.password = undefined;

  res.status(201).json(newUser);
});

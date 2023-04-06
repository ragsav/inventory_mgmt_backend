const constants = require("../constants");
const Logger = require("../utils/logger");
const { prisma } = require("../config/prisma");
const userController = {};

userController.getUserInfo = async (req, res) => {
  Logger.log("info", { message: "userController:getUserInfo:start" });
  try {
    const { user, firebaseUser } = req;
    if (user) {
      Logger.log("info", { message: "userController:getUserInfo:already_exists", params: { user } });
      return res.json({ success: true, user });
    } else {
      Logger.log("info", { message: "userController:getUserInfo:create", params: { user: firebaseUser } });

      const newUser = await prisma.tblUsers.create({
        data: {
          phoneNumber: firebaseUser.phone_number,
          firebaseID: firebaseUser.uid,
          tblUserTypes: {
            connect: {
              id: 1,
            },
          },
        },
      });
      Logger.log("info", { message: "userController:getUserInfo:created", params: { user: newUser } });

      return res.json({ success: true, user: newUser });
    }
  } catch (error) {
    Logger.log("info", { message: "userController:getUserInfo:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

module.exports = userController;

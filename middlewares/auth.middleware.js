var admin = require("firebase-admin");
const { prisma } = require("../config/prisma");
const constants = require("../constants");
const Logger = require("../utils/logger");
module.exports = async function (req, res, next) {
  Logger.log("info", { message: "authMiddleware:start" });
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      let idToken = req.headers.authorization.split("Bearer ")[1];
      const decodedIdToken = await admin.auth().verifyIdToken(idToken);

      Logger.log("info", { message: "authMiddleware:success", params: { uid: decodedIdToken.uid, phone: decodedIdToken.phoneNumber } });
      const dbUser = await prisma.tblUsers.findFirst({ where: { firebaseID: decodedIdToken.uid } });
      req.user = dbUser;
      req.firebaseUser = decodedIdToken;

      return next();
    } catch (error) {
      Logger.log("error", { message: "authMiddleware:catch-2", params: { error } });
      res.send({ error: constants.ERROR_CODES.USER_AUTH_TOKEN_EXPIRED });
    }
  } else {
    Logger.log("error", { message: "authMiddleware:catch-1", params: { error: constants.ERROR_CODES.USER_AUTH_TOKEN_NOT_FOUND } });
    res.send({ error: constants.ERROR_CODES.USER_AUTH_TOKEN_NOT_FOUND });
  }
};

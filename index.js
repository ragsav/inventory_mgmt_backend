require("dotenv").config();
require("./config/firebase");
const constants = require("./constants");
const Logger = require("./utils/logger");
const globalVariableController = require("./config/globalVariable.controller");
const { expressApp } = require("./config/express.app");
const { httpServer } = require("./config/http.server");

const { prisma } = require("./config/prisma");

//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
expressApp.use("/api/users", require("./routes/user.route"));
expressApp.use("/api/asset_types", require("./routes/assetType.route"));
expressApp.use("/api/assets", require("./routes/asset.route"));
expressApp.use("/api/site_incharges", require("./routes/siteIncharge.route"));
expressApp.use("/api/sites", require("./routes/site.route"));
expressApp.use("/api/vlans", require("./routes/vlan.route"));

// error handling here
// for this separate function
expressApp.get("/", async (req, res) => {
  console.log("hello");
  res.status(404).json({
    error: constants.ERROR_CODES.SERVER_ERROR,
  });
});

//-----------------------------------------------------------------------------------
const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  Logger.log("success", { message: "server started listening", params: { port } });
});

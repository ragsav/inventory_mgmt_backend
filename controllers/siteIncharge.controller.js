const Logger = require("../utils/logger");
const constants = require("../constants");
const { prisma } = require("../config/prisma");
const siteInchargeController = {};

siteInchargeController.getAllSiteIncharge = async (req, res) => {
  try {
    const siteIncharges = await prisma.tblSiteIncharge.findMany();
    return res.json({ success: true, siteIncharges });
  } catch (error) {
    Logger.log("error", { message: "siteInchargeController:getAllSiteIncharge:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteInchargeController.getSiteInchargeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const siteIncharge = await prisma.tblSiteIncharge.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true, siteIncharge });
  } catch (error) {
    Logger.log("error", { message: "siteInchargeController:getSiteInchargeByID:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteInchargeController.addNewSiteIncharge = async (req, res) => {
  try {
    const { name, email, id } = req.body;
    const siteIncharge = await prisma.tblSiteIncharge.create({
      data: {
        id: parseInt(id),
        email,
        name: name,
      },
    });
    return res.json({ success: true, siteIncharge });
  } catch (error) {
    Logger.log("error", { message: "siteInchargeController:addNewSiteIncharge:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteInchargeController.updateSiteIncharge = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const siteIncharge = await prisma.tblSiteIncharge.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        name,
      },
    });
    return res.json({ success: true, siteIncharge });
  } catch (error) {
    Logger.log("error", { message: "siteInchargeController:updateSiteIncharge:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteInchargeController.deleteSiteIncharge = async (req, res) => {
  try {
    const { id } = req.params;

    const siteIncharge = await prisma.tblSiteIncharge.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true });
  } catch (error) {
    Logger.log("error", { message: "siteInchargeController:deleteSiteIncharge:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

module.exports = siteInchargeController;

const Logger = require("../utils/logger");
const constants = require("../constants");
const { prisma } = require("../config/prisma");
const siteController = {};

siteController.getAllSite = async (req, res) => {
  try {
    const sites = await prisma.tblSite.findMany({ include: { tblSiteIncharge: true } });
    return res.json({ success: true, sites });
  } catch (error) {
    Logger.log("error", { message: "siteController:getAllSite:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteController.getSiteByID = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await prisma.tblSite.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        tblSiteIncharge: true,
      },
    });
    return res.json({ success: true, site });
  } catch (error) {
    Logger.log("error", { message: "siteController:getSiteByID:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteController.addNewSite = async (req, res) => {
  try {
    const { name, sicID, pincode, address } = req.body;
    const site = await prisma.tblSite.create({
      data: {
        name,
        pincode: String(pincode),
        address: String(address),
        tblSiteIncharge: {
          connect: {
            id: parseInt(sicID),
          },
        },
      },
    });
    return res.json({ success: true, site });
  } catch (error) {
    Logger.log("error", { message: "siteController:addNewSite:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteController.updateSite = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sicID, pincode, address } = req.body;
    const site = await prisma.tblSite.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        pincode: String(pincode),
        address: String(address),
        tblSiteIncharge: {
          connect: {
            id: parseInt(sicID),
          },
        },
      },
    });
    return res.json({ success: true, site });
  } catch (error) {
    Logger.log("error", { message: "siteController:updateSite:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

siteController.deleteSite = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await prisma.tblSiteIncharge.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true });
  } catch (error) {
    Logger.log("error", { message: "siteController:deleteSite:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

module.exports = siteController;

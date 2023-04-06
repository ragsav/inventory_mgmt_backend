const Logger = require("../utils/logger");
const constants = require("../constants");
const { prisma } = require("../config/prisma");
const assetTypeController = {};

assetTypeController.getAllAssetTypes = async (req, res) => {
  try {
    const assetTypes = await prisma.tblAssetType.findMany();
    return res.json({ success: true, assetTypes });
  } catch (error) {
    Logger.log("error", { message: "assetTypeController:getAllAssetTypes:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetTypeController.getAssetTypeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const assetType = await prisma.tblAssetType.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true, assetType });
  } catch (error) {
    Logger.log("error", { message: "assetTypeController:getAssetTypeByID:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetTypeController.addNewAssetType = async (req, res) => {
  try {
    const { name, oem, model, build } = req.body;
    const assetType = await prisma.tblAssetType.create({
      data: {
        name,
        oem,
        model,
        build,
      },
    });
    return res.json({ success: true, assetType });
  } catch (error) {
    Logger.log("error", { message: "assetTypeController:addNewAssetType:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetTypeController.updateAssetType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, oem, model, build } = req.body;
    const assetType = await prisma.tblAssetType.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        oem,
        model,
        build,
      },
    });
    return res.json({ success: true, assetType });
  } catch (error) {
    Logger.log("error", { message: "assetTypeController:updateAssetType:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetTypeController.deleteAssetType = async (req, res) => {
  try {
    const { id } = req.params;
    const assetType = await prisma.tblAssetType.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true });
  } catch (error) {
    Logger.log("error", { message: "assetTypeController:deleteAssetType:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

module.exports = assetTypeController;

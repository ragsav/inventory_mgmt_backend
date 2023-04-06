const Logger = require("../utils/logger");
const constants = require("../constants");
const { prisma } = require("../config/prisma");
const assetController = {};

assetController.getAllAssets = async (req, res) => {
  try {
    const assets = await prisma.tblAsset.findMany({ orderBy: { serialNumber: 'asc' }, include: { tblSite: true } });
    return res.json({ success: true, assets });
  } catch (error) {
    Logger.log("error", { message: "assetController:getAllAssets:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetController.getAssetByID = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await prisma.tblAsset.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        tblAssetType: true,
        tblSite: {
          include: {
            tblSiteIncharge: true,
          },
        },
        tblVLANAssetMap: true,
      },
    });
    return res.json({ success: true, asset });
  } catch (error) {
    Logger.log("error", { message: "assetController:getAssetByID:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetController.addNewAsset = async (req, res) => {
  try {
    const { serialNumber, siteID, typeID, isOperational, note, isBuybackable, build, buybackedAt, decomissionedAt } = req.body;
    const assetType = await prisma.tblAssetType.findUnique({ where: { id: parseInt(typeID) } });
    const site = await prisma.tblSite.findUnique({ where: { id: parseInt(siteID) } });
    if (!site || !assetType) {
      return res.json({ success: false });
    }
    const asset = await prisma.tblAsset.create({
      data: {
        serialNumber: String(serialNumber),
        siteID: site.id,
        typeID: assetType.id,
        isOperational: Boolean(isOperational),
        note: String(note),
        isBuybackable: Boolean(isBuybackable),
        build: String(build),
        buybackedAt: buybackedAt && String(buybackedAt).length !== 0 ? new Date(buybackedAt) : null,
        decomissionedAt: decomissionedAt && String(decomissionedAt).length !== 0 ? new Date(decomissionedAt) : null,
      },
    });
    return res.json({ success: true, asset });
  } catch (error) {
    Logger.log("error", { message: "assetController:addNewAsset:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetController.updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { serialNumber, siteID, typeID, isOperational, note, isBuybackable, build, buybackedAt, decomissionedAt } = req.body;
    const assetType = await prisma.tblAssetType.findUnique({ where: { id: parseInt(typeID) } });
    const site = await prisma.tblSite.findUnique({ where: { id: parseInt(siteID) } });
    const asset = await prisma.tblAsset.update({
      where: {
        id: parseInt(id),
      },
      data: {
        serialNumber: String(serialNumber),
        siteID: site.id,
        typeID: assetType.id,
        isOperational: Boolean(isOperational),
        note: String(note),
        isBuybackable: Boolean(isBuybackable),
        build: String(build),
        buybackedAt: buybackedAt && String(buybackedAt).length !== 0 ? new Date(buybackedAt) : null,
        decomissionedAt: decomissionedAt && String(decomissionedAt).length !== 0 ? new Date(decomissionedAt) : null,
      },
    });
    return res.json({ success: true, asset });
  } catch (error) {
    Logger.log("error", { message: "assetController:updateAsset:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetController.deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await prisma.tblAsset.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true });
  } catch (error) {
    Logger.log("error", { message: "assetController:deleteAsset:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetController.addVLANsToAsset = async (req, res) => {
  try {
    const { vlanIDs } = req.body;
    const { id } = req.params;

    const assetID = parseInt(id);

    const processedVLANs = vlanIDs.map((v) => {
      return parseInt(v);
    })
    const asset = await prisma.tblAsset.findUnique({ where: { id: assetID } });
    if (!asset) {
      return res.json({ success: false, error: constants.ERROR_CODES.ASSET_NOT_FOUND });
    }
    const vlans = await prisma.tblVLAN.findMany({ where: { id: { in: processedVLANs } } });

    if (!vlans) {
      return res.json({ success: false, error: constants.ERROR_CODES.VLAN_NOT_FOUND });
    }
    let validVLANIDs = vlans.map((vlan) => {
      return vlan.id;
    })

    const deletedMappings = await prisma.tblVLANAssetMap.deleteMany({ where: { assetID: assetID } });
    console.log({ vlanIDs, vlans })
    const createdMappings = await prisma.tblVLANAssetMap.createMany({
      data: validVLANIDs.map((id) => {
        return { VLANID: id, assetID }
      })
    })
    return res.json({ success: true });
  } catch (error) {
    Logger.log("error", { message: "assetController:addVLANToAsset:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetController.getAllVLANsOfAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const assetID = parseInt(id);
    const asset = await prisma.tblAsset.findUnique({ where: { id: assetID } });
    console.log({ asset })
    if (!asset) {
      return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
    }
    const VLANAssetMapping = await prisma.tblVLANAssetMap.findMany({
      where: {
        assetID: assetID,
      },
      include: {
        tblVLAN: true
      }
    });

    const vlans = VLANAssetMapping.map((m) => {
      return m.tblVLAN;
    })
    return res.json({ success: true, vlans });
  } catch (error) {
    Logger.log("error", { message: "assetController:getAllVLANOfAsset:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

assetController.getAllAssetData = async (req, res) => {
  try {

    const data = await prisma.tblSite.findMany({
      include: {
        tblSiteIncharge: true, tblAsset: {
          include: {
            tblAssetType: true,
            tblVLANAssetMap: {
              include: {
                tblVLAN: true
              }
            }
          }
        }
      }
    });

    return res.json({ success: true, data });
  } catch (error) {
    Logger.log("error", { message: "assetController:getAllAssetData:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
}

module.exports = assetController;

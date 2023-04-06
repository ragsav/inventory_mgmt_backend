const Logger = require("../utils/logger");
const constants = require("../constants");
const { prisma } = require("../config/prisma");
const vlanController = {};

vlanController.getAllVLANs = async (req, res) => {
  try {
    const vlans = await prisma.tblVLAN.findMany({ include: { tblSite: true } });
    return res.json({ success: true, vlans });
  } catch (error) {
    Logger.log("error", { message: "vlanController:getAllVLANs:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

vlanController.getVLANByID = async (req, res) => {
  try {
    const { id } = req.params;
    const vlan = await prisma.tblVLAN.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true, vlan });
  } catch (error) {
    Logger.log("error", { message: "vlanController:getVLANByID:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

vlanController.getVLANByVLANID = async (req, res) => {
  try {
    const { VLANID } = req.params;
    const vlans = await prisma.tblVLAN.findMany({
      where: {
        VLANID: parseInt(VLANID),
      },
    });
    return res.json({ success: true, vlans });
  } catch (error) {
    Logger.log("error", { message: "vlanController:getVLANByVLANID:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

vlanController.addNewVLAN = async (req, res) => {
  try {
    const { VLANID, siteID, IP, tag, subnet, gateway } = req.body;

    const site = await prisma.tblSite.findUnique({ where: { id: parseInt(siteID) } });
    if (!site) {
      return res.json({ success: false });
    }
    const vlan = await prisma.tblVLAN.create({
      data: {
        VLANID: parseInt(VLANID),
        siteID: site.id,
        IP: String(IP),
        tag: String(tag),
        subnet: String(subnet),
        gateway: String(gateway),
      },
    });
    return res.json({ success: true, vlan });
  } catch (error) {
    Logger.log("error", { message: "vlanController:addNewVLAN:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

vlanController.updateVLAN = async (req, res) => {
  try {
    const { id } = req.params;
    const { VLANID, siteID, IP, tag, subnet, gateway } = req.body;

    const site = await prisma.tblSite.findUnique({ where: { id: parseInt(siteID) } });
    if (!site) {
      return res.json({ success: false });
    }
    const vlan = await prisma.tblVLAN.update({
      where: {
        id: parseInt(id),
      },
      data: {
        VLANID: parseInt(VLANID),
        siteID: site.id,
        IP: String(IP),
        tag: String(tag),
        subnet: String(subnet),
        gateway: String(gateway),
      },
    });
    return res.json({ success: true, vlan });
  } catch (error) {
    Logger.log("error", { message: "vlanController:updateVLAN:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};

vlanController.deleteVLAN = async (req, res) => {
  try {
    const { id } = req.params;
    const vlan = await prisma.tblVLAN.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({ success: true });
  } catch (error) {
    Logger.log("error", { message: "vlanController:deleteVLAN:catch-1", params: { error } });
    return res.json({ success: false, error: constants.ERROR_CODES.SERVER_ERROR });
  }
};



module.exports = vlanController;

const { prisma } = require("../config/prisma");
const constants = require("../constants");
const Logger = require("../utils/logger");

const checkMiddleware = {};

checkMiddleware.isSiteInchargeNotUsed = async (req, res, next) => {
    try {
        const { id } = req.params;
        const site = await prisma.tblSite.findFirst({ where: { sicID: parseInt(id) } });
        if (site) {
            Logger.log('error', { message: 'checkMiddleware:isSiteInchargeUsed:catch-2', params: { error: constants.ERROR_CODES.SITE_INCHARGE_ALREADY_IN_USE } })
            return res.json({ success: false, error: constants.ERROR_CODES.SITE_INCHARGE_ALREADY_IN_USE })
        } else {
            return next();
        }
    } catch (error) {
        Logger.log('error', { message: 'checkMiddleware:isSiteInchargeUsed:catch-1', params: { error } })
    }
}
module.exports = checkMiddleware;
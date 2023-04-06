const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// const test = async () => {

//     const t = await prisma.tblSite.findMany({ include: { tblSiteIncharge: true, tblVLAN: true } })
//     console.log(t)
// }
// test();
// tblAsset: { include: { tblAssetType: true, tblVLANAssetMap: true } }

console.log()
module.exports = { prisma };

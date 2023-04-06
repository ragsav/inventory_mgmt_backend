const { prisma } = require("./prisma");
const globalVariableController = {};

// globalVariableController.setStations = async () => {
//   const stations = await prisma.tbl_stations.findMany();
//   global.stations = stations;
// };

// globalVariableController.setVehicleTypes = async () => {
//   const vehicleTypes = await prisma.tbl_vehicle_types.findMany();
//   global.vehicleTypes = vehicleTypes;
// };
module.exports = globalVariableController;

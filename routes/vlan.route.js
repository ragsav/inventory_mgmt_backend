const express = require("express");
const vlanController = require("../controllers/vlan.controller");
const router = express.Router();

router.get("/", vlanController.getAllVLANs);
router.get("/:id", vlanController.getVLANByID);
router.post("/", vlanController.addNewVLAN);
router.patch("/:id", vlanController.updateVLAN);
router.delete("/:id", vlanController.deleteVLAN);
// router.post("/map", vlanController.addVLANToAsset);
// router.post("/unmap", vlanController.removeVLANFromAsset);

module.exports = router;

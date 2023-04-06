const express = require("express");
const assetController = require("../controllers/asset.controller");
const router = express.Router();

router.get("/", assetController.getAllAssets);
router.get("/all", assetController.getAllAssetData);
router.get("/:id", assetController.getAssetByID);
router.get("/:id/vlans", assetController.getAllVLANsOfAsset);
router.post("/", assetController.addNewAsset);
router.post("/:id/vlans", assetController.addVLANsToAsset);
router.patch("/:id", assetController.updateAsset);
router.delete("/:id", assetController.deleteAsset);

module.exports = router;

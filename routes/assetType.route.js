const express = require("express");
const assetTypeController = require("../controllers/assetType.controller");
const router = express.Router();

router.get("/", assetTypeController.getAllAssetTypes);
router.get("/:id", assetTypeController.getAssetTypeByID);
router.post("/", assetTypeController.addNewAssetType);
router.patch("/:id", assetTypeController.updateAssetType);
router.delete("/:id", assetTypeController.deleteAssetType);

module.exports = router;

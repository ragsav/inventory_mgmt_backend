const express = require("express");
const siteInchargeController = require("../controllers/siteIncharge.controller");
const checkMiddleware = require("../middlewares/check.middleware");
const router = express.Router();

router.get("/", siteInchargeController.getAllSiteIncharge);
router.get("/:id", siteInchargeController.getSiteInchargeByID);
router.post("/", siteInchargeController.addNewSiteIncharge);
router.patch("/:id", siteInchargeController.updateSiteIncharge);
router.delete("/:id", checkMiddleware.isSiteInchargeNotUsed, siteInchargeController.deleteSiteIncharge);

module.exports = router;

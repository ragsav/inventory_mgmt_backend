const express = require("express");
const siteController = require("../controllers/site.controller");

const router = express.Router();

router.get("/", siteController.getAllSite);
router.get("/:id", siteController.getSiteByID);
router.post("/", siteController.addNewSite);
router.patch("/:id", siteController.updateSite);
router.delete("/:id", siteController.deleteSite);

module.exports = router;

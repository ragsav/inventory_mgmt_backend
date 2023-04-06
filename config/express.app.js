const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const expressApp = express();
expressApp.use(morgan("dev"));
expressApp.use(cors());
expressApp.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buffer) => (req.rawBody = buffer),
  })
);
expressApp.use(express.urlencoded({ limit: "5mb", extended: false }));
expressApp.use(express.json({ extended: false }));
module.exports = { expressApp };

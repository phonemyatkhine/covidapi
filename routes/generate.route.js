const express = require("express");
const Generator = require("../controllers/generate.controller");
const checktoken = require("../middlewares/checktoken");

const router = express.Router();

router.get("/data/prepare", checktoken, Generator.PrepareData);
router.get("/data/load", checktoken, Generator.LoadData);

router.get("/model/create", checktoken, Generator.CreateModels);
router.get("/model/load", checktoken,  Generator.LoadModules);

router.get("/route/create", checktoken, Generator.CreateRoutes);
router.get("/route/load", checktoken, Generator.LoadRoutes);

router.use("/", Generator.Routes);

module.exports = router;

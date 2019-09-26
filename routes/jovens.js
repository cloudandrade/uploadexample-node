const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//models
require("../models/Jovem");
const Jovem = mongoose.model("jovens");

//listagem de jovens
router.get("/", (req, res) => {
  res.render("jovem/lista-jovens");
});
//cadastro de jovens
router.get("/cadastro", (req, res) => {
  res.render("jovem/cadastro-jovem");
});

router.get("/home", (req, res) => {
  res.render("home2");
});

module.exports = router;

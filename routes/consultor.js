const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//models
require("../models/Consultor");
const Consultor = mongoose.model("consultores");

//listagem de consultores
router.get("/", (req, res) => {
  res.render("consultor/lista-consultores");
});
//cadastro  de consultores
router.get("/cadastro", (req, res) => {
  res.render("consultor/cadastro-consultor");
});

module.exports = router;

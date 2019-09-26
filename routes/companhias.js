const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//models
require("../models/Companhia");
const Companhia = mongoose.model("companhias");

//Lista de companhias
router.get("/", (req, res) => {
  res.render("companhia/lista-companhias");
});

router.get("/cadastro", (req, res) => {
  res.render("companhia/criar-companhia");
});

module.exports = router;

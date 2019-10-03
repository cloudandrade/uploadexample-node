const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//models
require("../models/Jovem");
const Jovem = mongoose.model("jovens");

//listagem de jovens
router.get("/", (req, res) => {
  Jovem.find()
    .then(jovens => {
      res.render("jovem/lista-jovens", { jovens: jovens });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/estaca", (req, res) => {
  res.render("jovem/lista-jovens-estaca");
});

router.post("/estaca", (req, res) => {
  const { estaca } = req.body;

  Jovem.find({ estaca: estaca })
    .then(jovens => {
      res.render("jovem/lista-jovens-estaca", { jovens: jovens });
    })
    .catch(err => {
      console.log(err);
    });
});

//cadastro de jovens
router.get("/cadastro", (req, res) => {
  res.render("jovem/cadastro-jovem");
});

//tratativa de cadastro de jovem
router.post("/cadastro", (req, res) => {
  const { nome, telefone, sexo, estaca, ala, cmis, idade } = req.body;
  let errors = [];

  //check required fields
  if (!nome || !sexo || !idade || !estaca) {
    errors.push({ msg: "Porfavor preencha todos os campos marcados com *" });
  }

  if (errors.length > 0) {
    res.render("jovem/cadastro-jovem", {
      errors,
      nome,
      telefone,
      idade,
      sexo,
      cmis,
      estaca,
      ala
    });
  } else {
    //validation passed
    Jovem.findOne({ nome: nome })
      .then(jovem => {
        if (jovem) {
          //user exists
          errors.push({ msg: "Jovem já cadastrado" });
          res.render("jovem/cadastro-jovem", {
            errors,
            nome,
            telefone,
            idade,
            sexo,
            cmis,
            estaca,
            ala
          });
        } else {
          const novoJovem = new Jovem({
            nome,
            telefone,
            idade,
            sexo,
            cmis,
            estaca,
            ala
          });

          novoJovem
            .save()
            .then(jovemCreated => {
              req.flash("success_msg", "Jovem cadastrado");
              res.redirect("/dashboard/jovens/cadastro");
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
});

module.exports = router;

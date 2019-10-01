const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//models
require("../models/Jovem");
const Jovem = mongoose.model("jovens");

//listagem de jovens
router.get("/", (req, res) => {
  Jovem.find().then(jovens => {
    res.render("jovem/lista-jovens", {jovens: jovens});
  }).catch(err => {
    console.log(err)
  })
});

//cadastro de jovens
router.get("/cadastro", (req, res) => {
  res.render("jovem/cadastro-jovem");
});

//tratativa de cadastro de jovem
router.post("/cadastro", (req, res) => {
  const { nome, telefone, sexo, estaca, ala, email, cpf, cmis, datanascimento, dataconfirmacao, idade } = req.body;
  let errors = [];

  //check required fields
  if (!nome || !email || !telefone || !sexo || !cpf || !idade || !datanascimento) {
    errors.push({ msg: "Porfavor preencha todos os campos marcados com *" });
  }

  if (errors.length > 0) {
    res.render("jovem/cadastro-jovem", {
      errors,
      nome,
      email,
      telefone,
      cpf,
      idade,
      sexo,
      cmis,
      datanascimento,
      dataconfirmacao,
      estaca,
      ala
    });

  } else {
    //validation passed
    Jovem.findOne({ cpf: cpf })
      .then(jovem => {
        if (jovem) {
          //user exists
          errors.push({ msg: "Jovem já cadastrado" });
          res.render("jovem/cadastro-jovem", {
            errors,
            nome,
            email,
            telefone,
            cpf,
            idade,
            sexo,
            cmis,
            datanascimento,
            dataconfirmacao,
            estaca,
            ala
          })
        } else {
          const novoJovem = new Jovem({
            nome,
            email,
            telefone,
            cpf,
            idade,
            sexo,
            cmis,
            datanascimento,
            dataconfirmacao,
            estaca,
            ala
          });

          novoJovem
          .save()
          .then(jovemCreated => {
            req.flash("success_msg", "Jovem cadastrado");
            res.redirect("dashboard/jovens/cadastro");
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


router.get("/home", (req, res) => {
  res.render("home2");
});

module.exports = router;

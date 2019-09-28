const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//models
require("../models/Companhia");
const Companhia = mongoose.model("companhias");

//Lista de companhias
router.get("/", (req, res) => {
   Companhia.find().then(companhias => {
    res.render("companhia/lista-companhias", {companhias: companhias});
  }).catch(err => {
    console.log(err)
  })
  


  
  
});

router.get("/cadastro", (req, res) => {
  res.render("companhia/criar-companhia");
});

//register handle
router.post("/cadastro", (req, res) => {
  const { nome, descricao } = req.body;
  let errors = [];

  //check required fields
  if (!nome) {
    errors.push({ msg: "Companhia precisa ter um nome" });
  }

  //se houver erros recarrega a página
  if (errors.length > 0) {
    res.render("companhia/criar-companhia", {
      errors,
      nome,
      descricao
    });
  } else {
    //validation passed
    Companhia.findOne({ nome: nome })
      .then(companhia => {
        if (companhia) {
          //companhia  exists
          errors.push({ msg: "Já existe um companhia com esse nome" });
          res.render("companhia/criar-companhia", {
            errors,
            nome,
            descricao
          });
        } else {
          const novaCompanhia = new Companhia({
            nome,
            descricao
          });

          novaCompanhia
            .save()
            .then(companhiaCriada => {
              req.flash("success_msg", "Companhia Criada com sucesso");
              res.redirect("/dashboard");
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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Jovem = new Schema({
  nome: {
    type: String,
    required: true
  },
  telefone: {
    type: Number
  },
  cpf: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  idade: {
    type: Number,
    required: true
  },
  estaca: {
    type: String,
    required: true
  },
  ala: {
    type: String
  },
  cmis: {
    type: Number
  },
  sexo: {
    type: String,
    enum: ["M", "F"]
  },
  datanascimento: {
    type: Date,
    required: true
  },
  dataconfirmação: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  companhia: {
    type: Schema.Types.ObjectId,
    ref: "companhias"
  }
});
mongoose.model("jovens", Jovem);

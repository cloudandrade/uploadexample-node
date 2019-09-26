const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const userRoutes = require("./users");
const staticRoutes = require("./static");
const jovensRoutes = require("./jovens");
const companhiaRoutes = require("./companhias");
const consultorRoutes = require("./consultor");

//Routes
router.get("/", (req, res) => res.render("index"));
router.use("/users", userRoutes);
router.use("/auth", staticRoutes);
router.use("/dashboard/jovens", jovensRoutes);
router.use("/dashboard/companhias", companhiaRoutes);
router.use("/dashboard/consultores", consultorRoutes);

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("home", {
    name: req.user.name
  })
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

//Routes
router.get("/", (req, res) => res.render("index"));
router.use("/users", require("./users"));
router.use("/auth", require("./static"));

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    name: req.user.name
  })
);

module.exports = router;

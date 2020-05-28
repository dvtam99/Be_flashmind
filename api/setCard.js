const authMdw = require("../middleware/auth");
const { createSetCard , getListSetCard, getSetCard} = require("../services/setCard");

const router = require("express").Router();

router.post("/", authMdw({ optional: true }), (req, res) => {
  createSetCard(req.body).then((setCard) => res.json(setCard));
});

router.get("/", authMdw({ optional: true }), (req, res) => {
  getListSetCard(req.user).then((setCards) => {
    res.json(setCards);
  });
});

router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  getSetCard(slug).then((setCard) => res.json(setCard));
});
module.exports = router;

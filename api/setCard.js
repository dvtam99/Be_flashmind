const authMdw = require("../middleware/auth");
const {
  createSetCard,
  getSetCard,
  updateSetCard,
  deleteSetCard,
  getListSetCard
} = require("../services/setCard");

const router = require("express").Router();

router.post("/", authMdw(), (req, res) => {
  createSetCard(req.user, req.body).then((post) => res.json(post));
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

router.put("/", authMdw({ optional: true }), (req, res) => {
  console.log(res.body);
  updateSetCard(req.body._id, req.body).then((newSetCard) => {
    res.json(newSetCard);
  });
});
router.delete("/", (req, res) => {
  const id = req.body;
  deleteSetCard(id)
    .then((setCard) => res.json({ success: true }))
    .catch((err) => res.json({ success: false, err: err.message }));
});
module.exports = router;

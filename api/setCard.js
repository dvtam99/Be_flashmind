const authMdw = require("../middleware/auth");
const { createSetCard } = require("../services/setCard");

const router = require("express").Router();

router.post("/", authMdw({ optional: true }), (req, res) => {
  createSetCard(req.body).then((post) => res.json(post));
});

router.get("/", authMdw({ optional: true }), (req, res) => {
  getListPost(req.user).then((posts) => {
    res.json(posts);
  });
});

router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  getPost(slug).then((post) => res.json(post));
});
module.exports = router;

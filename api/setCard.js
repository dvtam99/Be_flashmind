const authMdw = require("../middleware/auth");
const { createSetCard } = require("../services/setCard");

const router = require("express").Router();

router.post("/", authMdw(), (req, res) => {
  createSetCard(req.user, req.body).then((post) => res.json(post));
});

// router.post('/', authMdw(), (req, res) => {
//   createPost(req.user, req.body).then((post) => res.json(post));
// });

module.exports = router;

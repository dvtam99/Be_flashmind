const authMdw = require("../middleware/auth");
<<<<<<< HEAD
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
=======
const {
  createSetCard,
  getSetCard,
  updateSetCard,
  deleteSetCard,
} = require("../services/setCard");

const router = require("express").Router();

router.post("/", authMdw(), (req, res) => {
  createSetCard(req.user, req.body).then((post) => res.json(post));
});

// router.get("/", authMdw({ optional: true }), (req, res) => {
//   getListPost(req.user).then((posts) => {
//     res.json(posts);
//   });
// });

router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  getSetCard(slug).then((post) => res.json(post));
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
>>>>>>> fd0d4a96f07bd2ff793b7b0c20c89a85083b50af
});
module.exports = router;

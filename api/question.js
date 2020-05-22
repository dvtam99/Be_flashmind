const authMdw = require('../middleware/auth');
const { createSetQuestion } = require('../services/setQuestion');

const router = require('express').Router();

router.get('/', authMdw({ optional: true }), (req, res) => {
  createSetQuestion(req.user).then((posts) => {
    res.json(posts);
  });
});

// router.post('/', authMdw(), (req, res) => {
//   createPost(req.user, req.body).then((post) => res.json(post));
// });

module.exports = router;

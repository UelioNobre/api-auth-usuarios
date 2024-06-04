const { Router } = require('express');
const postsMiddleware = require('../middlewares/post.middleware');
const postsController = require('../controllers/posts.controller');

const router = Router();

router.get('/', postsController.Home);
router.post('/', postsController.Create);

router.get(
  '/:postID',
  postsMiddleware.checkPostOwnership,
  postsController.Read
);

router.put(
  '/:postID',
  postsMiddleware.checkPostOwnership,
  postsController.Update
);

module.exports = router;

const { Router } = require('express');
const postsController = require('../controllers/posts.controller');

const router = Router();

router.get('/', postsController.Home);
router.post('/', postsController.Create);

module.exports = router;

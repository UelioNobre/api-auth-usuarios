const { Router } = require('express');

const homeRouter = require('./home.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const postsRouter = require('./posts.router');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.use('/', homeRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.use(authMiddleware);
router.use('/posts', postsRouter);
// router.use('/*', (req, res) => { throw new Error('Rota não implementada', { cause: { statusCode: 404 } }) })

module.exports = router;

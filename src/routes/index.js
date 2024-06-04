const { Router } = require('express');

const homeRouter = require('./home.router');
const registerRouter = require('./register.router');
const authRouter = require('./auth.router');
const usersRouter = require('./users.router');
const postsRouter = require('./posts.router');

const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.use('/', homeRouter);
router.use('/register', registerRouter);
router.use('/auth', authRouter);

router.use(authMiddleware);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
// router.use('/*', (req, res) => { throw new Error('Rota não implementada', { cause: { statusCode: 404 } }) })

module.exports = router;

const { Router } = require('express');

const homeRouter = require('./home.router');

const router = Router();

router.use('/', homeRouter);
router.use('/*', (req, res) => { throw new Error('Rota não implementada', { cause: { statusCode: 404 } }) })

module.exports = router;

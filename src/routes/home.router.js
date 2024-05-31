const { Router } = require('express');

const router = Router();

router.get('/', (_, res) => res.json({ message: 'Hello world' }));
router.get('/error', (req, res) => { throw new Error('Rota /error gerou um erro') });
// router.use('*', (req, res) => { throw new Error('Rota não implementada', { cause: { statusCode: 404 } }) });

module.exports = router;

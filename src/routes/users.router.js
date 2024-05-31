const { Router } = require('express');
const userController = require('../controllers/users.controller');

const router = Router();

router.get('/', userController.List);
router.post('/', userController.Create);
router.get('/:id', userController.Read);
router.put('/:id', userController.Update);
router.delete('/:id', userController.Delete);

module.exports = router;

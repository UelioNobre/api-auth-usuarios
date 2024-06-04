const { Router } = require('express');
const registerController = require('../controllers/register.controller.js');
const registerMiddleware = require('../middlewares/register.middleware.js');

const router = Router();

router.post(
  '/',
  registerMiddleware.validateFields,
  registerController.Register
);

module.exports = router;

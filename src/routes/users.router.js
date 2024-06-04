const { Router } = require('express');
const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middleware');

const router = Router();


router.post(
  '/',
  userMiddleware.userExists,
  userController.Create
);

router.get(
  '/',
  userMiddleware.userExists,
  userController.Read
);

router.put(
  '/',
  userMiddleware.userNotChangePassword,
  userController.Update
);

router.delete('/:id', userController.Delete);

module.exports = router;

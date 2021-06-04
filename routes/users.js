const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');
// const validationObject = require('../middlewares/validationObject');

const {
  getCurrentUser,
  updateUsers,
} = require('../conrollers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUsers);

module.exports = router;

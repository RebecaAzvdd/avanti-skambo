const express = require('express');
const router = express.Router();
const Usercontroller = ('../controllers/UserController');

router.put('/user/id', Usercontroller.updateUser);
router.post('/user/', Usercontroller.createUser);
router.get('/user/', Usercontroller.getAllUser);
router.get('/user/id', Usercontroller.getUserById);
router.delete('/user/id', Usercontroller.deleteUser);

module.exports = router;
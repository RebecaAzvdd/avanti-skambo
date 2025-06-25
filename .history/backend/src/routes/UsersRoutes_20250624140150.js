const express = require('express');
const router = express.Router();
const Usercontroller = ('../controllers/UserController');

router.put('/id', Usercontroller.updateUser);
router.post('/', Usercontroller.createUser);
router.get('/', Usercontroller.getAllUser);
router.get('/id', Usercontroller.getUserById);
router.delete('/id', Usercontroller.deleteUser);
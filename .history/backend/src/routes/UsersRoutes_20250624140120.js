const express = require('express');
const router = express.Router();
const Usercontroller = ('../controllers/UserController');

router.put('/id', Usercontroller.updateUser);
router.post('/id', Usercontroller.createUser);
router.get('/id', Usercontroller.getAllUser);
router.get('/id', Usercontroller.getUserById);
router.put('/id', Usercontroller.updateUser);
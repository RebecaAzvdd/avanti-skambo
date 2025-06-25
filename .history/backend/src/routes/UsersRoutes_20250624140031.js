const express = require('express');
const router = express.Router();
const Usercontroller = ('../controllers/UserController');

router.put('/id', Usercontroller.updateUser);
router.post('/id', Usercontroller.createUser);
router.put('/id', Usercontroller.updateUser);
router.put('/id', Usercontroller.updateUser);
router.put('/id', Usercontroller.updateUser);
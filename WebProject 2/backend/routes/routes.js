const express = require('express');
const router = express.Router();

const userRegistration = require("../controller/UserRegister.controller");
const userLogin = require("../controller/UserLogin.controller");

router.post('/register', userRegistration);
// Login route
router.post('/login',userLogin);

module.exports = router;


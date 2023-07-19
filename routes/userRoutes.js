const express = require('express');
const { registerUser, userLogin, currentUser } = require('../controller/UserController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',userLogin);

router.get("/current",validateToken, currentUser);

module.exports = router;
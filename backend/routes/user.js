const express = require('express')
const router = express.Router()
const {logIn, signIn, setPassword, approve, getAllUsers} = require('../controller/user');
const { authenticateJWT } = require('../utilities/responseMessage');

router.get("/", (req, res) => {
    res.json({key:"hello world new"});
});


router.post('/login', logIn)

router.post('/signup', signIn)

router.post('/set-password', setPassword)

router.post('/approve', approve)

router.get('/users', authenticateJWT, getAllUsers)

module.exports = router
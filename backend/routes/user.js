const express = require('express')
const router = express.Router()
const {logIn, signIn, setPassword, approve} = require('../controller/user')

router.get("/", (req, res) => {
    res.json({key:"hello world new"});
});


router.post('/login', logIn)

router.post('/signup', signIn)

router.post('/set-password', setPassword)

router.post('/approve', approve)

module.exports = router
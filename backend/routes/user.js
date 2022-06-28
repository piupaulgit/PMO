const express = require('express')
const router = express.Router()
const {logIn, signIn} = require('../controller/user')

router.get("/", (req, res) => {
    res.json({key:"hello world new"});
});


router.post('/login', logIn)

router.post('/signup', signIn)


module.exports = router
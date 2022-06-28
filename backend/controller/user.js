const User = require('../schema/user')
const bcrypt = require('bcrypt')
const Constants = require('../constants/constant')
const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'
const rounds = 10

exports.logIn = (req, res) => {
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                res.status(404).json({error: 'no user with that email'})
            } else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) {
                        res.status(500).json(error)
                    } else if (match){
                        res.status(200).json({token: generateToken(user)})
                    } else {
                        res.status(403).json({error: 'Password do not match'})
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.signIn = (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) {
            res.status(500).json(error)            
        } else {
            const newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: req.body.role,
                status: Constants.NOT_APPROVED
            })
    
            newUser.save()
                .then(user => {
                    res.status(200).json({user})
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        }
    })

}


function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}
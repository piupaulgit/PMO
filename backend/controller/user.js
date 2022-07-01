const User = require('../schema/user')
const bcrypt = require('bcrypt')
const Constants = require('../constants/constant')
const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'
const saltRounds = 10
const nodemailer = require('nodemailer');
require('dotenv').config();



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
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
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

exports.setPassword = (req, res) => {
    const query = {
        'email': req.body.email
    }
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const update = {
        'password': hash
    }
    User.findOneAndUpdate(query, update, {upsert: false}, (error, doc) => {
        if (error) {
            res.status(500).json(error)
        } 
        if (!doc) {
            res.status(500).json({error: 'No record found'})
        } else {
            res.status(200).json({data: doc})
        }
    })
}

exports.approve = (req, res) => {
    if (!req.body.approve) {
        res.status(200).json({message: 'User not approve'})
    } else {

        // var transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //       type: "OAuth2",
        //       user: "user@example.com",
        //       accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
        //     },


        //   service: 'gmail',
        //   auth: {
        //     user: 'deepkarmakar61@gmail.com',
        //     pass: 'Kolkata#000'
        //   }
        // });
        let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
         });
        
        var mailOptions = {
          from: 'deepkarmakar61@gmail.com',
          to: req.body.email,
          subject: 'Happy 7 month Anniversary SooooooNaaaaai',
          text: 'Nacho nacho, long way to goooooooooo :)'
        };
        
        transport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('nooo');
            console.log(error);
        } else {
              console.log('yes');
            console.log('Email sent: ' + info.response);
          }
        });
    }
}

function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}
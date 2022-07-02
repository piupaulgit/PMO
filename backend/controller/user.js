const User = require('../schema/user')
const bcrypt = require('bcrypt')
const Constants = require('../constants/constant')
const jwt = require('jsonwebtoken')
const tokenSecret = 'my-token-secret'
const saltRounds = 10
const nodemailer = require('nodemailer');
require('dotenv').config();



exports.logIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'no user with that email' })
            } else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) {
                        res.status(500).json(error)
                    } else if (match) {
                        res.status(200).json({ token: generateToken(user) })
                    } else {
                        res.status(403).json({ error: 'Password do not match' })
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
                    res.status(200).json({ user })
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
    User.findOneAndUpdate(query, update, { upsert: false }, (error, doc) => {
        if (error) {
            res.status(500).json(error)
        }
        if (!doc) {
            res.status(500).json({ error: 'No record found' })
        } else {
            res.status(200).json({ data: doc })
        }
    })
}

exports.approve = (req, res) => {
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const getSubject = () => {
        return `PMO | ${req.body.approve ? 'Approved' : 'Not Approved'}`;
    }

    const getText = () => {
        let text;
        if (!req.body.approve) {
            text = `This is to inform you that your request has not been approved by admin. Please contact with <a href="mailto:${Constants.CONTACT_SUPPORT_EMAIL}">${Constants.CONTACT_SUPPORT_EMAIL}</a>`;
        } else {
            text = `This is to inform you that your request has been approved.\nPlease <a href="${Constants.HOST_URL}?email=${req.body.email}">set your password</a> to continue with PMO.`
        }
        return text;
    }
    var mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: req.body.email,
        subject: getSubject(),
        html: getText()
    };


    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('email error');
            res.status(500).json({ message: 'Email not sent' })
        } else {
            console.log('email success');
            res.status(200).json({ message: 'Email sent succesfully' })

            // update new user status 
            const query = {
                'email': req.body.email
            }
            const update = {
                'status': req.body.approve ? Constants.APPROVED : Constants.NOT_APPROVED
            }
            User.findOneAndUpdate(query, update, { upsert: false }, (error, doc) => {
                if (error) {
                    console.log('User status update fail');
                }
                if (!doc) {
                    console.log('User status update - No record found');
                } else {
                    console.log('User status updated');
                }
            })
        }
    });
}

function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}
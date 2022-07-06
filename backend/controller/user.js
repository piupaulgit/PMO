const User = require('../schema/user')
const bcrypt = require('bcrypt')
const Constants = require('../constants/constant')
const jwt = require('jsonwebtoken')
const tokenSecret = Constants.TOKENSECRET;
const saltRounds = 10
const nodemailer = require('nodemailer');
require('dotenv').config();
const { responseMessages } = require('../utilities/responseMessage');


// Check if user is exist - it will return true/false
// 'query' eg: { email: req.body.email }
const isUserExist = async (query) => {
    let isExist;
    await User.findOne(query)
        .then(user => {
            if (!user) {
                isExist = false;
            } else {
                isExist = true;
            }
        })
        .catch(error => {
            console.log('Find user error');
        })

    return isExist;
}

// Update user 
const updateUser = (query, update) => {
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

// Login Method
exports.logIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                responseMessages(res, 500, false, Constants.RESPONSE.NOT_REGISTERED);
            } else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) {
                        responseMessages(res, 500, false, Constants.RESPONSE.ERROR_OCCURRED);
                    } else if (match) {
                        responseMessages(res, 200, true, Constants.RESPONSE.LOGIN_SUCCESS, { token: generateToken(user) });
                    } else {
                        responseMessages(res, 500, false, Constants.RESPONSE.PASSWORD_NOT_MATCHED);
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

// Sign-in/register method
exports.signIn = (req, res) => {
    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        status: Constants.PENDING,
        password: null
    })

    newUser.save()
        .then(() => {
            responseMessages(res, 200, true, Constants.RESPONSE.REGISTERED_SUCCESS);
        })
        .catch(error => {
            responseMessages(res, 500, false, Constants.RESPONSE.REGISTERED_FAIL, error);
        })
       
}

// Set Password (After admin approve user/change password by user)
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
            responseMessages(res, 500, false, Constants.RESPONSE.NOT_REGISTERED);
        } else {
            responseMessages(res, 200, true, Constants.RESPONSE.PASSWORD_SET_SUCCESS);
            updateUser(query, { 'status': Constants.REGISTERED })
        }
    })
}

// Admin approves user from dashboard
exports.approve = async (req, res) => {
    // Email Functionality
    const approveProcess = () => {
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
                responseMessages(res, 500, false, Constants.RESPONSE.NOT_REGISTERED);
            } else {
                responseMessages(res, 200, true, Constants.RESPONSE.EMAIL_SENT_SUCCESS);

                // update new user status 
                const query = {
                    'email': req.body.email
                }
                const update = {
                    'status': req.body.approve ? Constants.APPROVED : Constants.NOT_APPROVED
                }
                updateUser(query, update)
            }
        });
    }
    
    // Check if user is exist or not
    // const ifUser = await isUserExist({ email: req.body.email });
    if (await isUserExist({ email: req.body.email })) {
        approveProcess();
    } else {
        responseMessages(res, 500, false, Constants.RESPONSE.NOT_REGISTERED);
    }
}

// Get All Users
exports.getAllUsers = (req, res) => {

    User.find(req.body.filter || {}, (err, users) => {
        if (err) {
            responseMessages(res, 500, false, Constants.RESPONSE.ERROR_OCCURRED);            
        } else {
            responseMessages(res, 200, true, null, users);        
        }
    })
}

// Token generate function
function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}
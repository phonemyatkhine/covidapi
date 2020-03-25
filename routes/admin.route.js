var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router(); //express router to use the routing
var Admin = require('../models/admin.model');
var crypto = require('crypto');
require('dotenv').config() //dotenv library to use data from .env

module.exports = router; //exporting router

// Get contacts from certain division and certain type
router.post('/login', async (req, res) => {

    const expiration = 400000;
    let email = req.body.email
    let password = req.body.password
    let hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    var token = null;
    
    if(req.cookies.token != null)
    {
        token = req.cookies.token;
        console.log("Token");
    }
    if(token != null) {
        console.log("token return"); 
        res.status(200).json({
            message: "Login Successful"
        })
    }
    else {
        try {
            var admin = await Admin.find({
                "email": email,
                "password": hashedPassword
            });
            token = jwt.sign({
                email,
                password
            }, process.env.KEY, {
                expiresIn: '1d',
            });
            console.log("alotelotelar");
            
            res.status(200).cookie('token', token, {
                expires: new Date(Date.now() + expiration),
                secure: false, // set to true if your using https
                httpOnly: true,
            }).json({
                message : "Login Successful"
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
})

router.post('/register', async (req, res) => {

    let email = req.body.email
    let password = req.body.password
    let key = req.body.key
    let hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    console.log(req.body)
    if (key == process.env.KEY) {
        try {
            var admin = new Admin({
                email: email,
                password: hashedPassword,
            })
            try {
                var newAdmin = await admin.save()
                res.status(201).json(newAdmin)
            } catch (err) {
                res.status(200).json({
                    message: "Admin Account Created"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }


})


async function getAdmin(req, res, next) {

    var email = req.body.email

    try {
        admin = await Admin.findOne({
            "email": email
        })
        if (admin != null) {
            return res.status(409).json({
                message: "Admin account already created."
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    next()
}
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');

module.exports = {

    register: (req, res) => {
        User.findOne({
            username: req.body.username
        })
        .then(user => {
            if (user == null) {
                let salt = bcrypt.genSaltSync(10);
                let password = bcrypt.hashSync(req.body.password, salt);
                // console.log('---', req.body);

                User.create({
                    username: req.body.username,
                    password: password
                })
                .then(userData => {
                    res.status(200).json({
                        success: true, 
                        msg: `Account ${userData.username} registered`
                    })
                })
                .catch(err => {
                    res.status(500).json(err.message);
                })
            } else {
                res.status(500).json({
                    msg: `Data already exist`, 
                    data: user
                })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }, 

    signIn: (req, res) => {
        User.findOne({
            username: req.body.username
        })
        .then(user => {
            if (user) {
                let password = bcrypt.compareSync(req.body.password, user.password);

                if (password) {
                    var token = jwt.sign({id: user.id, username: user.username}, process.env.secret_key);
                    res.status(200).json({
                        msg: `Login successful!`, 
                        token: token
                    })
                } else {
                    res.status(401).json({
                        msg: `Username/Password invalid`
                    })
                }
            } else {
                res.status(401).json({
                    msg: `Username/Password invalid`
                })
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }
}
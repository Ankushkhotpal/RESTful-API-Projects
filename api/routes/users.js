const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require("../models/user");
// const Usersignup = require("../models/user-signup");

router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: 'Handeling GET requests to /orders'
    // });
    User.find()
        .select('email password _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                // const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        email: doc.email,
                        password: doc.password,
                        // request: {
                        //     type: 'GET',
                        //     url: 'http://localhost:3000/user/' + doc._id
                        // }
                    }
                })
            });
            // console.log("From database", response);
            console.log("From database", docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/signup', (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'eMail already exists'
                });
            } else {
                // bcrypt.hash(req.body.password, 10, (err, hash) => {
                //     if (err) {
                //         return res.status(500).json({
                //             error: err
                //         });
                    // } else {
                        const user = new user({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            // password: hash
                            password: req.body.password
                        });
                        Usersignup
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    // }
                // });
            }
        });
});


router.post('/signin', (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authantication failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: "Authantication failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        "minemark88", {
                            expiresIn: "1h"
                        }
                    );
                    console.log(result);
                    return res.status(200).json({
                        message: "Authantication Successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Authantication failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({
            _id: req.params.userId
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
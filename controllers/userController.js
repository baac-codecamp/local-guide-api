const mongoose = require('mongoose');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');


module.exports.index = async function (req, res) {
    
    try {
        // select * from user; 
        const users = await User.find();
        res.status(200).json({
            data: users
        });
       
    } catch (err) {
        res.status(500).json(
            {
                errors: err
            });
    }
}


module.exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(200).json({ data: { user } });
    // try {

    // } catch () {
        
    // }
}


module.exports.getReview = async function (req, res, next) {

    try {
        const {id} = req.params;
        console.log(`id : ${id}`);
       //const comments = await Comment.find();
      const userWithReviews = await User.findById(id)
                    .populate('review','review_note review_type review_date user');

        console.log(userWithReviews);
        res.status(200).json({
            data: userWithReviews
        });
    } catch (err) {
        res.status(500).json(
            {
                error: [{
                    code: 500,
                    message: err.message
                }]
            });
    }
}


module.exports.createUserAPI = async (req, res) => {
    console.log(req.body);
    const { name ,email} = req.body;
    console.log(`name : ${name}`);
    let user = new User({
        name: name,
        email : email
    });

    try {
        //save : mongoose command
        await user.save();
        res.status(201).json({ data: { user } });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}


module.exports.updateUser = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, email } = req.body;
        console.log(req.body);
        console.log(`Id : ${req.params.id}`);
        console.log(`name : ${name}`);
        console.log(`email : ${email}`);
        const user = await User.updateOne({ _id: id },
            { name: name, email: email }
        );

        if (user.nModified === 0) {
            throw new Error('Cannot update');
        } else {
            res.status(201).json(
                {
                    message: "Update completed",
                    success: true
                });
        }
    } catch (err) {
        res.status(500).json({
            error: [{
                code: 500,
                message: err.message
            }]
        });
    }
}


module.exports.updateUserSome = async (req, res) => {

    try {
        console.log(req.body);
        const { id } = req.params;
        const { name } = req.body;

        console.log(`Id : ${id}`);
        const user = await User.findByIdAndUpdate(id, {
            name: name
        });

        console.log(`user : ${user}`);

        if (!user) {
            throw new Error('Notthing to update');
        } else {
            res.status(201).json({ data: { user } });
        }

    } catch (err) {
        res.status(500).json({
            errors: {
                code: 500,
                message: err.message
            }
        });
    }
}


module.exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).json({ errors: { message : "User Not Found" } });
        }
        res.status(200).json(
            {
                message: "Delete completed",
                success: true
            });
    } catch (err) {
        res.status(500).json({
            errors: {
                code: 500,
                message: "Cannot delete"
            }
        })
    }
}
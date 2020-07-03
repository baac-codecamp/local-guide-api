const mongoose = require('mongoose');
const Guide = require('../models/guideModel');
const Review = require('../models/reviewModel');


module.exports.index = async function (req, res) {
    
    try {
        // select * from user; 
        const guides = await Guide.find();
        res.status(200).json({
            data: guides
        });
       
    } catch (err) {
        res.status(500).json(
            {
                errors: err
            });
    }
}


module.exports.getGuideById = async (req, res) => {
    const { id } = req.params;
    const guide = await Guide.findOne({ _id: id });
    res.status(200).json({ data: { guide } });
    // try {

    // } catch () {
        
    // }
}


module.exports.getGuideReview = async function (req, res, next) {

    try {
        const {id} = req.params;
        console.log(`id : ${id}`);
       //const comments = await Comment.find();
      const guideWithReviews = await Guide.findById(id)
                    .populate('review','review_note review_type review_date user');

        console.log(guideWithReviews);
        res.status(200).json({
            data: guideWithReviews
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


module.exports.createGuideAPI = async (req, res) => {
    console.log(req.body);
    const { name ,email} = req.body;
    console.log(`name : ${name}`);
    let guide = new Guide({
        name: name,
        email : email
    });

    try {
        //save : mongoose command
        await guide.save();
        res.status(201).json({ data: { guide } });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}


module.exports.updateGuideAPI = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, email } = req.body;
        console.log(req.body);
        console.log(`Id : ${req.params.id}`);
        console.log(`name : ${name}`);
        console.log(`email : ${email}`);
        const guide = await Guide.updateOne({ _id: id },
            { name: name, email: email }
        );

        if (guide.nModified === 0) {
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


module.exports.updateGuideSomeAPI = async (req, res) => {

    try {
        console.log(req.body);
        const { id } = req.params;
        const { name } = req.body;

        console.log(`Id : ${id}`);
        const guide = await Guide.findByIdAndUpdate(id, {
            name: name
        });

        console.log(`guide : ${guide}`);

        if (!user) {
            throw new Error('Notthing to update');
        } else {
            res.status(201).json({ data: { guide } });
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


module.exports.deleteGuideAPI = async (req, res) => {
    try {
        const guide = await Guide.findByIdAndDelete(req.params.id)
        if (!guide) {
            res.status(404).json({ errors: { message : "Guide Not Found" } });
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
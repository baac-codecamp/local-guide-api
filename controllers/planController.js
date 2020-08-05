const mongoose = require('mongoose');
const Plan = require('../models/planModel');
const Comment = require('../models/commentModel');

module.exports.index = async function (req, res , next) {
    
    try {
             // select * from post; 
        const posts = await Post.find();
        res.status(200).json({
            data: posts,
            success: true
        });

    } catch (err) {
        next(err); 
     }
}

module.exports.addcomment = async (req, res) => {
    
    try {

    console.log(req.body);
    const { message,likeCounts, createdDate,post,rating } = req.body;
    const { id } = req.params;
    console.log(`id : ${id}`);
    console.log(`message : ${message}`);
    console.log(`likeCount : ${likeCounts}`);
    console.log(`createdDate : ${createdDate}`);
    console.log(`rating : ${rating}`);
    console.log(`post : ${post}`)
    let comment = new Comment({
        message: message,
        likeCounts: likeCounts,
        createdDate: moment().format(),
        post: post,
        rating : rating ,
    });

        await comment.save();
        res.status(201).json({ data: comment, success: true });

    } catch (err) {

        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.getComments = async function (req, res) {

    try {
        const { id } = req.params;
        console.log(`id : ${id}`);
        //const comments = await Comment.find();
        const postWithComments = await Post.findById(id)
            .populate('comments', 'message user');

        console.log(postWithComments);
        res.status(200).json({
            data: postWithComments,
            success: true
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

module.exports.updatecomment = async (req, res, next) => {

    try {
        console.log(req.body);
        const { id } = req.params;
        const { message,rating } = req.body;

        console.log(`Id : ${id}`);
        const post = await Post.findByIdAndUpdate(id, {
            message: message ,
            rating : rating

        });

        console.log(`post : ${post}`);

        if (!post) {
            throw new Error('Notthing to update');
        } else {
            res.status(201).json({ data: post, success: true });
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

module.exports.deletecomment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            res.status(404).json({
                success: fasle, errors: {
                    message: "Cannot delete"
                }
            });
        }

        res.status(200).json({
            message: 'Deleted have been completed',
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                success: fasle,
                message: "Cannot delete"
            }
        })
    }
}

module.exports.getTags = async function (req, res, next) {

    try {
        const { id } = req.params;
        console.log(`id : ${id}`);
        const post = await Post.findOne({ _id: id }).select('tags');
        console.log(post);
        res.status(200).json({
            data: post,
            success: true
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



module.exports.getPostById = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Id : ${id}`);
    const post = await Post.findOne({ _id: id });
    res.status(200).json({ data: { post } });
}

module.exports.createPlan = async (req, res) => {
    console.log(req.body);
    const { title, description, planlist } = req.body;
    console.log(`Title : ${title}`);
    let post = new Plan({
        title: title,
        description: description,
        planlist: planlist,
    });

    try {
        await post.save();
        res.status(201).json({ data: post, success: true });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title,description,planlist } = req.body;
        console.log(req.body);
        console.log(`Id : ${id}`);
        console.log(`title : ${title}`);
        const post = await Post.updateOne({ _id: id },
            { title: title , description:description, planlist:planlist,}
        );

        // console.log(post);

        if (post.nModified === 0) {
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

module.exports.updatePlan = async (req, res, next) => {

    try {
        console.log(req.body);
        const { id } = req.params;
        const { title,description,planlist } = req.body;

        console.log(`Id : ${id}`);
        const post = await Plan.findByIdAndUpdate(id, {
            title: title, planlist : planlist, description: description,
        });

        console.log(`post : ${post}`);

        if (!post) {
            throw new Error('Notthing to update');
        } else {
            res.status(201).json({ data: post, success: true });
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

module.exports.deletePlan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Plan.findByIdAndDelete(id);

        if (!post) {
            res.status(404).json({
                success: fasle, errors: {
                    message: "Cannot delete"
                }
            });
        }

        res.status(200).json({
            message: 'Deleted have been completed',
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                success: fasle,
                message: "Cannot delete"
            }
        })
    }
}

module.exports.list = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(`email: ${email}`)

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Please check data');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }
        
        const user = await Post.find({ email: email })
        .populate('comments', 'message user');
        const users = [];
        users.push(user)

        if (!user) {
            const error = new Error('Authentication Failed, User not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            users: {users},
        });

    } catch (error) {
        next(error);
    }
}
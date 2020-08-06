const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const User = require("../models/userModel");
const Guide = require('../models/guideModel')

const users = [
    {
        id: "1",
        name: "peter"
    },
    {
        id: "2",
        name: "student"
    }
];

async function findUserById(id) {
    return users.find(item => {
        if (item.id == id) {
            return item;
        } else {
            return null;
        }
    });
}

module.exports.index = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });

    } catch (err) {
        next(err);
    }

}

module.exports.getUserById = function (req, res, next) {
    console.log(`Id : ${req.params.id}`);
    let user = User.find(item => item.id == req.params.id);
    res.status(200).json(user);
}

exports.getProfile = (req, res, next) => {
    const { _id, firstname,lastname, email,} = req.user;
    try {
        res.status(200).json({
            success: true,
            user: {
                id: _id,
                lastname: lastname,
                firstname: firstname,
                email: email,
                
            }
        });
    } catch (err) {
        next(err);
    }

}

module.exports.signup = async (req, res, next) => {
    try {
        const { firstname,lastname, email, password, } = req.body;
        const usertype = 1;
        //validation
        //check validation result ก่อน โดย req จะแปะ error validation มาด้วย
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Please check data');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        const existEmail = await User.findOne({ email: email });

        if (existEmail) {
            const error = new Error('Email already exits');
            error.statusCode = 400;
            throw error;
        }
        
        let user = new User();
        user.firstname = firstname;
        user.email = email;
        user.lastname = lastname;
        user.password = await user.encryptPassword(password);
        user.usertype = usertype;
        await user.save();

        res.status(201).json({
            data: user,
            success: true
        });
      
       
   
    } catch (err) {
        next(err);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log
            (`email: ${email} 
             password: ${password}`)

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Please check data');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('Authentication Failed, User not found');
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw error;
        }

        //create token
        console.log(user._id);
        const token = await jwt.sign({
            id: user._id,
            role: user.role
        }, config.JWT_SECRET, { expiresIn: '10 days' });

        //decode expiration date
        const expires_in = jwt.decode(token);

        return res.status(200).json({
            success: true,
            token: token,
            expires_in: expires_in.exp,
        });

    } catch (error) {
        next(error);
    }
}

module.exports.updateUser = async (req, res) => {
    const { password, firstname, lastname } = req.body;
    const { id } = req.params;
    // const address = [];
    // const location = [];
    // location = req.body;
    // address = req.body;

    console.log(`Id : ${id}`);
    const user = await User.findOne({ _id: id });
    if (user) {
        console.log(`User has been updated. id : ${user._id}`);
    } else {
        console.log(`User is not exits.`);
        res.status(404).send({ message: "Not found User with id " + id });
    }
    
    if (password) {
        user.password = await user.encryptPassword(password);
    }
    if (firstname) {
        user.firstname = firstname;
    }
   if (lastname) {
        user.lastname = lastname;
   }
    // if (gender) {
    //     user.gender = gender;
    // }
    // if (address) {
    //     user.address = address;
    // }
    // if (location) {
    //     user.location = location;  
    // }
    // if (education) {
    //     user.education = education;
    // }
    // if (displayname) {
    //     user.displayname = displayname;
    // }
    // if (profilepicture){
    //     user.profilepicture = profilepicture;
    // }
    // if (certification){
    //     user.certification = certification;
    // }
    
    await user.save();

    res.status(201).json({
        data: user,
        success: true
    });
}
module.exports.deleteUser = async function (req, res) {
    // const token = req.header("authorization");
    const { id } = req.params;
    // const id =  req.params.id;
    console.log(`Id : ${id}`);
    const user = await findUserById(id);
    if (user) {
        console.log(`User has been delete. id : ${user.id}`);
    } else {
        console.log(`User is not exits.`);
        res.status(404).send({ message: "Not found User with id " + id });
    }
    res.status(200).json({ message: "success" });;
}


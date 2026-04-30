const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {

    try {

        const { username, email, password, role = "user" } = req.body;

        //check if user exists or not

        const existingUser = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "user already exists"
            })
        }

        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        //now create the user
        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
            role
        })

        res.status(201).json({
            message: "user created successfully",
            user
        })

    } catch (error) {
        console.error("something went wrong" + error.message);
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req,res) => {
    try{
    const { identifier, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "user not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(401).json({
            message: "invalid credentials"
        })
    }
    // now create jwt token

    const token = jwt.sign(
        {id: user._id, role:user.role},
        process.env.JWT_SECRET
    );

    res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.status(200).json({
        message: "login successfully",
        user
    });

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { registerUser, loginUser }

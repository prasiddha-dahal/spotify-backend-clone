const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {

    try {

        const { username, email, password, role="user" } = req.body;

        //check if user exists or not

        const existingUser = await userModel.findOne({
            $or:[
                {username},
                {email}
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


module.exports = { registerUser }

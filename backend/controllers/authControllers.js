import userModel from "../models/authModels.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async(req, res) => {
    try {
        const{userName, email, password} = req.body
        if(!userName || !email || !password) {
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            return res.status(400).json({success:false, message:"User already exists please login"})
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = new userModel({
            userName, email, password:hashPassword
        })
        await newUser.save()
        res.status(201).json({success:true, message:"User register successfully", user:newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

const login = async(req, res) => { 
    try {
        const {email, password} = req.body
        const findUser = await userModel.findOne({email})
        if(!findUser) {
            return res.status(404).json({success:false, message:"User not found, please register"})
        }
        const comparePassword = await bcrypt.compare(password, findUser.password)
        if(!comparePassword) {
            return res.status(303).json({success:false, message:"Invalid password"})
        }

        const token = await jwt.sign({userId:findUser._id}, process.env.SecreatKey, {expiresIn:"3d"})
        res.cookie("token", token, {
            httpOnly:true,
            secure:false,
            maxAge: 3* 24 * 3600 * 1000
        })
        res.status(200).json({success:true, message:"Login successfully", user:findUser, token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

const logout = async(req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({success:true, message:"Logout successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export {register, login, logout}

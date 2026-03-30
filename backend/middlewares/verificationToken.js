import jwt, { decode } from 'jsonwebtoken'
import userModel from '../models/authModels.js'


const verificationToken = async(req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(303).json({success:false, message:"Unauthorized, Please login"})
        }
        const decoded = await jwt.decode(token, process.env.SecreatKey)
        const user = await userModel.findById(decoded.userId)
        if(!user) {
            return res.status(404).json({success:false, message:"User not found"})
        }
        req.userId = user._id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({success:false, message:"Unauthorized: Inalid token"})
    }
}
export {verificationToken}
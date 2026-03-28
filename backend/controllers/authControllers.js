import userModel from "../models/authModels.js"


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
        const newUser = new userModel({
            userName, email, password
        })
        newUser.save()
        res.status(201).json({success:true, message:"User register successfully", user:newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export default register
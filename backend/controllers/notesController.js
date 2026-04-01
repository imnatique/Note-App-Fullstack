import notesModel from "../models/notesModel.js"

const create = async(req, res) => {
    try {
        const userId = req.userId
        const {title} = req.body

        if(!title) {
            return res.status(303).json({success:false, message:"Title is required"})
        }

        const newNotes = new notesModel({
            title, userId
        })
        await newNotes.save()
        return res.status(200).json({success:true, message:"Notes created successfully", Notes: newNotes})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

const updateNotes = async(req, res) => {
    try {
        const userId = req.userId
        const notesId = req.params.id
        const {title} = req.body
        const findNotes = await notesModel.findById({_id:notesId})
        
        if(!findNotes) {
            return res.status(404).json({success:false, message:"Notes not found"})
        }
        const notesUserId = findNotes.userId
        if(userId.toString() !== notesUserId) {
            return res.status(404).json({success:false, message:"Unauthorized user"})
        }

        const update = await notesModel.findByIdAndUpdate(
            {_id:notesId},
            {title},
            {new:true}
        )
        return res.status(201).json({success:true, message:"Notes updated successfully",update})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

const deleteNotes = async (req, res) => {
    try {
        const userId = req.userId
        const notesId = req.params.id

        const findNotes = await notesModel.findById({_id:notesId})
        
        if(!findNotes) {
            return res.status(404).json({success:false, message:"Notes not found"})
        }
        const notesUserId = findNotes.userId
        if(userId.toString() !== notesUserId) {
            return res.status(404).json({success:false, message:"Unauthorized user"})
        }

        const deleteNote = await notesModel.findByIdAndDelete(notesId)
        return res.status(201).json({success:true, message:"Notes deleted successfully",deleteNote})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

const getNotes = async (req, res) => {
    try {
        const userId = req.userId

        const notes = await notesModel.find({userId})
        if(!userId) {
            return res.status(404).json({success:false, message:"No data found"})
        }
        return res.status(201).json({success:true, notes})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export {create, updateNotes, deleteNotes, getNotes}
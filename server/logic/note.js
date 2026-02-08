import NoteModel from '../models/NoteModel.js';
import UserModel from '../models/UserModel.js';
export const createNote = async (req, res) => {
    try {
        const { text, mood, isImportant, title } = req.body;
        if(!text || !mood || !title) {
            return res.status(400).json({message: 'Please provide all required fields'})
        }
        const user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }
        const newNote = new NoteModel({
            text,
            mood,
            title,
            isImportant,
            user: req.userId
        })
        await newNote.save();
        await UserModel.findByIdAndUpdate(req.userId, {
            $push: {
                notes: newNote._id
            }
        })
        return res.status(200).json({message: 'Note created successfully', newNote})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: 'Failed to create note'})
    }
}
export const getNotes = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        const notes = await NoteModel.find({user: req.userId})
        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }
        if(!notes) {
            return res.status(400).json({message: 'No notes found'})
        }
        return res.status(200).json({message: 'Notes fetched successfully', notes})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: 'Failed to get notes/ No login'})
    }
}
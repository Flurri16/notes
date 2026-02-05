import NoteModel from '../models/NoteModel.js';
import UserModel from '../models/UserModel.js';
export const createNote = async (req, res) => {
    try {
        const { text, mood, isImportant } = req.body;
        if(!text || !mood) {
            return res.status(400).json({message: 'Please provide all required fields'})
        }
        const user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }
        const newNote = new NoteModel({
            text,
            mood,
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
    }
}
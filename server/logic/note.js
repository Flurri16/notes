import NoteModel from '../models/NoteModel.js'
import UserModel from '../models/UserModel.js';
export const createNote = async (req, res) => {
    try {
        const { text, mood, isImportant, title } = req.body;
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }  
        const newNote = new NoteModel({title, text, mood, isImportant, user: req.userId });
        await newNote.save();
        user.notes.push(newNote);
        await user.save();
        return res.status(200).json({ newNote, message: 'Note created successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Note creation error' });
    }
}
export const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({user: req.userId});
        return res.status(200).json({ notes, message: 'Notes retrieved successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error retrieving notes' });
    }
}
export const getOne = async (req, res) => {
    try {
        const note = await NoteModel.findById(req.params.id)
        if(!note) {
            return res.status(404).json({ message: 'Note not found' })
        }
        return res.status(200).json({ note })
    } catch (err) {
        console.log(err)
    }
}

export const addCharacterToNote = async (req, res) => {
    try {
        const {character} = req.body;
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.characters.push(character);
        await user.save();
        return res.status(200).json({ message: 'Character added to note successfully', character} );
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: 'Error adding character to note' });
    }
}

export const getAllCharacters = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userCharacters = user.characters;
        return res.status(200).json({ characters: userCharacters });
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: 'Error retrieving characters' });
    }
}
export const getNotesCount = async (req, res) => {
    try {
        const notesCount = await NoteModel.countDocuments({ user: req.userId });
        return res.status(200).json({ notesCount });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error retrieving notes count' });
    }
}
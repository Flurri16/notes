import mongoose from "mongoose";

const NoteModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true
    },
    isImportant: {
        type: Boolean,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })
export default mongoose.model('Note', NoteModel)
import mongoose from 'mongoose'
const UserModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note',
        }
    ]
}, { timestamps: true })

export default mongoose.model('User', UserModel)
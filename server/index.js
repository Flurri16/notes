import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getMe, login, register } from './logic/auth.js';
import { chechAuth } from './logic/checkAuth.js';
import { createNote, deleteNote, getNotes } from './logic/note.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin@cluster0.u5sgw90.mongodb.net/notes?appName=Cluster0'
        );
        console.log('MongoDB connected');
    } catch (e) {
        console.error('Server failed to start', e);
    }
}

app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/me', chechAuth, getMe)

app.post('/api/create-note', chechAuth, createNote)
app.get('/api/get-notes', chechAuth, getNotes)
app.delete('/api/delete-note/:id', chechAuth, deleteNote)

app.listen(4999, () => {
    console.log('Server started on port 4999');
});

start();

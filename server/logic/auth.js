import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new UserModel({
      email,
      password: hash
    });

    const token = jwt.sign(
      { _id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    newUser.token = token;
    await newUser.save();

    return res.status(200).json({
      message: 'Registration successful',
      token,
      email: newUser.email
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Registration error' });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }
        const isPAsswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPAsswordCorrect) {
            return res.status(400).json({message: 'Invalid password'})
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})

        return res.status(200).json({user, message: 'Login successful', token})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: 'Login error'})
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }
        return res.status(200).json({user})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: 'No access'})
    }
}
import jwt from 'jsonwebtoken'

export const chechAuth = async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1]
    try {
        if (!token) {
            return res.status(401).json({ message: 'Please login.' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            req.userId = decoded._id
        } else {
            return res.status(401).json({ message: 'Token is not valid' })
        }
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error. Please login' })
    }
}
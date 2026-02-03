import jwt from 'jsonwebtoken'

export const chechAuth = async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1];
    // console.log(token)
    try {
        if(!token) {
            return res.status(401).json({ message: 'Please login to access this resource.' })
        }
        const decoded = jwt.verify(token, 'secret123')
        if(decoded) {
            req.userId = decoded._id
        } else {
            return res.status(401).json({ message: 'Token is not valid' })
        }
        next()
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error. Please login' })
    }
}
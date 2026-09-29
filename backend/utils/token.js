import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    try {
        return jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn:'7d'})
    } catch (error) {
        console.log("token generation failed", error)
        throw error
    }
}

export default generateToken;
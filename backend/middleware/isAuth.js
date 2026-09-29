import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

 const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // save user in request
    req.user = user
 
    next()
 
  } catch (error) {
     return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.", error
    });
  }
};

export default isAuth
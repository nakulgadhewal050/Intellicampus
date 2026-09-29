
import express from 'express'
import { getCurrentUser, Login, Signup } from '../controller/authController.js'
import isAuth from '../middleware/isAuth.js'

const authRouter = express.Router()

authRouter.post('/signup',Signup)
authRouter.post('/login',Login)
authRouter.get("/current-user",isAuth,getCurrentUser)


export default authRouter
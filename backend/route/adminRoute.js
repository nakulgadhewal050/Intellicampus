
import express from 'express'
import isAuth, { isAdmin } from '../middleware/isAuth.js'

const adminRouter = express.Router()

adminRouter.get("/admin-dashboard",isAuth,isAdmin)


export default adminRouter
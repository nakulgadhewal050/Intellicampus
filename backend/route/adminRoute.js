
import express from 'express'
import isAuth, { isAdmin } from '../middleware/isAuth.js'
import { getAdminDashboard } from '../controller/adminController.js'

const adminRouter = express.Router()

adminRouter.get("/admin-dashboard",isAuth,isAdmin,getAdminDashboard)


export default adminRouter
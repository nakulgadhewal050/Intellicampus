
import express from 'express'
import isAuth, { isAdmin } from '../middleware/isAuth.js'
import { getAdminDashboard, getAllTickets, getAllUser, updateTicketByAdmin } from '../controller/adminController.js'

const adminRouter = express.Router()

adminRouter.get("/admin-dashboard",isAuth,isAdmin,getAdminDashboard)
adminRouter.get("/all-user",isAuth,isAdmin,getAllUser)
adminRouter.get("/all-tickets",isAuth,isAdmin,getAllTickets)
adminRouter.patch("/all-tickets/:id",isAuth,isAdmin,updateTicketByAdmin)


export default adminRouter
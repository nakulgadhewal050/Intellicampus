
import express from 'express'
import {getUserTickets, ticketRaise} from '../controller/ticketRaise.js'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'

const ticketRaiseRouter = express.Router()

ticketRaiseRouter.post('/ticket-raise',isAuth,upload.single("attachment"),ticketRaise)
ticketRaiseRouter.get('/user-tickets',isAuth,getUserTickets)



export default ticketRaiseRouter
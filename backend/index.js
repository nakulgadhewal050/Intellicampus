import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
import connectDb from './config/dataBase.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
const app = express()
import cors from 'cors'


app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.get("/",(req,res)=>{
  return res.json({message:"hello"})
})

app.use("/api/auth",authRouter)


app.listen(PORT,async () => {
  await connectDb()
  console.log(`Server is running on http://localhost:${PORT}`)
})
import mongoose from "mongoose";



const connectDb = async () => {
     try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase Connected Successfully")
     } catch (error) {
        console.log("DataBase Connection faild",error)
     }
}

export default connectDb
import mongoose from "mongoose";

export const connectDB =async()=>{
    try {
        mongoose.connection.on("connected",()=>console.log("MongoDb Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}/quickblog`)
    } catch (error) {
        console.log(error);
        
    }
}
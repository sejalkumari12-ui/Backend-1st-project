import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async()=>{
    try {
        const connectionIntsance=await mongoose.connect(`${process.env.mongoose}/${DB_NAME}`)
        console.log(`\n Mongoose connected !! DB Host:${connectionIntsance.connection.host}`)
        
    } catch (error) {
        console.log("Mongose connection error",error)
        process.exit(1)
        
    }
}
export default connectDB;
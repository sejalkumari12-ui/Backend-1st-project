import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })

    server.on("error", (error) => {
        console.log("Server error", error)
        throw error
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!", err)
})






























/*
CONNECT DB FIRST WAY


import express from "express"
const app =express()

(async()=>{
    try {
       await mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`)
       app.on ("error",(error)=>{
        console.log("ERROR:",error);
        throw error
       })

       app.listen(process.env.PORT,()=>{
        console.log(`App is listenting on port ${
            process.env.PORT}`)
       })
        
    } catch (error) {
        console.log("ERROR:",error)
        
    }
}) ()
    */
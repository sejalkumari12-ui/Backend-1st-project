import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRAT
    });
    
    const uploadOneCloudinary = async (localFilePath)=>{
        try {
            if (!localFilePath) return null; //upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })//file has been uploaded successfully
            console.log("file is uploaded on cloudinary",response.url);
              return response;
            
        } catch (error) {
            fs.unlinkSync(localFilePath) //remove the locally saved temporary file
            return null
        }
    }

    export {uploadOneCloudinary}
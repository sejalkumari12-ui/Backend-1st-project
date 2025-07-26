import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOneCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async(req , res)=>{
  //get user details from frontend
    const {userName,fullName,email,password}=req.body
         console.log("email:",email)


  //validation- not empty 
  if([fullName,userName,email,password].some((field)=>field?. trim ()=== "")){
    throw new ApiError(400 , "all fields are requred")
  } 

//   //bignner tarika
//    if (fullName === ''){
//     throw new ApiError
//    }
//    if(username){
//     throw new ApiError

//    }


  //check if user already exists: username,email
   const existingUser= await User.findOne({
    $or:[{userName},{email}]
    

   })
   if(existingUser){
    throw new ApiError(409,"user with email or username already exists")

   }


  //check or handle  image ,check avtar
  const avatarLocalpath = req.files?.avatar[0]?.path;
     console.log("📦 req.files:", req.files); 
 
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400,"avatar file is required")
    
  }




  //upload them to cloudinary, avtar
  
  const avatar = await uploadOneCloudinary(avatarLocalpath)
  const coverImage = await uploadOneCloudinary(coverImageLocalpath)
  if (!avatar) {
    throw new ApiError (400,"avatar file is required")
    
  }


  //creatr user object - create entry in db
 const user= await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: userName.toLowerCase()
  })

   //remove password and refresh token filed form response
    
 const createdUser = await user.findById(user._id).select(
    "-password -refreshToken"
 )


//check for user creation
 if (!createdUser) {
    throw new ApiError (500 , "somthing went wrong while registering the user")
    
 }
  

  //return ref
 return res.status(201).json(
    new ApiResponse (200 , createdUser , "user Registered successfully")
 )

})

export {registerUser}
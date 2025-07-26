import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async(req , res)=>{
  //get user details from frontend
    const {username,fullName,email,password}=req.body
         console.log("email:",email)


  //validation- not empty 
  if([fullName,username,email,password].some((field)=>field?. trim ()=== "")){
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
   const existingUser=User.findOne({
    $or:[{username},{email}]
    

   })
   if(existingUser){
    throw new ApiError(409,"user with email or username already exists")

   }


  //check or handle  image ,check avtar
  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400,"avatar flie is required")
    
  }




  //upload them to cloudinary, avtar
  const avatar = await uploadOnCloudinary(avatarLocalpath)
  const coverImage = await uploadOnCloudinary(coverImageLocalpath)
  if (!avatar) {
    throw new ApiError (400,"avatar flie is required")
    
  }


  //creatr user object - create entry in db
 const user= User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
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
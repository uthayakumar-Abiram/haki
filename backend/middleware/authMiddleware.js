import jwt  from "jsonwebtoken"
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


 const protect = asyncHandler(async(req,res,next)=>{
 let token;
 
 token =req.cookies.jwt;
 if(token){
    try{
           const decoded = jwt.verify(token,process.env.JWT_SECRET);

           req.user= await User.findById(decoded.userId).select('-password');
           next();

    } catch (error){
        res.status(401);
        throw new Error("Not authorized,invaild token");
    }
} else{
    res.status(401);
    throw new Error("Not authorized,no token");
}
 });

const isAdmin = asyncHandler(async (req, res, next) => {
const { email} = req.body;
const adminUser = await User.findOne({ email });
if (adminUser.role !== "admin") {
throw new Error("You are not an admin");
} else {
next();
}
});

export { protect, isAdmin}
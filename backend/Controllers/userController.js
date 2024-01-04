import asynchandler from'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'


// des Auth user/set token
// route POST /api/users/auth
// access Public
const authUser = asynchandler(async(req, res) => {
  const {email,password}=req.body

  const user= await User.findOne({email})

  if (user && (await user.matchPassword(password))){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        password:user.password
    })
}
else{
    res.status(401)
    throw new Error('Invaild email or password')
}
     });


// des Auth user/set token
// route POST /api/users/admin-login
// access admin
     const loginAdmin = asynchandler(async (req, res) => {
      const {email,password}=req.body
      const user = await User.findOne({email});
      if (user.role !== "admin") throw new Error("Not Authorised");
      if (user && (await user.matchPassword(password))){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        password:user.password
    })
}
  else{
    res.status(401)
    throw new Error('Invaild email or password')
 }
     });
// @desc register user/set token
// route POST /api/users/reg
// @access Public
const registerUser = asynchandler(async(req,res) => {
    const {name,email,password,role}=req.body;
    const userExists =await User.findOne({email})
    if (userExists){
        res.status(400);
        throw new Error("user alredy exists");
    }
    const user =await User.create({
        name,
        email,
        password,
        role

    })

    if (user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role
    
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')

    }
    res.status (200).json({ message: 'Register User' });
  
});


// @desc logout user/set token
// route POST /api/users/lpgout
// @access Public
const logoutUser = asynchandler(async(req, res) => {

    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    })
    res.status (200).json ({ message: 'User Logout out' });
    });
    

// @desc get profile
// route GET /api/Profile
// @access Public

    const getUserProfile = asynchandler(async(req, res) => {
        res.status (200).json ({ message: ' User profile' });
        });
    

// @desc update user profile
// route GET /api/Profile
// @access Private

    const updateUserProfile = asynchandler(async(req, res) => {
       const user = await User.findById(req.user._id)
       if (user) {
        user.name =req.body.name ||user.name
        user.email =req.body.email ||user.email
             if (req.body.password) {
                user.password=req.body.password
             }
            const updateduser = await user.save();
            res.status(200).json({
                _id:updateduser._id,
                name:updateduser.name,
                email:updateduser.email
            })
       }
       else{
        res.status(404);
        throw new Error('User not found')

       }
        });
        
        const deleteUser = async (req, res, next) => {
            const { id } = req.body
            await User.findById(id)
              .then(user => user.remove())
              .then(user =>
                res.status(201).json({ message: "User successfully deleted", user })
              )
              .catch(error =>
                res
                  .status(400)
                  .json({ message: "An error occurred", error: error.message })
              )
        }

  
    export {authUser,registerUser,getUserProfile,logoutUser,updateUserProfile,deleteUser,loginAdmin};
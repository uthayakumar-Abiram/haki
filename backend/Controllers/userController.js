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
        password:user.password,
        role:user.role
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
export const login = async (req, res) => {
  const { email, password } = req.body;
  let user = null;
  try {
      const careneeder = await User.findOne({ email });
      const caretaker = await Caretaker.findOne({ email });
      
      if (careneeder) {
          user = careneeder;
      } else if (caretaker) {
          user = caretaker;
      }
      
      // check if user exist or not
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      
      if (user && (await user.matchPassword(password))) {
          generateToken(res, user);
          const token=generateToken(user);
          const {password,role,appoinment, ...rest}= user._doc;
          // Assuming token, data, and role are defined somewhere
          res.status(201).json({
              status: true,
              message: "Successfully login",
             
          });
      } else {
          return res.status(401).json({ status: false, message: "Invalid credentials" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Failed to login" });
  }
};
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
        role:user.role
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

const getUsers = asynchandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });
  
// @desc logout user/set token
// route POST /api/users/logout
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

    const getUserProfile = asynchandler(async (req, res) => {
        const user = await User.findById(req.user._id);
      
        if (user) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          });
        } else {
          res.status(401);
          throw new Error("Invalid email or password");
        }
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

            const { id }  = req.body;
            const user= await User.findOne({email})
              try {
                const deleteProduct = await User.findByIdAndDelete(user._id);
                res.json(deleteProduct);
              } catch (error) {
                throw new Error(error);
              }
            };

  
    export {authUser,registerUser,getUserProfile,logoutUser,updateUserProfile,deleteUser,loginAdmin ,getUsers};
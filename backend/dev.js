import dotenv from "dotenv"
dotenv.config()
module.exports = {
    EMAIL: process.env.EMAIL,  // your email address goes here
    PASSWORD:process.env.EMAIL,  // recently generated password goes here
    MAIN_URL: "http://localhost:5500", 
  };
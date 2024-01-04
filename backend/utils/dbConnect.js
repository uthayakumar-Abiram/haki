import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const mongoString = process.env.DATABASE_URL
    mongoose.connect(mongoString);
    const database = mongoose.connection
    
     database.once('connected', () => {
    console.log('Database Connected');
})
  } catch (error) {
    console.log("DAtabase error");
  }
};
export default dbConnect;
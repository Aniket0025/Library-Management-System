import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async()=> {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected to ${mongoose.connection.host}`);     

  }catch(error){
    console.log(`Error in Database connectivity`);
    process.exit(1);

  }
}

export default connectDB;
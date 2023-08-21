import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log("There is no MONGO_URI");
    return;
  }

  const connect = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${connect.connection.host}`);
};

export default connectDB;

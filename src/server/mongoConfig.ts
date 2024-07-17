import mongoose from "mongoose";

const uri =
  "mongodb+srv://yuradiachuk1:oVujnSAg371erxn7@cluster0.iv0v1ou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Mongo db connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

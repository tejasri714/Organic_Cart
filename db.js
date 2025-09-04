import mongoose from "mongoose";

// ✅ Function to connect MongoDB
const connectDB = async () => {
  try {
    // Modern Mongoose connection, no need for extra options now
    await mongoose.connect(`${process.env.MONGODB_URI}/greenkart`);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;

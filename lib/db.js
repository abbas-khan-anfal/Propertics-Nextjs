import mongoose from "mongoose";

// connect with mongodb
const connectDB = async () => {
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
        // await mongoose.connect('mongodb://localhost:27017/propertics');
        console.log("MongoDB connected");
    }
    catch (error)
    {
        console.log(`Error connecting DB : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
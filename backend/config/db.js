import mongoose from 'mongoose';

const connectDB = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;
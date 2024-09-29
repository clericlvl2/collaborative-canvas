import mongoose from 'mongoose';

const connectDB = async (mongoUri: string): Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error("An unknown error occured");
        }
        process.exit(1);
    }
};

export default connectDB;
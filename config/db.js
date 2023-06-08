import mongoose from 'mongoose';
const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Mongodb Database ${conn.connection.host}`);

}
export default connectDB;
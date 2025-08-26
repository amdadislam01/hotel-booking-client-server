import mongoose from "mongoose";

const connectBD = async ()=> {
    try {
        mongoose.connection.on('connected', ()=> console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URL}/hotel-booking`)
    } catch (error) {
        console.log(error.message);
    }
}

export default connectBD;
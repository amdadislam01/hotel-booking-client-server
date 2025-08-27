import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotel: {type: String, ref: 'Hotel', req: true},
    roomType: {type: String, req: true},
    pricePerNight: {type: Number, req: true},
    amenities: {type: Array, req: true},
    image: [{type: String}],
    isAvailable: {type: Boolean, default: true},
},{timestamps: true});

const Room = mongoose.model('Room', roomSchema);

export default Room;
import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


// Function to Check Availablity of Room


const checkAvailablity = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const booking = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
        const isAvailable = booking.length === 0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}

// API to check avilability of room
// POST / api/ booking/check-availability
export const checkAvailablityAPI = async (req, res) => {
    try {
         const {room, checkInDate, checkOutDate} = req.body;
         const isAvailable = await checkAvailablity({ checkInDate, checkOutDate, room});
         res.json({success: true, isAvailable})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// API to create a new Booking
// POST /api/booking/book


export const createBooking = async (req, res) => {
    try {
        const {room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;

        // Before Booking Check Availablity
         const isAvailable = await checkAvailablity({ 
            checkInDate, 
            checkOutDate, 
            room
        });
        if (!isAvailable) {
            return  res.json({success: true, message: 'Room is not avilable'})
        }
        // Get the totalPrice from
        const roomData = await Room.findById(room).populate('hotel');
        let totalPrice = roomData.pricePerNight;

        // Calculate totalPrice based on nights
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() -checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        res.json({success: true, message: 'Booking created Successfully'})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Failed to create booking'})
    }
}

// API to get all booking for user
// GET / api/ booking/ user

export const getUserBooking = async (req, res) => {
    try {
        const user = req.user._id;
        const booking = await Booking.find({user}).populate("room hotel").sort({createAt: -1});
         res.json({success: true, booking})
    } catch (error) {
        res.json({success: false, message: 'Failed to fatch booking'})
    }
}


export const getHotelBooking = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId});
    if (!hotel) {
         res.json({success: false, message: 'No Hotel found'})
    }
    const booking = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createAt: -1});
    //Total Booking
    const totalBookings = booking.length;
    //Total Revenue
    const totalRevenue = booking.reduce((acc, booking)=> acc + booking.totalPrice, 0)

    res.json({success: true, dashboardData: {totalBookings, totalRevenue, booking}})
    } catch (error) {
        res.json({success: true, message: 'Failed to fatch booking'})
    }
}
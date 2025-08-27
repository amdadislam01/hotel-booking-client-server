import express from 'express';
import { checkAvailablityAPI, createBooking, getHotelBooking, getUserBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availavlity', checkAvailablityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBooking);
bookingRouter.get('/hotel', protect, getHotelBooking);

export default bookingRouter;
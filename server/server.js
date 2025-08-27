import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import connectBD from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connetCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectBD()
connetCloudinary();

const app = express()
app.use(cors())  // Enable Cross-Origin Resource Sharing

// Middlewere

app.use(express.json())
app.use(clerkMiddleware())

//API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.send('API is working'))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/booking', bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server runnig on port ${PORT}`));

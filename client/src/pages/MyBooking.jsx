import React, { useState } from "react";
import Title from "../components/Title";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBooking = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 ">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />
      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3 ">Hotels</div>
          <div className="w-1/3 ">Date & Timings</div>
          <div className="w-1/3 ">Payment</div>
        </div>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr]  w-full border-b border-gray-300 py-6 first:border-t "
          >
            {/* hotel details  */}
            <div className="flex flex-col md:flex-row gap-5">
              <img
                src={booking.room.images[0]}
                alt="hotel imager"
                className="min-md:w-44 rounded shadow object-cover"
              />
              <div className="space-y-1">
                <p className="font-playfire text-2xl">
                  {booking.hotel.name}
                  <span className="font-inter text-sm ">
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="location" />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="location" />
                  <span>Guest: {booking.guests}</span>
                </div>
                <p className="text-base">Total: ${booking.totalPrice}</p>
              </div>
            </div>
            {/* date timing */}
            <div className="flex flex-row  md:items-center md:gap-12 mt-3 gap-8">
              <div className="">
                <p className="">Check-In:</p>
                <p className="text-gray-500 text-sm ">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div className="">
                <p className="">Check-out:</p>
                <p className="text-gray-500 text-sm ">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>
            {/* payment status */}
            <div className="flex flex-col justify-center items-start pt-3 ">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? "bg-green-500 " : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={` text-sm ${
                    booking.isPaid ? "text-green-500 " : "text-red-500"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>

              </div>
              {!booking.isPaid && (
                <button className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer">Pay Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
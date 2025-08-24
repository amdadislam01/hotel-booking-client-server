import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <img
            className="w-4.5 h-4.5"
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt=""
          />
        ))}
    </>
  );
};

export default StarRating;
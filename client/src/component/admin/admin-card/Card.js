import React from "react";

const Card = ({ title, imageUrl, number, bgColor}) => {
  return (
    <div className={`flex items-center justify-center  mt-5 `}>
      <div className={`bg-white rounded-lg shadow-md p-6 text-center w-64 ${bgColor} `}>
        <h2 className="text-2xl font-semibold mb-4 uppercase">{title}</h2>
        <img
          src={imageUrl}
          alt="Card Image"
          className="rounded-full w-20 h-20 mx-auto mb-4"
        />
        <p className="text-gray-700 mb-4 font-bold text-3xl">{number}</p>
      </div>
    </div>
  );
};

export default Card;

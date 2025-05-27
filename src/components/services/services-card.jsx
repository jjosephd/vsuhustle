import { useState } from 'react';

const ServicesCard = ({ cardData }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = () => {
    setActiveCard(activeCard === cardData.id ? null : cardData.id);
  };

  return (
    <div className="relative bg-white w-full max-w-xs min-h-[220px] p-6 pt-20 rounded-xl shadow border border-gray-200 text-center flex flex-col items-center justify-start">
      {/* Floating Circle Image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center">
        <div className="text-4xl text-primary">{cardData.img}</div>
      </div>

      <h3 className="font-bold text-primary text-sm mt-2">{cardData.title}</h3>
      <p className="text-sm mt-2 text-gray-700">{cardData.body}</p>
    </div>
  );
};

export default ServicesCard;

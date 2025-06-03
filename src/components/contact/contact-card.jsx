import React, { useEffect } from 'react';
import { fetchListingById } from '../../utils/firestore/listings';

const ContactCard = ({ contactInfo }) => {
  if (!contactInfo) return null;
  const { email, hours, phone } = contactInfo;
  return (
    <div className="contact-card flex flex-col w-full">
      <div>{phone}</div>
      <div>{email}</div>
      <div className="flex justify-between">
        <span id="day">{hours?.day}</span>
        <span id="hours">
          {hours?.open} - {hours?.close}
        </span>
      </div>
    </div>
  );
};

export default ContactCard;

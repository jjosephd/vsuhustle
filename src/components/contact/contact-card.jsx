import React, { useEffect } from 'react';
import { fetchListingById } from '../../utils/firestore/listings';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

{
  /*
      
  };
   */
}
const ContactCard = ({ contactInfo }) => {
  const formatPhoneNumber = (phone) => {
    const number = parsePhoneNumberFromString(phone, 'US');
    return number ? number.formatNational() : phone;
  };
  /**
   * Converts a 24-hour time string in the format "HH:MM" to a 12-hour time
   * string in the format "hh:mm AM/PM".
   *
   * @param {string} timeStr - 24-hour time string, e.g. "14:30"
   * @returns {string} 12-hour time string, e.g. "2:30 PM"
   */
  const formatTime = (timeStr) => {
    const [hour, minute = '00'] = timeStr.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const normalized = h % 12 === 0 ? 12 : h % 12;
    return `${normalized}:${minute}${ampm}`;
  };

  if (!contactInfo) return null;
  const { email, hours, phone } = contactInfo;

  const dayOrder = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return (
    <div className="contact-card flex flex-col w-full bg-gray-400/10 rounded p-6">
      <div>{formatPhoneNumber(phone)}</div>
      <div>{email}</div>

      {dayOrder.map((day) => {
        const times = hours?.day?.[day];
        if (!times) return null;

        return (
          <div key={day} className="flex justify-between">
            <span className="capitalize">{day}</span>
            <span>
              {formatTime(times.open)} - {formatTime(times.close)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ContactCard;

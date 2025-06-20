import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import errorHandler from '../../utils/error/errorHandler';

const BookingCalendar = ({
  bookings: fetchedBookings,
  loading: bookingsLoading,
  error: bookingsError,
}) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const isSameDay = (dateA, dateB) => {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  };

  const bookingsForDay = selectedDay
    ? fetchedBookings.filter((booking) => {
        const bookingDate = new Date(booking.startTime.seconds * 1000);
        return isSameDay(bookingDate, selectedDay);
      })
    : [];

  const bookedDates = (fetchedBookings || []).map(
    (booking) => new Date(booking.startTime.seconds * 1000)
  );

  return (
    <div className="space-y-6">
      {bookingsLoading ? (
        <div>Loading bookings...</div>
      ) : bookingsError ? (
        <div>{errorHandler.firebase(bookingsError)}</div>
      ) : fetchedBookings.length === 0 ? (
        <div className="text-sm text-gray-500 italic">
          You have no upcoming bookings.
        </div>
      ) : (
        <>
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: 'bg-blue-100 rounded-full text-blue-900 font-semibold',
            }}
            className="text-xs sm:text-lg max-w-xs"
          />

          {selectedDay && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Bookings on{' '}
                {selectedDay.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h2>
              {bookingsForDay.length > 0 ? (
                <ul className="space-y-2">
                  {bookingsForDay.map((booking) => (
                    <li key={booking.id}>
                      <div className="">
                        <p>
                          <strong>Service:</strong> {booking.serviceName}
                        </p>
                        <p>
                          <strong>Time:</strong>{' '}
                          {new Date(
                            booking.startTime.seconds * 1000
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No bookings for this date.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingCalendar;

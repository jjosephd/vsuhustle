import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Creates a new booking document in Firestore.
 *
 * @param {object} bookingData The booking data to write to Firestore, which
 *   should include all required fields except `status` and `createdAt`.
 * @return {Promise<string>} A promise that resolves to the ID of the newly
 *   created booking document.
 */
export const createBooking = async (bookingData) => {
  if (
    !bookingData.listingId ||
    !bookingData.userId ||
    !bookingData.serviceName ||
    !bookingData.serviceSnapshot ||
    !bookingData.startTime
  ) {
    throw new Error('Missing required booking fields.');
  }

  const docRef = await addDoc(collection(db, 'bookings'), {
    ...bookingData,
    status: bookingData.status || 'confirmed',
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

/**
 * Checks whether a proposed booking overlaps with any existing bookings for
 * the same listing.
 *
 * @param {string} listingId The ID of the listing to check.
 * @param {Timestamp} proposedStart The proposed start time of the booking.
 * @param {number} duration The duration of the proposed booking in minutes.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the proposed
 *   booking overlaps with an existing booking, and `false` otherwise.
 */
export const checkBookingConflict = async (
  listingId,
  proposedStart,
  duration
) => {
  const proposedEnd = Timestamp.fromMillis(
    proposedStart.toMillis() + duration * 60000
  );

  const bookingsRef = collection(db, 'bookings');
  const q = query(
    bookingsRef,
    where('listingId', '==', listingId),
    where('startTime', '<', proposedEnd) // Only fetch bookings that *might* overlap
  );

  const snapshot = await getDocs(q);

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const existingStart = data.startTime;
    const existingEnd = Timestamp.fromMillis(
      existingStart.toMillis() + data.serviceSnapshot.duration * 60000
    );

    const overlaps =
      proposedStart.toMillis() < existingEnd.toMillis() &&
      proposedEnd.toMillis() > existingStart.toMillis();

    if (overlaps) return true;
  }

  return false; // No conflict
};

export const fetchBookingsByUserId = async (userId) => {
  const q = query(
    collection(db, 'bookings'),
    where('userId', '==', userId),
    orderBy('startTime', 'asc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchBookingsByListingId = async (listingId) => {
  const q = query(
    collection(db, 'bookings'),
    where('listingId', '==', listingId),
    orderBy('startTime', 'asc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

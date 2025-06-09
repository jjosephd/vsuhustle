import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
export const fetchReviewsForListing = async (listingId) => {
  if (!listingId) {
    throw new Error('Invalid listing ID provided');
  }

  try {
    const q = query(
      collection(db, 'reviews'),
      where('listingId', '==', listingId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch listing reviews');
  }
};

export const fetchReviewsByListingId = async (listingId) => {
  if (!listingId) throw new Error('Invalid listing ID');

  try {
    const q = query(
      collection(db, 'reviews'),
      where('listingId', '==', listingId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching reviews by listingId:', error);
    throw new Error('Failed to fetch reviews');
  }
};

export const fetchReviewsByUserId = async (userId) => {
  if (!userId) throw new Error('Invalid user ID');

  try {
    const q = query(
      collection(db, 'reviews'),
      where('reviewerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw new Error('Failed to fetch user reviews');
  }
};

export const fetchReviewsReceived = async (userId) => {
  try {
    // Step 1: Get all listings owned by this user
    const listingsSnap = await getDocs(
      query(collection(db, 'listings'), where('userId', '==', userId))
    );

    const listingIds = listingsSnap.docs.map((doc) => doc.id);

    if (listingIds.length === 0) return [];

    // Step 2: Break into chunks of 10 for Firestore's `in` limitation
    const chunks = [];
    while (listingIds.length) {
      chunks.push(listingIds.splice(0, 10));
    }

    let allReviews = [];

    for (const chunk of chunks) {
      const reviewsSnap = await getDocs(
        query(collection(db, 'reviews'), where('listingId', 'in', chunk))
      );

      const reviews = reviewsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      allReviews.push(...reviews);
    }

    return allReviews;
  } catch (err) {
    console.error('Error fetching received reviews:', err);
    throw new Error('Failed to fetch received reviews');
  }
};

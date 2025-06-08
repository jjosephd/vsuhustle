import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../firebase';

export const fetchAllListings = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'listings'));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error('Error fetching all listings for fuzzy search:', err);
    return [];
  }
};

/**
 * Fetches listings from the Firestore database that match the given category.
 * The category will be matched against the 'category' field in the listings
 * collection, which is a string. The function returns an array of objects with
 * the structure of the listings documents, but with the 'keywords' field filtered
 * to only include the keywords that were matched.
 *
 * @param {string} category The category to search for.
 * @return {Promise<Listing[]>} A promise that resolves to an array of listings
 *   that match the given category.
 */
export const fetchListingsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, 'listings'),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return results;
  } catch (err) {
    console.error('Error fetching listings:', err);
    return [];
  }
};

/**
 * Fetches listings from the Firestore database that match the given keywords.
 * The keywords will be matched against the 'keywords' field in the listings
 * collection, which is an array of strings. The function returns an array of
 * objects with the structure of the listings documents, but with the 'keywords'
 * field filtered to only include the keywords that were matched.
 *
 * @param {string[]} keywords The keywords to search for.
 * @return {Promise<Listing[]>} A promise that resolves to an array of listings
 *   that match the given keywords.
 */
export const fetchListingsByKeyword = async (keyword) => {
  try {
    const cleaned = keyword.trim().toLowerCase();

    const q = query(
      collection(db, 'listings'),
      where('keywords', 'array-contains', cleaned)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error('Failed to fetch listings by keyword:', err);
    throw err;
  }
};

export const fetchListingById = async (id) => {
  // Guard against undefined/null/empty id
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error('Invalid listing ID provided');
  }

  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Listing not found');
    }
  } catch (error) {
    // Re-throw with more context if it's a Firebase error
    if (error.code) {
      throw new Error(`Firebase error: ${error.message}`);
    }
    throw error;
  }
};

export const fetchListingsByUserId = async (userId) => {
  const q = query(collection(db, 'listings'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchReviewsForListing = async (listingId) => {
  if (!listingId) {
    throw new Error('Invalid listing ID provided');
  }

  try {
    const reviewsCollection = collection(db, `listings/${listingId}/reviews`);
    const sortedQuery = query(reviewsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(sortedQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    if (error.code) {
      throw new Error(`Firebase error: ${error.message}`);
    }
    throw error;
  }
};

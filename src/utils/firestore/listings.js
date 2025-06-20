import {
  collection,
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

/**
 * Creates a new listing document in Firestore.
 *
 * @param {object} listingData The listing data to write to Firestore, which
 *   should include all required fields except `userId` and `createdAt`.
 * @param {string} userId The ID of the user creating the listing.
 * @return {Promise<string>} A promise that resolves to the ID of the newly
 *   created listing document.
 */
export const createListing = async ({ listingData, userId }) => {
  try {
    const docRef = doc(collection(db, 'listings'));
    await setDoc(docRef, {
      ...listingData,
      userId,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating listing:', error.message);
    throw error;
  }
};

export const deleteListingbyId = async (listingId) => {
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid listingId');
  }
  try {
    const docRef = doc(db, 'listings', listingId);
    await deleteDoc(docRef);
    return 'Listing deleted successfully';
  } catch (error) {
    throw error;
  }
};

/**
 * Initializes a Firestore user profile if it doesn't already exist.
 *
 * @param {object} user - The Firebase Auth user object.
 * @throws Will throw an error if required user fields are missing.
 */
export const initializeUserProfile = async (user) => {
  if (!user || !user.uid || !user.email) {
    throw new Error('Invalid user object passed to initializeUserProfile');
  }

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) return; // Profile already initialized

  // Use server timestamp as fallback
  const createdAt =
    user.metadata?.creationTime && !isNaN(new Date(user.metadata.creationTime))
      ? new Date(user.metadata.creationTime)
      : serverTimestamp();

  let reviewsGiven = 0;
  try {
    const q = query(
      collection(db, 'reviews'),
      where('reviewerId', '==', user.uid)
    );
    const reviewSnapshot = await getDocs(q);
    reviewsGiven = reviewSnapshot.size;
  } catch (err) {
    console.warn('Failed to count user reviews:', err.message);
  }

  // Profile fields
  const userProfile = {
    email: user.email,
    displayName: user.displayName || '',
    servicesUsed: 0,
    reviewsGiven,
    createdAt,
  };

  await setDoc(userRef, userProfile);
};

export const incrementServicesUsed = async (uid) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    servicesUsed: increment(1), // Firestore atomic increment
  });
};

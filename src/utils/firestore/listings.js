import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

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

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

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

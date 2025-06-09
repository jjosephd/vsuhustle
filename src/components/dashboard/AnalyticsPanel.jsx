import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../utils/firestore/users';
import { fetchReviewsReceived } from '../../utils/firestore/reviews';
import { useAuth } from '../../context/auth/AuthContext';
import ReviewCard from '../listings/reviews/ReviewCard';

const AnalyticsPanel = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const profileData = await fetchUserProfile(currentUser.uid);
        setProfile(profileData);

        const receivedReviews = await fetchReviewsReceived(currentUser.uid);
        setReviews(receivedReviews);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.uid) {
      loadAnalytics();
    }
  }, [currentUser]);

  if (loading) return <div>Loading analytics...</div>;
  if (!profile) return <div>No analytics data found.</div>;

  const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(profile.createdAt?.toDate?.() || profile.createdAt));

  return (
    <div className="analytics-panel p-4 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Activity Overview</h2>
      <ul className="space-y-2 text-sm md:text-base">
        <li>
          <strong>Services Used:</strong> {profile.servicesUsed ?? 0}
        </li>
        <li>
          <strong>Account Created:</strong> {formattedCreatedAt}
        </li>
        {profile.role && (
          <li>
            <strong>Role:</strong> {profile.role}
          </li>
        )}
        {profile.lastLogin && (
          <li>
            <strong>Last Login:</strong>{' '}
            {new Date(
              profile.lastLogin.toDate?.() || profile.lastLogin
            ).toLocaleString()}
          </li>
        )}
      </ul>

      {/* Reviews Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Reviews You've Received</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">You haven’t received any reviews yet.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li key={review.id} className="border rounded-md bg-base-200 p-3">
                <ReviewCard
                  userId={review.userId}
                  comment={review.comment}
                  rating={review.rating}
                  createdAt={review.createdAt}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel;

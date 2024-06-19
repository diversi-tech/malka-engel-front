
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getUserProfile } from './Api';

const UserProfile = () => {
  const { state, dispatch } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(state.token);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (state.isAuthenticated) {
      fetchProfile();
    }
  }, [state.isAuthenticated, state.token]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  if (!state.isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserProfile;



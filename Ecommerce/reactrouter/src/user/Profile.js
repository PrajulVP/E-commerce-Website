import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const userId = isAuthenticated() ? isAuthenticated().user.id : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not available');
        }

        const response = await fetch(`http://localhost:8000/api/user/${userId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const profileData = await response.json();
        setProfile(profileData);
        if (response.ok) {
          console.log(profileData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${date} ${time}`;
  };

  return (
    <Base>
      {profile && (
        <div className="container p-4">
          <h1 className="text-center mb-4">Your Details</h1>
          <div className="row">
            <div className="col-md-6 offset-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Username: {profile.name}</h5>
                  <p className="card-text">Email: {profile.email}</p>
                  <p className="card-text">Phone No: {profile.phone}</p>
                  <p className="card-text">Gender: {profile.gender}</p>
                  <p className="card-text">Address: {profile.address}</p>
                  <p className="card-text">Created Date: {formatDate(profile.created_at)}</p>
                  <div className='container mx-auto d-flex justify-content-between'>
                    <div><Link to="/updateprofile"><button className='btn btn-primary'>Update</button></Link></div>
                    <div><Link to="/vieworders"><button className='btn btn-primary'>View Orders</button></Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

export default Profile;

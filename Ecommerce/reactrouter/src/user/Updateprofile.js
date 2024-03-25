import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const UpdateProfile = () => {
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        try {
            const userId = isAuthenticated() ? isAuthenticated().user.id : null;
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
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Check if the user is authenticated
            if (!isAuthenticated()) {
                throw new Error('User is not authenticated');
            }
            
            const formData = new FormData(event.target);
    
            // Convert formData to JSON object
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
    
            const userId = isAuthenticated().user.id;
            
            // Make PATCH request using axios
            const response = await axios.patch(`http://localhost:8000/api/user/${userId}/`, formDataObject, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Check if the update was successful
            if (response.status === 200) {
                // Optionally, you can fetch the updated profile data after successful update
                fetchProfile();
                alert('Profile updated successfully');
            } else {
                throw new Error('Failed to update profile data');
            }
            
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };
    

    return (
        <Base>
            {profile && (
                <div className="container p-4">
                    <h1 className="text-center mb-4">Update Profile</h1>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control" name="name" defaultValue={profile.name} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" name="email" defaultValue={profile.email} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" name="phone" defaultValue={profile.phone} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="gender" className="form-label">Gender</label>
                                            <select className="form-select" name="gender" defaultValue={profile.gender}>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <textarea className="form-control" name="address" defaultValue={profile.address}></textarea>
                                        </div>
                                        <Link to="/profile"><button className='btn btn-primary'>Back</button></Link>
                                        <button type="submit" className='btn btn-primary ms-2'>Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Base>
    );
};

export default UpdateProfile;

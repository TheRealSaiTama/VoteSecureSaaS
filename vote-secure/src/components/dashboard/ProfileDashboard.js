import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const ProfileDashboard = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.name || '');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let photoURL = currentUser?.photoURL || '';

      if (profileImage) {
        const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${profileImage.name}`);
        await uploadBytes(imageRef, profileImage);
        photoURL = await getDownloadURL(imageRef);
      }

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL
      });

      const updatedUser = {
        ...currentUser,
        name: displayName,
        photoURL
      };

      localStorage.setItem('voteSecureUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        {currentUser?.photoURL && (
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Current Image:</p>
            <img src={currentUser.photoURL} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
        {message && <p className="mt-2 text-center text-sm text-gray-700 dark:text-gray-300">{message}</p>}
      </form>
    </div>
  );
};

export default ProfileDashboard;
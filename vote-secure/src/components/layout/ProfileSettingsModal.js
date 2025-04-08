import React, { useState, useRef } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, set, get } from 'firebase/database';
import { auth, storage, database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const ProfileSettingsModal = ({ onClose }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [name, setName] = useState(currentUser?.name || '');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(currentUser?.photoURL || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let photoURL = currentUser.photoURL;

      if (photoFile) {
        const uid = auth.currentUser?.uid;
        if (!uid) {
          console.warn('Firebase Auth currentUser UID is missing. Cannot upload profile image.');
        } else {
          console.log('Converting image to base64 and uploading to Realtime Database...');
          const reader = new FileReader();
          reader.readAsDataURL(photoFile);
          const base64Image = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

          try {
            const userRef = dbRef(database, `users/${uid}`);
            const userSnapshot = await get(userRef);
            const userData = userSnapshot.val() || {};
            await set(userRef, {
              ...userData,
              profileImage: base64Image,
              updatedAt: Date.now()
            });
            console.log('Realtime Database updated with base64 profile image.');
            photoURL = base64Image;
          } catch (dbErr) {
            console.error('Error updating Realtime Database:', dbErr);
            setError('Failed to save profile image. Please try again.');
            return;
          }
        }
      }

      try {
        console.log('Updating Firebase Auth profile...');
        await updateProfile(auth.currentUser, {
          displayName: name
          // Do NOT update photoURL with base64 string
        });
        console.log('Firebase Auth profile updated.');
      } catch (authErr) {
        console.error('Error updating Firebase Auth profile:', authErr);
        setError('Failed to update profile info. Please try again.');
        return;
      }

      try {
        const updatedUser = {
          ...currentUser,
          name,
          photoURL: photoURL || currentUser.photoURL
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('voteSecureUser', JSON.stringify(updatedUser));
        onClose();
      } catch (ctxErr) {
        console.error('Error updating local user context:', ctxErr);
        setError('Failed to update local profile info.');
      }
    } catch (err) {
      console.error('Unexpected profile update error:', err);
      setError('Unexpected error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Profile Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Profile Photo
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-3 py-1 text-sm font-medium rounded-md text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800"
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;

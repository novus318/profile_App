'use client'
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from 'next/navigation';
import avtar from '@/app/avtar.jpg'
interface UserProfileData {
  name: string;
  username: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  image: string;
}
const UserProfile: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authData, setAuthData } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<UserProfileData>({
    name: '',
    username: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    image: avtar.src,
  });

  const isAuthenticated = !!authData;

  useEffect(() => {
    if (isAuthenticated) {
      // Ensure that localStorage is available before accessing it
      if (typeof window !== 'undefined') {
        const storedAuthData = localStorage.getItem('auth');
        if (storedAuthData) {
          const parsedAuthData = JSON.parse(storedAuthData);
          setProfileData({
            name: parsedAuthData.user.name,
            username: parsedAuthData.user.username,
            email: parsedAuthData.user.email,
            companyName: parsedAuthData.user.companyName,
            phoneNumber: parsedAuthData.user.phoneNumber,
            image: avtar.src,
          });
        } else {
          
          router.push('/');
        }
      }
    }
  }, [isAuthenticated, router]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleUpdateClick = () => {
    setIsEditable(false);
  
    try {
      // Update the user data in local storage
      const updatedAuthData = { ...authData, user: profileData };
      localStorage.setItem('auth', JSON.stringify(updatedAuthData));
    } catch (error) {
      console.error('Error updating profile in local storage:', error);
    }
  };
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setProfileData((prevData) => ({
        ...prevData,
        image: newImage,
      }));
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    // Clear user data from local storage and log out
    localStorage.removeItem('auth');
    setAuthData(null);
    router.push('/');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <button
      onClick={handleLogout}
      className="absolute top-2 right-2 m-2 py-2 px-4 bg-[#60758f] text-white font-semibold rounded-md hover:bg-[#e8ba79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8ba79]"
    >
      Logout
    </button>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#60758f]">
            User Profile
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden"
           onClick={openModal}>
            <img
              src={profileData.image}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-lg font-semibold">{profileData.name}</div>
          <div className="text-gray-600">@{profileData.username}</div>
        </div>
        <form className="rounded-md shadow-sm space-y-4">
          <div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-md ${
                isEditable ? 'focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10' : ''
              }`}
              placeholder={profileData.name}
              disabled={!isEditable}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-md ${
                isEditable ? 'focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10' : ''
              }`}
              placeholder={profileData.email}
              disabled={!isEditable}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              id="companyName"
              name="companyName"
              type="text"
              autoComplete="organization"
              required
              className={`appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-md ${
                isEditable ? 'focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10' : ''
              }`}
              placeholder={profileData.companyName}
              disabled={!isEditable}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              autoComplete="tel"
              required
              className={`appearance-none relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 rounded-md ${
                isEditable ? 'focus:outline-none focus:ring-[#e8ba79] focus:border-[#e8ba79] focus:z-10' : ''
              }`}
              placeholder={profileData.phoneNumber}
              disabled={!isEditable}
              onChange={handleInputChange}
            />
          </div>
        </form>
        {isEditable ? (
          <button
            onClick={handleUpdateClick}
            className="w-full py-2 px-4 bg-[#60758f] text-white font-semibold rounded-md hover:bg-[#e8ba79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8ba79]"
          >
            Update Profile
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="w-full py-2 px-4 bg-[#60758f] text-white font-semibold rounded-md hover:bg-[#e8ba79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8ba79]"
          >
            Edit Profile
          </button>
        )}
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="bg-white p-4 rounded-lg z-10 text-center">
      <img
        src={profileData.image}
        alt="Full Profile"
        className="w-56 h-auto object-contain"
      />
      <button
        onClick={closeModal}
        className="mt-2 py-2 px-4 bg-none text-[#60758f] font-semibold rounded-md hover:text-[#e8ba79]"
      >
        Close
      </button>
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          id="profilePicture"
          name="profilePicture"
          onChange={(e) => handleProfilePictureChange(e)}
          className="hidden"
        />
        <label
          htmlFor="profilePicture"
          className="cursor-pointer py-2 px-4 bg-[#60758f] text-white font-semibold rounded-md hover:bg-[#e8ba79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8ba79]"
        >
          Update Picture
        </label>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default UserProfile;


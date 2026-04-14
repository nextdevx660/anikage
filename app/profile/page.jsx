'use client';

import { useAuth } from '@/app/_context/AuthContext';
import { db } from '@/app/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import WishlistCard from '../_components/WishlistCard';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const router = useRouter()

  useEffect(() => {
    !user && router.push('/signup')
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      if (!user?.uid) return;

      try {
        const docRef = doc(db, 'anilook_users', user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setUserData({
          ...data,
          wishlist: Array.isArray(data.wishlist) ? data.wishlist : [],
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    getUserData();
  }, [user]);

  if (!userData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-neutral-950">
        <Loader2Icon className="text-white animate-spin" size={35} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-10 px-4 md:px-20 mt-10">
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={userData.photoUrl || 'https://i.pravatar.cc/150?img=8'}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-rose-500 shadow-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{userData.name || 'No Name'}</h1>
          <p className="text-gray-300">{userData.email || 'No Email'}</p>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-rose-500 w-fit pb-1">
          Wishlist
        </h2>

        {userData.wishlist.length > 0 ? (
          <WishlistCard list={userData.wishlist} />
        ) : (
          <p className="text-gray-400">No Anime Saved</p>
        )}
      </div>
    </div>
  );
}

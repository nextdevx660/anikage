'use client'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAuth } from '../_context/AuthContext' // <-- import useAuth
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'
import Link from 'next/link'

export default function Page() {
          const { user } = useAuth(); // you can use this to check if logged in
          const router = useRouter()
          const [name, setName] = useState('');
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [loading, setLoading] = useState(false);

          useEffect(() => {
                    user && router.replace('/')
          }, [user])

          const handleSignup = async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    try {
                              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                              const user = userCredential.user;
                              console.log(user);
                              const docRef = doc(db, 'anilook_users', user?.uid)
                              const docSnap = setDoc(docRef, {
                                        name: name,
                                        email: email,
                                        wishlist: [],
                                        photoUrl: '/user.png'
                              }).then(() => {
                                        console.log('data saved');
                              })
                    } catch (error) {
                              console.log(error);
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-800 to-black'>
                              <div className='bg-[#3a3a3c] w-full max-w-md p-8 md:rounded-2xl shadow-xl backdrop-blur-md border border-gray-700'>
                                        <h2 className='text-white text-3xl font-bold mb-6 text-center'>
                                                  Create an Account
                                        </h2>
                                        <form onSubmit={handleSignup} className='flex flex-col gap-5'>
                                                  <input
                                                            type='text'
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder='Full Name'
                                                            className='w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-300 text-gray-900'
                                                  />
                                                  <input
                                                            type='email'
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder='Email Address'
                                                            className='w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-300 text-gray-900'
                                                  />
                                                  <input
                                                            type='password'
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder='Password'
                                                            className='w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-300 text-gray-900'
                                                  />
                                                  <button
                                                            type='submit'
                                                            disabled={loading}
                                                            className='w-full py-3 mt-2 bg-red-200 hover:bg-red-300 text-black font-bold rounded-lg disabled:opacity-50'
                                                  >
                                                            {loading ? 'Signing Up...' : 'Signup'}
                                                  </button>
                                        </form>
                                        <p className='text-sm text-gray-400 mt-6 text-center'>
                                                  Already have an account? <span className='text-red-300 cursor-pointer hover:underline'><Link href='/login'>Login</Link></span>
                                        </p>
                              </div>
                    </div>
          );
}

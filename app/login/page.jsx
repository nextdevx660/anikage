'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [loading, setLoading] = useState(false);
          const [error, setError] = useState('');
          const router = useRouter();

          const handleLogin = async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setError('');

                    try {
                              await signInWithEmailAndPassword(auth, email, password);
                              router.push('/profile');
                    } catch (err) {
                              setError('Login failed. Please check your credentials.');
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-800 to-black">
                              <form
                                        onSubmit={handleLogin}
                                        className="bg-[#3c3a3b] p-8 rounded-lg w-full max-w-md text-white"
                              >
                                        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                                        {error && (
                                                  <p className="bg-red-600 p-2 rounded mb-4 text-center">{error}</p>
                                        )}

                                        <div className="mb-4">
                                                  <input
                                                            type='email'
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder='Email Address'
                                                            className='w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-300 text-gray-900'
                                                  />
                                        </div>

                                        <div className="mb-6">
                                                  <input
                                                            type='password'
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder='Password'
                                                            className='w-full px-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-300 text-gray-900'
                                                  />
                                        </div>

                                        <button
                                                  type="submit"
                                                  disabled={loading}
                                                  className="w-full py-3 bg-red-200 hover:bg-red-300 text-black font-bold rounded-lg disabled:opacity-50"
                                        >
                                                  {loading ? 'Logging in...' : 'Login'}
                                        </button>

                                        <p className="mt-4 text-center text-gray-400">
                                                  Don't have an account?{' '}
                                                  <a href="/signup" className="text-red-300 hover:underline">
                                                            Sign Up
                                                  </a>
                                        </p>
                              </form>
                    </div>
          );
}

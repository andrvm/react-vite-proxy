import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth-slice';
import Spinner from '../components/Spinner';
import apiInstance from '../api.ts';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (): Promise<void> => {
   try {
     if (userLogin && userPassword) {
       setIsLoading(true);
       const result = await apiInstance.put('/users/sign-in',{ login: userLogin, password: userPassword });
       if (result.status === 200) {
         dispatch(login());
         navigate('/main');
       } else {
         alert('Invalid credentials');
       }
     } else {
       alert('Please enter login and password');
     }
   } catch (e) {
     alert('Invalid credentials');
   } finally {
     setIsLoading(false);
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <div
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Login
            </label>
            <input
              type="text"
              name="username"
              id="username"
              disabled={isLoading}
              value={userLogin}
              onChange={(e) => setUserLogin(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your login"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              disabled={isLoading}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            {isLoading && <Spinner />}
            {!isLoading && (
              <button
                type="button"
                disabled={!userLogin || !userPassword}
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

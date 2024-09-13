import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { logout, user } from '../store/auth-slice';
import apiInstance from '../api.ts';
import { RootState } from '../store/store.ts';
import Spinner from '../components/Spinner.tsx';


const Main = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiInstance.get('/users/signed');
      if (response.data) {
        dispatch(user(response.data));
      }
    } catch (e) {
      console.error('getUserData error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogOut = (): void => {
    dispatch(logout());
  }

  useEffect(() => {
    const socketIo = io('http://159.69.178.87', {
      path: '/ws/',
      addTrailingSlash: false,
      transports: ['websocket'],
      withCredentials: true,
      extraHeaders: {
        'Cookie': ''
      }
    });
    socketIo.on('connection', (d) => {
      console.log('connection', d);
    });
    socketIo.on('connect', () => {
      console.log('connected');
    });
    socketIo.on('message', (d) => {
      console.log('message', d);
    });
    socketIo.on('disconnect', () => {
      console.log('disconnected');
    });

    getUserData();

    return () => {
      socketIo.removeAllListeners();
      socketIo.disconnect();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome to the Main Page!
        </h1>
        <div className="mt-4 text-lg text-center text-gray-600">
          You have successfully signed in.
          {isLoading || !Object.keys(userData).length && (
            <>
              Getting user's data ... <br />
              <Spinner />
            </>
          )}
          {Object.keys(userData).length > 0 && (
            <pre>
              {JSON.stringify(userData, null, 2)}
            </pre>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;

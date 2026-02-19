import React from 'react';
import { User } from 'lucide-react'; 
import MyOrders from './MyOrders';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">

      <div className="flex-grow container mx-auto p-4 md:p-6">

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

          {/* Left Section: Profile Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 transition-transform duration-500 hover:scale-[1.02]">
            
            <div className="flex flex-col items-center space-y-4 text-center">
              
              {/* Default User Icon */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 shadow-lg">
                <User className="w-12 h-12 text-gray-500" />
              </div>

              {/* Name and Email */}
              <div className="flex flex-col space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  John Doe
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  John@example.com
                </p>
              </div>

              
              <div className="w-full h-px bg-gray-300/50 my-2"></div>

              {/* Logout Button */}
              <button className="w-full py-2 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-300 shadow-md">
                Logout
              </button>
            </div>

          </div>

          {/* Right Section: Orders */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrders />
          </div>

        </div>
      </div>

    
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-gray-100/20 to-white/10 pointer-events-none -z-10"></div>
    </div>
  );
};

export default Profile;

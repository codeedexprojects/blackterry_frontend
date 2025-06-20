import React from 'react';
import { Pencil, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from "/src/Components/Header";

const Profile = () => {
  return (
    <div>
      <Header />

      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Profile</h1>

        {/* Name & Email Section */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Name</span>
            <button className="text-gray-500 hover:text-black">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-500">E-mail</p>
            <p className="text-sm text-gray-700">bill.sanders@example.com</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Address</span>
            <button className="text-sm text-blue-600 font-medium hover:underline">+ Add</button>
          </div>

          {/* No Address Message */}
          <div className="flex items-center space-x-2 border border-gray-300 bg-white rounded px-4 py-2 text-sm text-gray-600">
            <Info className="w-4 h-4 text-gray-500" />
            <span>No addresses added</span>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders"
            className="text-center px-6 py-2 bg-black text-white rounded hover:bg-[#5e3b25] transition"
          >
            Your Orders
          </Link>
          <button
            onClick={() => {
              // handle logout logic
              console.log("Logging out...");
            }}
            className="text-center px-6 py-2 border border-black text-black rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

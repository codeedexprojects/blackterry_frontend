import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HeaderAdmin({ onMenuClick, isMobile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
     localStorage.removeItem('adminData');
    navigate('/admin/login');
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between gap-2">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 md:mx-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification Bell */}
          {/* <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div> */}

          

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">BT</span>
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-sm font-semibold text-gray-900">BLACK TERRY</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            </button>

            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[180px]">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-semibold text-gray-900">BLACK TERRY</div>
                    <div className="text-xs text-gray-500">Admin</div>
                  </div>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
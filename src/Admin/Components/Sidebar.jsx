import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Megaphone, 
  FileText, 
  Tag, 
  Users, 
  Receipt,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import image from '/src/assets/footerlogo.png';

function Sidebar({ onNavigate, isMobile }) {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      name: 'Products',
      icon: Package,
      path: '/admin/product'
    },
    {
      name: 'Advertisement',
      icon: Megaphone,
      path: '/admin/advertisement'
    },
    {
      name: 'Subcategory',
      icon: Receipt,
      path: '/admin/subcategory'
    },
    {
      name: 'Order List',
      icon: FileText,
      path: '/admin/orderlist'
    },
    {
      name: 'Coupons',
      icon: Tag,
      path: '/admin/coupons'
    },
    {
      name: 'Users List',
      icon: Users,
      path: '/admin/userlist'
    },
    {
      name: 'Invoice',
      icon: Receipt,
      path: '/admin/invoice'
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={onNavigate}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Logo */}
      <div className={`${isMobile ? 'px-4 pb-4' : 'p-4'} border-b border-gray-100`}>
        <div className="flex items-center justify-center">
          <img
            src={image}
            alt="BLACKTERRY Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={onNavigate}
                  style={{ textDecoration: "none" }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'text-black font-medium hover:bg-gray-50 hover:text-amber-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-black'}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1 h-6 bg-white rounded-full opacity-80"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Admin Info */}
      {/* <div className="mt-auto p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">MR</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">Moni Roy</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaChevronLeft,
  FaChevronRight,
  FaRegUser,
} from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { IoBagHandleOutline, IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full">
      {/* Top strip */}
      <div className="flex items-center justify-between bg-[#D9CEBF] px-4 py-3 sm:py-4 text-sm text-[#5c4432]">
        <FaChevronLeft className="cursor-pointer" />
        <span className="text-xs font-medium tracking-widest">BLACK TERRY</span>
        <FaChevronRight className="cursor-pointer" />
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white ">
        {/* Left menu */}
        <nav className="flex gap-6 text-sm mb-2 sm:mb-0">
          <a
            href="/"
            className="text-black hover:text-[#D9CEBF] text-decoration-none transition-colors"
          >
            NEW
          </a>
          <a
            href="/shop"
            className="text-black hover:text-[#D9CEBF]  text-decoration-none transition-colors"
          >
            SHOP
          </a>
          <a
            href="/about"
            className="text-black hover:text-[#D9CEBF]  text-decoration-none transition-colors"
          >
            ABOUT
          </a>
          <a
            href="/contact"
            className="text-black hover:text-[#D9CEBF]  text-decoration-none transition-colors"
          >
            CONTACT
          </a>
        </nav>

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-black">
          BLACK TERRY
        </h1>

        <div className="flex gap-4 mt-2 sm:mt-0 text-lg">
          <Link
            to="/search"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <IoSearchSharp className="cursor-pointer" />
          </Link>
          
          <Link
            to="/wishlist"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <GrFavorite className="cursor-pointer" />
          </Link>
          <Link
            to="/cart"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <IoBagHandleOutline className="cursor-pointer" />
          </Link>
          <Link
            to="/profile"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <FaRegUser className="cursor-pointer" />
          </Link>
        </div>


      </div>
    </header>
  );
};

export default Header;

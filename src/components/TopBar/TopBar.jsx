import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function TopBar() {
  const { count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-16 max-w-6xl mx-auto">

        {/* Left — Catalog */}
        <div className="flex-1 flex items-center">
          <Link
            to="/catalog"
            className="text-xs font-semibold tracking-widest uppercase px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-800 no-underline"
          >
            Catalog
          </Link>
        </div>

        {/* Center — Logo */}
        <div className="flex-1 flex items-center justify-center">
          <Link
            to="/"
            className="text-xl font-bold tracking-widest uppercase text-gray-900 no-underline"
          >
            Tachles
          </Link>
        </div>

        {/* Right — Icons */}
        <div className="flex-1 flex items-center justify-end gap-1">
          <button
            onClick={() => navigate('/catalog')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer border-none bg-transparent"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer border-none bg-transparent"
            aria-label="Cart"
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-gray-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer border-none bg-transparent"
            aria-label="Profile"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <UserIcon />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

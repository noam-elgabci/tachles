import { useNavigate } from 'react-router-dom';

const SuccessIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
      <SuccessIcon />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-3">Order Placed!</h1>
      <p className="text-gray-500 text-base max-w-sm mb-2">
        Thank you for your purchase. We&apos;re processing your order and will notify you when it ships.
      </p>
      <p className="text-sm text-gray-400 mb-10">
        A confirmation will be sent to your email.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/profile?tab=orders')}
          className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition-colors cursor-pointer border-none"
        >
          View My Orders
        </button>
        <button
          onClick={() => navigate('/catalog')}
          className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors cursor-pointer bg-white"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

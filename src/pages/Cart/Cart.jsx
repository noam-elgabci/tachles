import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import CartItem from '../../components/CartItem/CartItem';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';

const EmptyCartIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function Cart() {
  const { items, total, clearCart } = useCart();
  const { addReservation } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCheckoutSuccess = ({ paymentLabel, addressLabel }) => {
    const reservation = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      items: items.map(({ product, qty }) => ({
        productId: product.id,
        name: product.name,
        qty,
        price: product.price,
      })),
      total,
      address: addressLabel,
      payment: paymentLabel,
    };

    addReservation(reservation);
    clearCart();
    setShowModal(false);
    navigate('/success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <EmptyCartIcon />
        <h2 className="text-xl font-bold text-gray-900 mt-5 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-8">Add some comics or clothes to get started.</p>
        <button
          onClick={() => navigate('/catalog')}
          className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition-colors cursor-pointer border-none"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  const shipping = total >= 50 ? 0 : 4.99;
  const orderTotal = total + shipping;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-3 gap-10">
        {/* Items List */}
        <div className="col-span-2">
          <div>
            {items.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border border-gray-200 rounded-xl p-5 sticky top-24">
            <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">Free shipping on orders over $50</p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-5 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition-colors cursor-pointer border-none"
            >
              Proceed to Payment
            </button>

            <button
              onClick={() => navigate('/catalog')}
              className="mt-3 w-full py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <CheckoutModal
          onClose={() => setShowModal(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  );
}

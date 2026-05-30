import { useCart } from '../../hooks/useCart';

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
  const { product, qty } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      {/* Image */}
      <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          {product.category}
        </span>
        <p className="text-sm font-semibold text-gray-900 leading-snug mt-0.5 truncate">
          {product.name}
        </p>
        <p className="text-sm text-gray-500 mt-0.5">
          ${product.price.toFixed(2)} each
        </p>
      </div>

      {/* Qty Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(product.id, qty - 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors text-lg leading-none cursor-pointer bg-white"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
        <button
          onClick={() => updateQty(product.id, qty + 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors text-lg leading-none cursor-pointer bg-white"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="w-20 text-right">
        <p className="text-sm font-bold text-gray-900">
          ${(product.price * qty).toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(product.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer border-none bg-transparent"
        aria-label="Remove item"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

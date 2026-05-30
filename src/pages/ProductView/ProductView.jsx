import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../mocks/products';
import { useCart } from '../../hooks/useCart';

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <button
          onClick={() => navigate('/catalog')}
          className="mt-4 text-sm text-gray-900 underline cursor-pointer border-none bg-transparent"
        >
          Back to catalog
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8 cursor-pointer border-none bg-transparent"
      >
        <BackIcon />
        Back
      </button>

      <div className="grid grid-cols-2 gap-12">
        {/* Images */}
        <div>
          {/* Main Image */}
          <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-3">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 bg-gray-100 rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${
                    selectedImage === idx ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-xs text-gray-500 rounded-md capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-md text-sm font-semibold border transition-colors cursor-pointer ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-auto px-6 py-3.5 rounded-md font-semibold text-sm transition-all cursor-pointer border-none ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="mt-3 px-6 py-3 rounded-md font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

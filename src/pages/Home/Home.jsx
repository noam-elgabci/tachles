import { useNavigate } from 'react-router-dom';
import { products } from '../../mocks/products';
import ProductCard from '../../components/ProductCard/ProductCard';

const featured = products.slice(0, 3);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            Comics · Clothes · Culture
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Wear the Story.
            <br />
            Own the Legend.
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
            Rare comics and graphic-design apparel for collectors and style-seekers alike.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/catalog')}
              className="px-7 py-3 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition-colors cursor-pointer border-none"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/catalog?category=comics')}
              className="px-7 py-3 border border-gray-300 text-gray-800 text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors cursor-pointer bg-white"
            >
              Browse Comics
            </button>
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/catalog?category=comics')}
            className="relative h-48 bg-gray-100 rounded-xl overflow-hidden group cursor-pointer border-none text-left"
          >
            <div className="absolute inset-0 bg-gray-900/60 flex flex-col items-start justify-end p-6 group-hover:bg-gray-900/70 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-1">
                Collection
              </p>
              <p className="text-2xl font-bold text-white">Comics</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/catalog?category=clothes')}
            className="relative h-48 bg-gray-200 rounded-xl overflow-hidden group cursor-pointer border-none text-left"
          >
            <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-start justify-end p-6 group-hover:bg-gray-900/60 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-1">
                Collection
              </p>
              <p className="text-2xl font-bold text-white">Apparel</p>
            </div>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured</h2>
          <button
            onClick={() => navigate('/catalog')}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer border-none bg-transparent underline"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

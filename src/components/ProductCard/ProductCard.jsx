import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/catalog/${product.id}`)}
      className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all bg-white group"
    >
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          {product.category}
        </span>
        <h3 className="mt-1 text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-2 text-base font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}

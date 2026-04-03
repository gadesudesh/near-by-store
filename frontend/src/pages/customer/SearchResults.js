import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FiSearch, FiNavigation, FiArrowLeft, FiFilter, FiShoppingBag } from 'react-icons/fi';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { location } = useAuth();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('price');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      searchProducts(q);
    }
  }, [searchParams, location, sort]);

  const searchProducts = async (q) => {
    try {
      setLoading(true);
      const params = { q, sort };
      if (location) {
        params.lat = location.lat;
        params.lng = location.lng;
        params.radius = 50;
      }
      const res = await API.get('/products/search', { params });
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/customer/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/customer/dashboard')}
        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-4 transition-colors"
      >
        <FiArrowLeft size={18} /> Back to Dashboard
      </button>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-12 py-3.5"
            placeholder="Search products..."
          />
        </div>
        <button type="submit" className="btn-primary px-6">Search</button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary px-4"
        >
          <FiFilter size={18} />
        </button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="card p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field py-2 px-3 text-sm w-auto"
            >
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="distance">Distance: Nearest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          {loading ? 'Searching...' : `${products.length} results for "${searchParams.get('q')}"`}
        </h2>
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner text="Searching nearby shops..." />
      ) : products.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try a different search term or increase the search area</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary-200"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiShoppingBag className="text-gray-400" size={24} />
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <h3 className="font-bold text-gray-900 text-lg">{product.productName}</h3>
                  {product.brand && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                      {product.brand}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{product.description}</p>

                {product.shop && (
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/customer/shop/${product.shop._id}`);
                      }}
                      className="text-sm text-primary-600 font-medium hover:underline cursor-pointer"
                    >
                      🏪 {product.shop.shopName}
                    </span>
                    <span className="text-sm text-gray-400">{product.shop.address}</span>
                    {product.distance !== undefined && (
                      <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                        <FiNavigation size={12} />
                        {product.distance} km
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400">per {product.unit}</p>
                <span
                  className={`inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full ${
                    product.stock > 0
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-600'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import MapView from '../../components/MapView';
import StarRating from '../../components/StarRating';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiMapPin, FiPhone, FiStar, FiShoppingBag } from 'react-icons/fi';

const ShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { location } = useAuth();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    fetchShopData();
  }, [id]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const [shopRes, productsRes, reviewsRes] = await Promise.all([
        API.get(`/shops/${id}`),
        API.get(`/products/shop/${id}`),
        API.get(`/reviews/shop/${id}`),
      ]);
      setShop(shopRes.data.shop);
      setProducts(productsRes.data.products);
      setReviews(reviewsRes.data.reviews);
    } catch (error) {
      toast.error('Failed to load shop details');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/reviews', { shopId: id, ...reviewForm });
      toast.success('Review submitted!');
      setReviewForm({ rating: 5, comment: '' });
      fetchShopData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading shop details..." />;
  if (!shop) return <div className="text-center py-20 text-gray-500">Shop not found</div>;

  const shopLocation = {
    lat: shop.location.coordinates[1],
    lng: shop.location.coordinates[0],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 transition-colors">
        <FiArrowLeft size={18} /> Back
      </button>

      {/* Shop header */}
      <div className="card p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
            {shop.category === 'grocery' ? '🛒' : shop.category === 'bakery' ? '🍰' : shop.category === 'electronics' ? '📱' : '🏪'}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{shop.shopName}</h1>
            <p className="text-gray-500 mb-3">{shop.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1"><FiMapPin size={14} className="text-primary-600" /> {shop.address}</span>
              {shop.phone && <span className="flex items-center gap-1"><FiPhone size={14} className="text-primary-600" /> {shop.phone}</span>}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <StarRating rating={shop.averageRating || 0} count={shop.reviewCount} />
              <span className="capitalize text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">{shop.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mb-6">
        <MapView
          center={shopLocation}
          shops={[shop]}
          userLocation={location}
          height="250px"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        {[
          { key: 'products', label: 'Products', icon: FiShoppingBag },
          { key: 'reviews', label: `Reviews (${reviews.length})`, icon: FiStar },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Products tab */}
      {activeTab === 'products' && (
        <div>
          {products.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">No products listed yet</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product._id} className="card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{product.productName}</h3>
                    <span className="text-lg font-bold text-primary-600">₹{product.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="capitalize bg-gray-100 px-2 py-1 rounded-full text-gray-500">{product.category}</span>
                    <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {product.stock > 0 ? `${product.stock} ${product.unit}` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews tab */}
      {activeTab === 'reviews' && (
        <div>
          {/* Review form */}
          <div className="card p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className={`text-2xl transition-transform hover:scale-110 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Comment</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="input-field h-24 resize-none"
                  placeholder="Share your experience..."
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          {/* Review list */}
          {reviews.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">No reviews yet. Be the first!</div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-sm font-bold text-primary-600">
                        {review.user?.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{review.user?.name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={14} showNumber={false} />
                  </div>
                  {review.comment && <p className="text-gray-600 text-sm mt-2">{review.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopDetail;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import {
  FiUsers, FiShoppingBag, FiCheckCircle, FiXCircle,
  FiClock, FiSearch, FiTrash2, FiEye, FiRefreshCw
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [search, setSearch] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filter, search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, shopsRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get(`/admin/shops?status=${filter}&search=${search}`)
      ]);
      setStats(statsRes.data.stats);
      setShops(shopsRes.data.shops);
    } catch (err) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (shopId) => {
    setActionLoading(true);
    try {
      const res = await API.put(`/admin/shops/${shopId}/verify`);
      toast.success(res.data.message);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error('Please provide a reason');
      return;
    }
    setActionLoading(true);
    try {
      const res = await API.put(`/admin/shops/${selectedShop._id}/reject`, {
        reason: rejectReason
      });
      toast.success(res.data.message);
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedShop(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Rejection failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (shopId, shopName) => {
    if (!window.confirm(`Delete "${shopName}" and ALL its products/reviews? This cannot be undone!`)) return;
    try {
      const res = await API.delete(`/admin/shops/${shopId}`);
      toast.success(res.data.message);
      fetchData();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleReset = async (shopId) => {
    try {
      const res = await API.put(`/admin/shops/${shopId}/reset`);
      toast.success(res.data.message);
      fetchData();
    } catch (err) {
      toast.error('Reset failed');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      verified: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200'
    };
    const icons = {
      pending: <FiClock size={12} />,
      verified: <FiCheckCircle size={12} />,
      rejected: <FiXCircle size={12} />
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badges[status]}`}>
        {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading && !stats) return <LoadingSpinner text="Loading admin dashboard..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome, {user?.name}. Manage shop verifications.</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: 'bg-blue-50 text-blue-600' },
            { label: 'Total Shops', value: stats.totalShops, icon: FiShoppingBag, color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Pending Verification', value: stats.pendingShops, icon: FiClock, color: 'bg-yellow-50 text-yellow-600' },
            { label: 'Verified Shops', value: stats.verifiedShops, icon: FiCheckCircle, color: 'bg-green-50 text-green-600' },
          ].map((s, i) => (
            <div key={i} className="card p-5">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                <s.icon size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { key: 'pending', label: `⏳ Pending (${stats?.pendingShops || 0})` },
            { key: 'verified', label: `✅ Verified (${stats?.verifiedShops || 0})` },
            { key: 'rejected', label: `❌ Rejected (${stats?.rejectedShops || 0})` },
            { key: 'all', label: '📋 All' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === f.key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shop name..."
            className="input-field pl-9 py-2 text-sm w-64"
          />
        </div>
      </div>

      {/* Shops List */}
      {loading ? (
        <LoadingSpinner />
      ) : shops.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No shops found</h3>
          <p className="text-gray-500">No shops match your current filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {shops.map((shop) => (
            <div key={shop._id} className="card p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Shop Image + Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {shop.image ? (
                    <img src={shop.image} alt={shop.shopName} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏪</div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">{shop.shopName}</h3>
                      {getStatusBadge(shop.verificationStatus)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{shop.address}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span>👤 {shop.owner?.name || 'Unknown'}</span>
                      <span>📧 {shop.owner?.email}</span>
                      <span>📞 {shop.phone || shop.owner?.phone || 'N/A'}</span>
                      <span className="capitalize">📁 {shop.category?.replace('_', ' ')}</span>
                    </div>

                    {/* Verification Documents */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {shop.gstNumber && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">
                          GST: {shop.gstNumber}
                        </span>
                      )}
                      {shop.panNumber && (
                        <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-medium">
                          PAN: {shop.panNumber}
                        </span>
                      )}
                      {shop.shopLicense && (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded font-medium">
                          License: {shop.shopLicense}
                        </span>
                      )}
                      {!shop.gstNumber && !shop.panNumber && !shop.shopLicense && (
                        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded font-medium">
                          ⚠️ No documents provided
                        </span>
                      )}
                    </div>

                    {/* Rejection reason */}
                    {shop.verificationStatus === 'rejected' && shop.rejectionReason && (
                      <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-100">
                        <p className="text-xs text-red-600">
                          <strong>Rejection reason:</strong> {shop.rejectionReason}
                        </p>
                      </div>
                    )}

                    {/* Verified info */}
                    {shop.verificationStatus === 'verified' && shop.verifiedAt && (
                      <p className="text-xs text-green-600 mt-1">
                        ✅ Verified by {shop.verifiedBy?.name || 'Admin'} on{' '}
                        {new Date(shop.verifiedAt).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {shop.verificationStatus === 'pending' && (
                    <>
                      <button
                        onClick={() => handleVerify(shop._id)}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
                      >
                        <FiCheckCircle size={14} /> Verify
                      </button>
                      <button
                        onClick={() => { setSelectedShop(shop); setShowRejectModal(true); }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <FiXCircle size={14} /> Reject
                      </button>
                    </>
                  )}

                  {shop.verificationStatus === 'verified' && (
                    <button
                      onClick={() => handleReset(shop._id)}
                      className="px-3 py-2 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-lg border border-yellow-200 hover:bg-yellow-100 flex items-center gap-1"
                    >
                      <FiRefreshCw size={12} /> Revoke
                    </button>
                  )}

                  {shop.verificationStatus === 'rejected' && (
                    <button
                      onClick={() => handleReset(shop._id)}
                      className="px-3 py-2 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 flex items-center gap-1"
                    >
                      <FiRefreshCw size={12} /> Re-review
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(shop._id, shop.shopName)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete shop"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedShop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Reject Shop</h2>
              <p className="text-sm text-gray-500 mt-1">
                Rejecting: <strong>{selectedShop.shopName}</strong>
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="input-field h-28 resize-none"
                  placeholder="e.g. Invalid GST number, fake address, duplicate shop..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowRejectModal(false); setRejectReason(''); setSelectedShop(null); }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading || !rejectReason.trim()}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl disabled:opacity-50"
                >
                  {actionLoading ? 'Rejecting...' : 'Reject Shop'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
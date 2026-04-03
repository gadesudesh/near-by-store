import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { RetailerSidebar } from './RetailerDashboard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiMenu } from 'react-icons/fi';

const CATEGORIES = [
  'refrigerators', 'washing_machines', 'air_conditioners', 'microwave_ovens',
  'water_purifiers', 'kitchen_appliances', 'vacuum_cleaners', 'water_heaters',
  'electric_fans', 'cooktops_stoves', 'televisions',
  'computer_hardware', 'hand_tools', 'power_tools', 'locks_security',
  'pipes_fittings', 'electrical_hardware', 'paint_coatings', 'fasteners',
  'smartphones', 'tablets', 'smartwatches', 'chargers_powerbanks',
  'laptops', 'desktops', 'computer_accessories', 'printers',
  'led_lcd_tvs', 'sound_systems', 'projectors',
  'headphones_earbuds', 'speakers', 'cameras', 'drones_action_cameras',
  'routers_modems', 'smart_home_devices',
  'trimmers_shavers', 'hair_dryers', 'electric_toothbrushes',
  'cricket', 'football', 'badminton', 'tennis', 'table_tennis',
  'hockey', 'athletics_running', 'gym_workout', 'swimming',
  'cycling', 'indoor_games', 'yoga_fitness',
  'watches', 'sunglasses', 'wallets_belts', 'jewelry',
  'backpacks_bags', 'luggage', 'travel_accessories',
  'phone_cases', 'cables_adapters',
  'haircare_accessories', 'deodorants_perfumes',
  'pens_notebooks', 'water_bottles_flasks', 'eyewear',
  'fitness_bands', 'gym_bags_gloves', 'yoga_mats',
  'fruits', 'vegetables', 'dairy', 'bakery', 'beverages', 'snacks',
  'electronics', 'clothing', 'household', 'personal_care', 'medicine',
  'stationery', 'other'
];
const UNITS = ['piece', 'kg', 'g', 'l', 'ml', 'dozen', 'pack'];

const RetailerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    productName: '', description: '', category: 'other',
    price: '', stock: '', unit: 'piece'
  });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/products/my-products');
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ productName: '', description: '', category: 'other', price: '', stock: '', unit: 'piece' });
    setEditingProduct(null);
  };

  const openAdd = () => { resetForm(); setShowModal(true); };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      productName: product.productName,
      description: product.description || '',
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, data);
        toast.success('Product updated!');
      } else {
        await API.post('/products', data);
        toast.success('Product added!');
      }
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <RetailerSidebar active="products" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg">
          <FiMenu size={20} />
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-500 text-sm">{products.length} products listed</p>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2">
            <FiPlus size={18} /> Add Product
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-4">Add your first product to start selling</p>
            <button onClick={openAdd} className="btn-primary inline-flex items-center gap-2">
              <FiPlus size={18} /> Add Product
            </button>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50/50">
                      <td className="py-4 px-5">
                        <p className="font-semibold text-gray-900">{product.productName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{product.description?.substring(0, 50)}</p>
                      </td>
                      <td className="py-4 px-5">
                        <span className="capitalize text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600">{product.category.replace('_', ' ')}</span>
                      </td>
                      <td className="py-4 px-5 text-right font-semibold text-gray-900">₹{product.price}/{product.unit}</td>
                      <td className="py-4 px-5 text-right">
                        <span className={`font-medium ${product.stock < 5 ? 'text-red-500' : product.stock < 20 ? 'text-orange-500' : 'text-green-600'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right text-sm text-gray-500">{product.analytics?.views || 0}</td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(product)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                            <FiEdit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => { setShowModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FiX size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                  <input type="text" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} className="input-field" required placeholder="e.g. Organic Apples" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field h-20 resize-none" placeholder="Describe your product..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c.replace('_', ' ').charAt(0).toUpperCase() + c.replace('_', ' ').slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                    <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="input-field">
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                    <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" required placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                    <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" required placeholder="0" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="flex-1 btn-secondary">Cancel</button>
                  <button type="submit" className="flex-1 btn-primary">{editingProduct ? 'Update' : 'Add'} Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RetailerProducts;
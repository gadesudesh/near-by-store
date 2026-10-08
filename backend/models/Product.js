const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  productName: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, maxlength: 500, default: '' },
  category: {
    type: String,
    enum: ['fruits', 'vegetables', 'dairy', 'beverages', 'snacks', 'medicines', 'electronics', 'clothing', 'stationery', 'household', 'other'],
    default: 'other'
  },
  brand: { type: String, default: '', maxlength: 50 },
  image: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, default: 0, min: 0 },
  unit: {
    type: String,
    enum: ['piece', 'kg', 'g', 'litre', 'ml', 'pack', 'dozen', 'box'],
    default: 'piece'
  },
  isAvailable: { type: Boolean, default: true },
  // Analytics
  analytics: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
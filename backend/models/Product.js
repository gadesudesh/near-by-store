const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  productName: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, maxlength: 500, default: '' },
  category: {
    type: String, required: true,
    enum: ['fruits', 'vegetables', 'dairy', 'bakery', 'beverages', 'snacks', 'electronics', 'clothing', 'household', 'personal_care', 'medicine', 'stationery', 'other'],
    default: 'other'
  },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  unit: { type: String, default: 'piece', enum: ['piece', 'kg', 'g', 'l', 'ml', 'dozen', 'pack'] },
  isAvailable: { type: Boolean, default: true },
  analytics: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  }
}, { timestamps: true });

productSchema.index({ productName: 'text', category: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
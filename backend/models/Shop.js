const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopName: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, maxlength: 500, default: '' },
  address: { type: String, required: true },
  phone: { type: String, default: '' },
  category: {
    type: String,
    enum: ['grocery', 'electronics', 'clothing', 'pharmacy', 'bakery', 'restaurant', 'hardware', 'stationery', 'general', 'other'],
    default: 'general'
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true, index: '2dsphere' }
  },
  isActive: { type: Boolean, default: true },
  analytics: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

shopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Shop', shopSchema);
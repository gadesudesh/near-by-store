const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  shopName: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, maxlength: 500, default: '' },
  address: { type: String, required: true },
  phone: { type: String },
  category: {
    type: String,
    enum: ['grocery', 'pharmacy', 'electronics', 'clothing', 'food', 'hardware', 'stationary', 'other'],
    default: 'other'
  },
  image: { type: String, default: '' },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  // Verification
  gstNumber: { type: String, default: '' },
  panNumber: { type: String, default: '' },
  shopLicense: { type: String, default: '' },
  ownerIdProof: { type: String, default: '' },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  verifiedAt: { type: Date, default: null },
  rejectionReason: { type: String, default: '' },
  // Analytics
  analytics: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  }
}, { timestamps: true });

shopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Shop', shopSchema);
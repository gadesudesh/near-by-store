const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin only
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalRetailers = await User.countDocuments({ role: 'retailer' });
    const totalShops = await Shop.countDocuments();
    const pendingShops = await Shop.countDocuments({ verificationStatus: 'pending' });
    const verifiedShops = await Shop.countDocuments({ verificationStatus: 'verified' });
    const rejectedShops = await Shop.countDocuments({ verificationStatus: 'rejected' });
    const totalProducts = await Product.countDocuments();
    const totalReviews = await Review.countDocuments();

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalCustomers,
        totalRetailers,
        totalShops,
        pendingShops,
        verifiedShops,
        rejectedShops,
        totalProducts,
        totalReviews
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all shops (with filters for admin)
// @route   GET /api/admin/shops?status=pending
// @access  Admin only
exports.getAllShopsAdmin = async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = {};

    // Filter by verification status
    if (status && status !== 'all') {
      filter.verificationStatus = status;
    }

    // Search by shop name or owner name
    if (search) {
      filter.$or = [
        { shopName: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { gstNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const shops = await Shop.find(filter)
      .populate('owner', 'name email phone')
      .populate('verifiedBy', 'name')
      .sort('-createdAt');

    res.json({
      success: true,
      count: shops.length,
      shops
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single shop details for admin review
// @route   GET /api/admin/shops/:id
// @access  Admin only
exports.getShopDetailAdmin = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
      .populate('owner', 'name email phone createdAt')
      .populate('verifiedBy', 'name');

    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    // Get product count for this shop
    const productCount = await Product.countDocuments({ shop: shop._id });
    const reviewCount = await Review.countDocuments({ shop: shop._id });

    res.json({
      success: true,
      shop: {
        ...shop.toObject(),
        productCount,
        reviewCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify (approve) a shop
// @route   PUT /api/admin/shops/:id/verify
// @access  Admin only
exports.verifyShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    shop.verificationStatus = 'verified';
    shop.verifiedBy = req.user.id;
    shop.verifiedAt = new Date();
    shop.rejectionReason = '';
    shop.isActive = true;

    await shop.save();

    const updatedShop = await Shop.findById(shop._id)
      .populate('owner', 'name email phone')
      .populate('verifiedBy', 'name');

    res.json({
      success: true,
      message: `Shop "${shop.shopName}" has been verified successfully`,
      shop: updatedShop
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reject a shop
// @route   PUT /api/admin/shops/:id/reject
// @access  Admin only
exports.rejectShop = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a reason for rejection'
      });
    }

    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    shop.verificationStatus = 'rejected';
    shop.verifiedBy = req.user.id;
    shop.verifiedAt = new Date();
    shop.rejectionReason = reason;
    shop.isActive = false;

    await shop.save();

    const updatedShop = await Shop.findById(shop._id)
      .populate('owner', 'name email phone')
      .populate('verifiedBy', 'name');

    res.json({
      success: true,
      message: `Shop "${shop.shopName}" has been rejected`,
      shop: updatedShop
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset shop back to pending
// @route   PUT /api/admin/shops/:id/reset
// @access  Admin only
exports.resetShopStatus = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    shop.verificationStatus = 'pending';
    shop.verifiedBy = null;
    shop.verifiedAt = null;
    shop.rejectionReason = '';

    await shop.save();

    res.json({
      success: true,
      message: `Shop "${shop.shopName}" status reset to pending`,
      shop
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
// @access  Admin only
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a shop (admin)
// @route   DELETE /api/admin/shops/:id
// @access  Admin only
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    // Delete all products of this shop
    await Product.deleteMany({ shop: shop._id });
    // Delete all reviews of this shop
    await Review.deleteMany({ shop: shop._id });
    // Delete the shop
    await Shop.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: `Shop "${shop.shopName}" and all its products/reviews have been deleted`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
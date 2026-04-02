const Product = require('../models/Product');
const Shop = require('../models/Shop');

exports.addProduct = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.status(404).json({ success: false, message: 'Create a shop first' });
    const product = await Product.create({ ...req.body, shop: shop._id });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate('shop');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.shop.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('shop');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.shop.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getShopProducts = async (req, res) => {
  try {
    const products = await Product.find({ shop: req.params.shopId });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found', products: [] });
    const products = await Product.find({ shop: shop._id }).sort('-createdAt');
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { q, lat, lng, radius = 10, sort = 'price', category, minPrice, maxPrice } = req.query;
    if (!q) return res.status(400).json({ success: false, message: 'Search query required' });

    const productFilter = {
      isAvailable: true,
      $or: [
        { productName: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    };
    if (category) productFilter.category = category;
    if (minPrice || maxPrice) {
      productFilter.price = {};
      if (minPrice) productFilter.price.$gte = parseFloat(minPrice);
      if (maxPrice) productFilter.price.$lte = parseFloat(maxPrice);
    }

    if (lat && lng) {
      const nearbyShops = await Shop.find({
        isActive: true,
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseFloat(radius) * 1000
          }
        }
      });
      productFilter.shop = { $in: nearbyShops.map(s => s._id) };
    }

    let sortOption = {};
    if (sort === 'price') sortOption = { price: 1 };
    else if (sort === '-price') sortOption = { price: -1 };
    else if (sort === 'name') sortOption = { productName: 1 };
    else sortOption = { price: 1 };

    const products = await Product.find(productFilter)
      .populate({ path: 'shop', select: 'shopName address location category owner', populate: { path: 'owner', select: 'name' } })
      .sort(sortOption);

    const results = products.map(product => {
      const prod = product.toObject();
      if (lat && lng && prod.shop && prod.shop.location) {
        prod.distance = parseFloat(getDistance(
          parseFloat(lat), parseFloat(lng),
          prod.shop.location.coordinates[1], prod.shop.location.coordinates[0]
        ).toFixed(2));
      }
      return prod;
    });

    if (sort === 'distance') results.sort((a, b) => (a.distance || 999) - (b.distance || 999));

    res.json({ success: true, count: results.length, products: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('shop');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    product.analytics.views += 1;
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });
    const products = await Product.find({ shop: shop._id });
    const Review = require('../models/Review');
    const reviews = await Review.find({ shop: shop._id });
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const totalViews = products.reduce((sum, p) => sum + p.analytics.views, 0) + shop.analytics.views;
    const totalClicks = products.reduce((sum, p) => sum + p.analytics.clicks, 0) + shop.analytics.clicks;
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
    const lowStockProducts = products.filter(p => p.stock < 5);
    const categories = {};
    products.forEach(p => { categories[p.category] = (categories[p.category] || 0) + 1; });

    res.json({
      success: true,
      analytics: {
        totalProducts, totalStock, totalViews, totalClicks,
        averageRating: parseFloat(avgRating), reviewCount: reviews.length,
        lowStockProducts: lowStockProducts.length, lowStockItems: lowStockProducts,
        categoryBreakdown: categories, shopViews: shop.analytics.views, shopClicks: shop.analytics.clicks
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
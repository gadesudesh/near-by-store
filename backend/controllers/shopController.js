const Shop = require('../models/Shop');
const Review = require('../models/Review');

exports.createShop = async (req, res) => {
  try {
    const { shopName, description, address, phone, category, latitude, longitude } = req.body;
    const existingShop = await Shop.findOne({ owner: req.user.id });
    if (existingShop) {
      return res.status(400).json({ success: false, message: 'You already have a shop' });
    }
    const shop = await Shop.create({
      owner: req.user.id, shopName, description, address, phone, category,
      location: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] }
    });
    res.status(201).json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });
    res.json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateShop = async (req, res) => {
  try {
    let shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });
    if (shop.owner.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const { latitude, longitude, ...rest } = req.body;
    const updateData = { ...rest };
    if (latitude && longitude) {
      updateData.location = { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] };
    }
    shop = await Shop.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNearbyShops = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Provide latitude and longitude' });
    }
    const shops = await Shop.find({
      isActive: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) * 1000
        }
      }
    }).populate('owner', 'name email phone');

    const shopsWithRating = await Promise.all(
      shops.map(async (shop) => {
        const reviews = await Review.find({ shop: shop._id });
        const avgRating = reviews.length > 0
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
        const distance = getDistance(parseFloat(lat), parseFloat(lng),
          shop.location.coordinates[1], shop.location.coordinates[0]);
        return {
          ...shop.toObject(), averageRating: parseFloat(avgRating),
          reviewCount: reviews.length, distance: parseFloat(distance.toFixed(2))
        };
      })
    );
    res.json({ success: true, count: shopsWithRating.length, shops: shopsWithRating });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('owner', 'name email phone');
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });
    shop.analytics.views += 1;
    await shop.save();
    const reviews = await Review.find({ shop: shop._id }).populate('user', 'name');
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
    res.json({
      success: true,
      shop: { ...shop.toObject(), averageRating: parseFloat(avgRating), reviewCount: reviews.length, reviews }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find({ isActive: true }).populate('owner', 'name');
    res.json({ success: true, count: shops.length, shops });
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
// const express = require('express');
// const router = express.Router();
// const { createShop, getMyShop, updateShop, getNearbyShops, getShopById, getAllShops } = require('../controllers/shopController');
// const { protect, authorize } = require('../middleware/auth');

// router.get('/nearby', getNearbyShops);
// router.get('/all', getAllShops);
// router.get('/my-shop', protect, authorize('retailer'), getMyShop);
// router.post('/', protect, authorize('retailer'), createShop);
// router.put('/:id', protect, authorize('retailer'), updateShop);
// router.get('/:id', getShopById);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createShop, getMyShop, updateShop, getNearbyShops,
  getShopById, getAllShops, searchShops
} = require('../controllers/shopController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/search', searchShops);       // NEW — search by shop name
router.get('/nearby', getNearbyShops);
router.get('/all', getAllShops);

// Retailer routes
router.get('/my-shop', protect, authorize('retailer'), getMyShop);
router.post('/', protect, authorize('retailer'), createShop);
router.put('/:id', protect, authorize('retailer'), updateShop);

// Public — single shop
router.get('/:id', getShopById);

module.exports = router;
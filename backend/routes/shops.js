const express = require('express');
const router = express.Router();
const { createShop, getMyShop, updateShop, getNearbyShops, getShopById, getAllShops } = require('../controllers/shopController');
const { protect, authorize } = require('../middleware/auth');

router.get('/nearby', getNearbyShops);
router.get('/all', getAllShops);
router.get('/my-shop', protect, authorize('retailer'), getMyShop);
router.post('/', protect, authorize('retailer'), createShop);
router.put('/:id', protect, authorize('retailer'), updateShop);
router.get('/:id', getShopById);

module.exports = router;
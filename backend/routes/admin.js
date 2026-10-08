const express = require('express');
const router = express.Router();
const {
  getStats,
  getAllShopsAdmin,
  getShopDetailAdmin,
  verifyShop,
  rejectShop,
  resetShopStatus,
  getAllUsers,
  deleteShop
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// All routes require: logged in + admin role
router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/shops', getAllShopsAdmin);
router.get('/shops/:id', getShopDetailAdmin);
router.put('/shops/:id/verify', verifyShop);
router.put('/shops/:id/reject', rejectShop);
router.put('/shops/:id/reset', resetShopStatus);
router.delete('/shops/:id', deleteShop);
router.get('/users', getAllUsers);

module.exports = router;
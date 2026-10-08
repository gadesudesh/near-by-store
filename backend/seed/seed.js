const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Review = require('../models/Review');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // Clear all
    await User.deleteMany({});
    await Shop.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('🗑️ Cleared old data');

    // ===================== ADMIN =====================
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@nearbystore.com',
      password: 'admin123',
      role: 'admin',
      phone: '9999999999'
    });
    console.log('✅ Admin: admin@nearbystore.com / admin123');

    // ===================== CUSTOMERS =====================
    const customers = await User.create([
      { name: 'Rahul Sharma', email: 'rahul@example.com', password: 'password123', role: 'customer', phone: '9876543210' },
      { name: 'Priya Patel', email: 'priya@example.com', password: 'password123', role: 'customer', phone: '9876543211' },
      { name: 'Amit Kumar', email: 'amit@example.com', password: 'password123', role: 'customer', phone: '9876543212' }
    ]);
    console.log('✅ 3 Customers created');
    // ===================== ADMIN =====================
const admin = await User.create({
  name: 'Admin',
  email: 'admin@nearbystore.com',
  password: 'admin123',
  role: 'admin',
  phone: '9999999999'
});
console.log('✅ Admin created: admin@nearbystore.com / admin123');

    // ===================== RETAILERS =====================
    const retailers = await User.create([
      { name: 'Ramesh Bajaj', email: 'ramesh.bajaj@example.com', password: 'password123', role: 'retailer', phone: '9800000001' },
      { name: 'Sunita Electronics', email: 'sunita@example.com', password: 'password123', role: 'retailer', phone: '9800000002' },
      { name: 'Vijay Sports', email: 'vijay@example.com', password: 'password123', role: 'retailer', phone: '9800000003' },
      { name: 'Meena Groceries', email: 'meena@example.com', password: 'password123', role: 'retailer', phone: '9800000004' },
      { name: 'Raj Hardware', email: 'raj.hardware@example.com', password: 'password123', role: 'retailer', phone: '9800000005' },
      { name: 'Pooja Cosmetics', email: 'pooja@example.com', password: 'password123', role: 'retailer', phone: '9800000006' },
      { name: 'Kiran Stationery', email: 'kiran@example.com', password: 'password123', role: 'retailer', phone: '9800000007' },
      { name: 'Deepak Fitness', email: 'deepak@example.com', password: 'password123', role: 'retailer', phone: '9800000008' }
    ]);
    console.log('✅ 8 Retailers created');

    // ===================== SHOPS (MUMBAI LOCATIONS) =====================
    // Central Mumbai: ~19.076, 72.8777
    const shops = await Shop.create([
      {
        owner: retailers[0]._id,
        shopName: 'Bajaj Home Appliances',
        description: 'Best home appliances at affordable prices. ACs, washing machines, refrigerators.',
        address: 'Shop 12, Linking Road, Bandra West, Mumbai 400050',
        phone: '9800000001',
        category: 'home_appliances',
        image: '',
        gstNumber: '27AABCB1234A1Z5',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.8296, 19.0596] }  // Bandra
      },
      {
        owner: retailers[1]._id,
        shopName: 'Sunita Electronics Hub',
        description: 'Latest mobiles, laptops, tablets, and accessories. Samsung, Apple, OnePlus.',
        address: 'Heera Panna, Haji Ali, Mumbai 400026',
        phone: '9800000002',
        category: 'electronics',
        image: '',
        gstNumber: '27AABCS5678B2Z3',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.8128, 18.9862] }  // Haji Ali
      },
      {
        owner: retailers[2]._id,
        shopName: 'Vijay Sports Arena',
        description: 'Cricket bats, footballs, gym equipment, sports shoes. Nike, Adidas, Puma.',
        address: 'MG Road, Fort, Mumbai 400001',
        phone: '9800000003',
        category: 'sports',
        image: '',
        gstNumber: '27AABCV9012C3Z1',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.8347, 18.9322] }  // Fort
      },
      {
        owner: retailers[3]._id,
        shopName: 'Meena Fresh Groceries',
        description: 'Daily fresh vegetables, fruits, dairy, and groceries. Free delivery above ₹500.',
        address: 'Dadar West Market, Mumbai 400028',
        phone: '9800000004',
        category: 'grocery',
        image: '',
        gstNumber: '27AABCM3456D4Z9',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.8432, 19.0178] }  // Dadar
      },
      {
        owner: retailers[4]._id,
        shopName: 'Raj Hardware & Tools',
        description: 'Complete hardware shop. Paints, pipes, electrical, plumbing, power tools.',
        address: 'Andheri East, MIDC Road, Mumbai 400093',
        phone: '9800000005',
        category: 'hardware',
        image: '',
        gstNumber: '27AABCR7890E5Z7',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.8697, 19.1136] }  // Andheri East
      },
      {
        owner: retailers[5]._id,
        shopName: 'Pooja Beauty & Care',
        description: 'Skincare, haircare, makeup, perfumes. Lakme, Maybelline, LOreal.',
        address: 'Hill Road, Bandra West, Mumbai 400050',
        phone: '9800000006',
        category: 'personal_care',
        image: '',
        gstNumber: '27AABCP2345F6Z5',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.8362, 19.0544] }  // Bandra Hill Road
      },
      {
        owner: retailers[6]._id,
        shopName: 'Kiran Book & Stationery',
        description: 'School supplies, office stationery, art materials, books, notebooks.',
        address: 'Matunga Road, Mumbai 400019',
        phone: '9800000007',
        category: 'stationery',
        image: '',
        gstNumber: '27AABCK6789G7Z3',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.8537, 19.0212] }  // Matunga
      },
      {
        owner: retailers[7]._id,
        shopName: 'Deepak Fitness Zone',
        description: 'Gym equipment, protein supplements, yoga mats, resistance bands.',
        address: 'Powai, Hiranandani Gardens, Mumbai 400076',
        phone: '9800000008',
        category: 'fitness',
        image: '',
        gstNumber: '27AABCD1234H8Z1',
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        isActive: true,
        location: { type: 'Point', coordinates: [72.9052, 19.1176] }  // Powai
      }
    ]);
    console.log('✅ 8 Shops created (Mumbai locations)');

    // ===================== PRODUCTS =====================
    const products = await Product.create([
      // Bajaj Home Appliances (shops[0])
      { shop: shops[0]._id, productName: 'Samsung 1.5 Ton Split AC', description: '5 Star Inverter, Copper Condenser', price: 35999, mrp: 42999, category: 'home_appliances', brand: 'Samsung', stock: 8, image: '' },
      { shop: shops[0]._id, productName: 'LG 8kg Front Load Washing Machine', description: 'Steam Wash, AI Direct Drive', price: 28999, mrp: 34999, category: 'home_appliances', brand: 'LG', stock: 5, image: '' },
      { shop: shops[0]._id, productName: 'Bajaj Room Heater', description: '2000W Convection Heater', price: 2499, mrp: 3299, category: 'home_appliances', brand: 'Bajaj', stock: 20, image: '' },
      { shop: shops[0]._id, productName: 'Philips Mixer Grinder 750W', description: '3 Jars, Turbo Motor', price: 3299, mrp: 4199, category: 'home_appliances', brand: 'Philips', stock: 15, image: '' },
      { shop: shops[0]._id, productName: 'Whirlpool 260L Refrigerator', description: 'Frost Free, 3 Star', price: 22999, mrp: 27999, category: 'home_appliances', brand: 'Whirlpool', stock: 4, image: '' },

      // Sunita Electronics (shops[1])
      { shop: shops[1]._id, productName: 'Samsung Galaxy S24 Ultra', description: '256GB, Titanium Black, AI Features', price: 129999, mrp: 134999, category: 'electronics', brand: 'Samsung', stock: 10, image: '' },
      { shop: shops[1]._id, productName: 'Apple MacBook Air M3', description: '8GB RAM, 256GB SSD, Space Gray', price: 109900, mrp: 114900, category: 'electronics', brand: 'Apple', stock: 5, image: '' },
      { shop: shops[1]._id, productName: 'OnePlus Buds 3', description: 'ANC, 49dB Noise Cancellation', price: 5499, mrp: 5999, category: 'electronics', brand: 'OnePlus', stock: 30, image: '' },
      { shop: shops[1]._id, productName: 'HP Laptop 15s', description: 'Intel i5 12th Gen, 8GB, 512GB SSD', price: 52990, mrp: 58990, category: 'electronics', brand: 'HP', stock: 7, image: '' },
      { shop: shops[1]._id, productName: 'Sony WH-1000XM5 Headphones', description: 'Premium Noise Cancelling', price: 26990, mrp: 34990, category: 'electronics', brand: 'Sony', stock: 12, image: '' },

      // Vijay Sports (shops[2])
      { shop: shops[2]._id, productName: 'MRF Genius Cricket Bat', description: 'English Willow, Match Quality', price: 8999, mrp: 11999, category: 'sports', brand: 'MRF', stock: 10, image: '' },
      { shop: shops[2]._id, productName: 'Nike Air Zoom Pegasus 40', description: 'Running Shoes, Size 6-12', price: 8995, mrp: 11995, category: 'sports', brand: 'Nike', stock: 20, image: '' },
      { shop: shops[2]._id, productName: 'Adidas Brazuca Football', description: 'Official Match Ball Replica', price: 2999, mrp: 3999, category: 'sports', brand: 'Adidas', stock: 15, image: '' },
      { shop: shops[2]._id, productName: 'Yonex Badminton Racket', description: 'Astrox 88D Pro, 4U G5', price: 6999, mrp: 8999, category: 'sports', brand: 'Yonex', stock: 8, image: '' },

      // Meena Groceries (shops[3])
      { shop: shops[3]._id, productName: 'Aashirvaad Atta 10kg', description: 'Whole Wheat Flour, Premium', price: 399, mrp: 450, category: 'grocery', brand: 'Aashirvaad', stock: 50, image: '' },
      { shop: shops[3]._id, productName: 'Amul Butter 500g', description: 'Pasteurized, Salted', price: 265, mrp: 280, category: 'grocery', brand: 'Amul', stock: 40, image: '' },
      { shop: shops[3]._id, productName: 'Tata Gold Tea 1kg', description: 'Premium Assam Tea', price: 549, mrp: 599, category: 'grocery', brand: 'Tata', stock: 30, image: '' },
      { shop: shops[3]._id, productName: 'Fortune Sunflower Oil 5L', description: 'Refined, Heart Healthy', price: 649, mrp: 749, category: 'grocery', brand: 'Fortune', stock: 25, image: '' },
      { shop: shops[3]._id, productName: 'Maggi Noodles Pack of 12', description: 'Masala, 2 Minute Noodles', price: 168, mrp: 192, category: 'grocery', brand: 'Maggi', stock: 100, image: '' },

      // Raj Hardware (shops[4])
      { shop: shops[4]._id, productName: 'Asian Paints Royale 4L', description: 'Interior Emulsion, Matt Finish', price: 1799, mrp: 2099, category: 'hardware', brand: 'Asian Paints', stock: 20, image: '' },
      { shop: shops[4]._id, productName: 'Bosch Drill Machine', description: '600W Impact Drill, Variable Speed', price: 3499, mrp: 4299, category: 'hardware', brand: 'Bosch', stock: 10, image: '' },
      { shop: shops[4]._id, productName: 'Havells MCB Switch Board', description: '8 Way Double Door', price: 899, mrp: 1199, category: 'hardware', brand: 'Havells', stock: 25, image: '' },

      // Pooja Beauty (shops[5])
      { shop: shops[5]._id, productName: 'Lakme 9to5 Foundation', description: 'Primer + Matte, SPF 20', price: 599, mrp: 799, category: 'personal_care', brand: 'Lakme', stock: 25, image: '' },
      { shop: shops[5]._id, productName: 'LOreal Paris Shampoo 640ml', description: 'Total Repair 5, Damaged Hair', price: 499, mrp: 625, category: 'personal_care', brand: 'LOreal', stock: 30, image: '' },
      { shop: shops[5]._id, productName: 'Maybelline Colossal Kajal', description: 'Smudge Proof, 12HR Stay', price: 299, mrp: 399, category: 'personal_care', brand: 'Maybelline', stock: 40, image: '' },

      // Kiran Stationery (shops[6])
      { shop: shops[6]._id, productName: 'Classmate Notebook Pack of 6', description: '180 Pages, Single Line', price: 240, mrp: 300, category: 'stationery', brand: 'Classmate', stock: 100, image: '' },
      { shop: shops[6]._id, productName: 'Parker Jotter Pen', description: 'Stainless Steel, Blue Ink', price: 349, mrp: 450, category: 'stationery', brand: 'Parker', stock: 30, image: '' },
      { shop: shops[6]._id, productName: 'Faber Castell Art Set', description: '48 Colour Pencils + Sketch Pens', price: 699, mrp: 899, category: 'stationery', brand: 'Faber Castell', stock: 15, image: '' },

      // Deepak Fitness (shops[7])
      { shop: shops[7]._id, productName: 'PowerMax Treadmill', description: '2HP Motor, Auto Incline, Foldable', price: 29999, mrp: 39999, category: 'fitness', brand: 'PowerMax', stock: 3, image: '' },
      { shop: shops[7]._id, productName: 'MuscleBlaze Whey Protein 2kg', description: 'Rich Chocolate, 25g Protein/serving', price: 2699, mrp: 3499, category: 'fitness', brand: 'MuscleBlaze', stock: 20, image: '' },
      { shop: shops[7]._id, productName: 'Boldfit Yoga Mat 6mm', description: 'Anti-Slip, EVA Material', price: 599, mrp: 999, category: 'fitness', brand: 'Boldfit', stock: 25, image: '' },
      { shop: shops[7]._id, productName: 'Fitkit Dumbbells 5kg Pair', description: 'PVC Coated, Anti-Roll', price: 899, mrp: 1299, category: 'fitness', brand: 'Fitkit', stock: 15, image: '' }
    ]);
    console.log(`✅ ${products.length} Products created`);

    // ===================== REVIEWS =====================
    const reviews = await Review.create([
      { user: customers[0]._id, shop: shops[0]._id, rating: 5, comment: 'Excellent service! Got my AC installed same day.' },
      { user: customers[1]._id, shop: shops[0]._id, rating: 4, comment: 'Good prices but delivery took 2 days.' },
      { user: customers[0]._id, shop: shops[1]._id, rating: 5, comment: 'Best place for electronics in Mumbai!' },
      { user: customers[2]._id, shop: shops[1]._id, rating: 4, comment: 'Great collection. Slightly expensive.' },
      { user: customers[1]._id, shop: shops[2]._id, rating: 5, comment: 'Amazing sports equipment collection!' },
      { user: customers[2]._id, shop: shops[3]._id, rating: 5, comment: 'Fresh vegetables daily. Love this shop!' },
      { user: customers[0]._id, shop: shops[3]._id, rating: 4, comment: 'Good grocery shop, fair prices.' },
      { user: customers[1]._id, shop: shops[4]._id, rating: 4, comment: 'Has everything for home renovation.' },
      { user: customers[2]._id, shop: shops[5]._id, rating: 5, comment: 'Best beauty products. Authentic brands!' },
      { user: customers[0]._id, shop: shops[6]._id, rating: 4, comment: 'Great for school supplies.' },
      { user: customers[1]._id, shop: shops[7]._id, rating: 5, comment: 'Bought my protein supplements here. Genuine products!' }
    ]);
    console.log(`✅ ${reviews.length} Reviews created`);

    // ===================== SUMMARY =====================
    console.log('\n🎉 ====== SEED COMPLETE ======');
    console.log('📍 Location: MUMBAI');
    console.log('👤 Admin:    admin@nearbystore.com / admin123');
    console.log('🛒 Customer: rahul@example.com / password123');
    console.log('🏪 Retailer: ramesh.bajaj@example.com / password123');
    console.log(`📦 ${shops.length} Shops | ${products.length} Products | ${reviews.length} Reviews`);
    console.log('================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();
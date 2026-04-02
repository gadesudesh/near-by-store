const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Review = require('../models/Review');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Shop.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    const customer1 = await User.create({ name: 'Rahul Kumar', email: 'rahul@example.com', password: 'password123', role: 'customer', phone: '9876543210' });
    const customer2 = await User.create({ name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', role: 'customer', phone: '9876543211' });
    const retailer1 = await User.create({ name: 'Amit Patel', email: 'amit@example.com', password: 'password123', role: 'retailer', phone: '9876543212' });
    const retailer2 = await User.create({ name: 'Sunita Devi', email: 'sunita@example.com', password: 'password123', role: 'retailer', phone: '9876543213' });
    const retailer3 = await User.create({ name: 'Rajesh Gupta', email: 'rajesh@example.com', password: 'password123', role: 'retailer', phone: '9876543214' });
    console.log('Users created');

    const shop1 = await Shop.create({
      owner: retailer1._id, shopName: 'Fresh Mart Grocery',
      description: 'Your one-stop shop for fresh groceries and daily essentials.',
      address: '45, MG Road, Connaught Place, New Delhi', phone: '011-23456789',
      category: 'grocery', location: { type: 'Point', coordinates: [77.2195, 28.6328] },
      analytics: { views: 145, clicks: 67 }
    });
    const shop2 = await Shop.create({
      owner: retailer2._id, shopName: 'Sunita Bakery & Sweets',
      description: 'Fresh baked goods, cakes, and traditional Indian sweets.',
      address: '12, Chandni Chowk, Old Delhi', phone: '011-23456790',
      category: 'bakery', location: { type: 'Point', coordinates: [77.2307, 28.6506] },
      analytics: { views: 230, clicks: 112 }
    });
    const shop3 = await Shop.create({
      owner: retailer3._id, shopName: 'Rajesh Electronics Hub',
      description: 'Best deals on electronics, mobile accessories, and gadgets.',
      address: '78, Nehru Place, South Delhi', phone: '011-23456791',
      category: 'electronics', location: { type: 'Point', coordinates: [77.2513, 28.5491] },
      analytics: { views: 310, clicks: 189 }
    });
    console.log('Shops created');

    await Product.insertMany([
      { shop: shop1._id, productName: 'Basmati Rice', description: 'Premium aged basmati rice, 5kg', category: 'other', price: 450, stock: 50, unit: 'pack', analytics: { views: 45, clicks: 23 } },
      { shop: shop1._id, productName: 'Organic Apples', description: 'Fresh Shimla apples', category: 'fruits', price: 180, stock: 30, unit: 'kg', analytics: { views: 67, clicks: 34 } },
      { shop: shop1._id, productName: 'Amul Milk', description: 'Fresh toned milk, 1 litre', category: 'dairy', price: 56, stock: 100, unit: 'l', analytics: { views: 120, clicks: 89 } },
      { shop: shop1._id, productName: 'Fresh Tomatoes', description: 'Farm fresh tomatoes', category: 'vegetables', price: 40, stock: 25, unit: 'kg', analytics: { views: 34, clicks: 12 } },
      { shop: shop1._id, productName: 'Whole Wheat Bread', description: 'Freshly baked whole wheat bread', category: 'bakery', price: 45, stock: 20, unit: 'pack', analytics: { views: 23, clicks: 11 } },
      { shop: shop1._id, productName: 'Coca Cola 2L', description: 'Chilled Coca Cola bottle', category: 'beverages', price: 95, stock: 60, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: shop1._id, productName: 'Maggi Noodles', description: 'Masala Maggi family pack', category: 'snacks', price: 96, stock: 45, unit: 'pack', analytics: { views: 89, clicks: 56 } },
      { shop: shop2._id, productName: 'Chocolate Cake', description: 'Rich dark chocolate cake, 1kg', category: 'bakery', price: 650, stock: 10, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: shop2._id, productName: 'Samosa', description: 'Crispy potato samosa (2 pieces)', category: 'snacks', price: 30, stock: 100, unit: 'piece', analytics: { views: 156, clicks: 120 } },
      { shop: shop2._id, productName: 'Gulab Jamun', description: 'Fresh gulab jamun, 500g', category: 'snacks', price: 200, stock: 25, unit: 'pack', analytics: { views: 78, clicks: 45 } },
      { shop: shop2._id, productName: 'Whole Wheat Bread', description: 'Artisan whole wheat bread', category: 'bakery', price: 55, stock: 30, unit: 'piece', analytics: { views: 45, clicks: 23 } },
      { shop: shop2._id, productName: 'Butter Cookies', description: 'Homemade butter cookies tin', category: 'snacks', price: 350, stock: 15, unit: 'pack', analytics: { views: 67, clicks: 34 } },
      { shop: shop3._id, productName: 'iPhone Charger', description: 'Original Apple 20W USB-C', category: 'electronics', price: 1900, stock: 25, unit: 'piece', analytics: { views: 234, clicks: 145 } },
      { shop: shop3._id, productName: 'Wireless Earbuds', description: 'Bluetooth 5.0 with noise cancellation', category: 'electronics', price: 1299, stock: 40, unit: 'piece', analytics: { views: 189, clicks: 98 } },
      { shop: shop3._id, productName: 'USB Cable Type-C', description: '1.5m braided Type-C cable', category: 'electronics', price: 299, stock: 100, unit: 'piece', analytics: { views: 123, clicks: 67 } },
      { shop: shop3._id, productName: 'Power Bank 10000mAh', description: 'Fast charging portable', category: 'electronics', price: 899, stock: 30, unit: 'piece', analytics: { views: 167, clicks: 89 } },
      { shop: shop3._id, productName: 'Screen Protector', description: 'Tempered glass for smartphones', category: 'electronics', price: 199, stock: 200, unit: 'piece', analytics: { views: 145, clicks: 112 } },
    ]);
    console.log('Products created');

    await Review.insertMany([
      { user: customer1._id, shop: shop1._id, rating: 4, comment: 'Great groceries. Prices are reasonable.' },
      { user: customer2._id, shop: shop1._id, rating: 5, comment: 'Best grocery store! Always fresh.' },
      { user: customer1._id, shop: shop2._id, rating: 5, comment: 'Amazing cakes and sweets!' },
      { user: customer2._id, shop: shop2._id, rating: 4, comment: 'Love their bakery items.' },
      { user: customer1._id, shop: shop3._id, rating: 3, comment: 'Good electronics. Could use more variety.' },
      { user: customer2._id, shop: shop3._id, rating: 4, comment: 'Genuine products at fair prices.' },
    ]);
    console.log('Reviews created');

    console.log('\n--- SEED COMPLETE ---');
    console.log('Customer: rahul@example.com / password123');
    console.log('Customer: priya@example.com / password123');
    console.log('Retailer: amit@example.com  / password123');
    console.log('Retailer: sunita@example.com / password123');
    console.log('Retailer: rajesh@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
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

    // ===================== CUSTOMERS =====================
    const c1 = await User.create({ name: 'Rahul Kumar', email: 'rahul@example.com', password: 'password123', role: 'customer', phone: '9876543210' });
    const c2 = await User.create({ name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', role: 'customer', phone: '9876543211' });
    const c3 = await User.create({ name: 'Ankit Joshi', email: 'ankit@example.com', password: 'password123', role: 'customer', phone: '9876543224' });

    // ===================== RETAILERS =====================
    const r1 = await User.create({ name: 'Ramesh Bajaj', email: 'ramesh.bajaj@example.com', password: 'password123', role: 'retailer', phone: '9876543212' });
    const r2 = await User.create({ name: 'Prem Chand Aggarwal', email: 'premchand@example.com', password: 'password123', role: 'retailer', phone: '9876543213' });
    const r3 = await User.create({ name: 'Vinod Gupta', email: 'vinod.gupta@example.com', password: 'password123', role: 'retailer', phone: '9876543214' });
    const r4 = await User.create({ name: 'Harbans Lal Sharma', email: 'harbans@example.com', password: 'password123', role: 'retailer', phone: '9876543215' });
    const r5 = await User.create({ name: 'Ravi Kapoor', email: 'ravi.kapoor@example.com', password: 'password123', role: 'retailer', phone: '9876543216' });
    const r6 = await User.create({ name: 'Mohammed Irfan', email: 'irfan@example.com', password: 'password123', role: 'retailer', phone: '9876543217' });
    const r7 = await User.create({ name: 'Dharamvir Yadav', email: 'dharamvir@example.com', password: 'password123', role: 'retailer', phone: '9876543218' });
    const r8 = await User.create({ name: 'Sunil Jain', email: 'sunil.jain@example.com', password: 'password123', role: 'retailer', phone: '9876543219' });
    const r9 = await User.create({ name: 'Manish Kapoor', email: 'manish.kapoor@example.com', password: 'password123', role: 'retailer', phone: '9876543220' });
    const r10 = await User.create({ name: 'Geeta Devi', email: 'geeta.devi@example.com', password: 'password123', role: 'retailer', phone: '9876543221' });
    const r11 = await User.create({ name: 'Arun Malhotra', email: 'arun.malhotra@example.com', password: 'password123', role: 'retailer', phone: '9876543222' });
    const r12 = await User.create({ name: 'Satish Bhatia', email: 'satish.bhatia@example.com', password: 'password123', role: 'retailer', phone: '9876543223' });

    console.log('✅ 15 Users created');

    // =====================================================
    // SHOPS — All within 2-3 km of Connaught Place (28.6280, 77.2190)
    // So customers see ALL shops nearby
    // =====================================================

    const bajajAppliances = await Shop.create({
      owner: r1._id,
      shopName: 'Bajaj Home Appliances',
      description: 'Since 1985. Refrigerators, ACs, washing machines, water purifiers, geysers, fans and TVs.',
      address: 'Shop 23, Janpath Market, Connaught Place, New Delhi',
      phone: '011-29831001',
      category: 'home_appliances',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2185, 28.6295] },
      analytics: { views: 320, clicks: 145 }
    });

    const premChandKitchen = await Shop.create({
      owner: r2._id,
      shopName: 'Prem Chand Kitchen Emporium',
      description: 'Mixer grinders, microwaves, cooktops, kettles, vacuum cleaners and all kitchen needs since 1992.',
      address: 'Shop 56, Palika Bazaar, Connaught Place, New Delhi',
      phone: '011-25721002',
      category: 'home_appliances',
      image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2200, 28.6310] },
      analytics: { views: 275, clicks: 130 }
    });

    const guptaComputers = await Shop.create({
      owner: r3._id,
      shopName: 'Gupta Computers & Hardware',
      description: 'Processors, GPUs, RAM, SSDs, monitors, keyboards, gaming peripherals. Custom PC builds.',
      address: 'Shop 312, Inner Circle, Connaught Place, New Delhi',
      phone: '011-26441003',
      category: 'hardware',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2210, 28.6265] },
      analytics: { views: 510, clicks: 289 }
    });

    const sharmaHardware = await Shop.create({
      owner: r4._id,
      shopName: 'Sharma & Sons Hardware Store',
      description: 'Power tools, hand tools, locks, pipes, electrical fittings, paints. Since 1964.',
      address: 'Shop 89, Baba Kharak Singh Marg, New Delhi',
      phone: '011-23921004',
      category: 'hardware',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2125, 28.6300] },
      analytics: { views: 180, clicks: 78 }
    });

    const raviElectronics = await Shop.create({
      owner: r5._id,
      shopName: 'Ravi Electronics Emporium',
      description: 'Smartphones, laptops, tablets, smartwatches, power banks. Apple, Samsung authorized reseller.',
      address: 'Shop 34, Outer Circle, Connaught Place, New Delhi',
      phone: '011-23411005',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2175, 28.6320] },
      analytics: { views: 620, clicks: 345 }
    });

    const irfanAudio = await Shop.create({
      owner: r6._id,
      shopName: 'Irfan Sound & Music House',
      description: 'Headphones, earbuds, speakers, soundbars, home theaters, projectors. Sony, JBL, Bose dealer.',
      address: 'Shop 67, Middle Circle, Connaught Place, New Delhi',
      phone: '011-25101006',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2230, 28.6275] },
      analytics: { views: 290, clicks: 156 }
    });

    const yadavSports = await Shop.create({
      owner: r7._id,
      shopName: 'Yadav Sports Bhandar',
      description: 'Cricket, football, badminton, tennis, hockey equipment. SG, Yonex, Nike, Adidas stockist.',
      address: 'Shop 45, Barakhamba Road, New Delhi',
      phone: '011-29561007',
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcfed?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2250, 28.6290] },
      analytics: { views: 410, clicks: 198 }
    });

    const jainFitness = await Shop.create({
      owner: r8._id,
      shopName: 'Jain Fitness & Gym Equipment',
      description: 'Dumbbells, treadmills, yoga mats, cycling gear, swimming accessories, fitness bands.',
      address: 'Shop 22, Tolstoy Marg, New Delhi',
      phone: '011-28081008',
      category: 'fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2165, 28.6250] },
      analytics: { views: 345, clicks: 167 }
    });

    const kapoorWatchGallery = await Shop.create({
      owner: r9._id,
      shopName: 'Kapoor Watch Gallery & Accessories',
      description: 'Watches, sunglasses, wallets, belts, bags, jewelry. Titan, Fossil, Ray-Ban dealer since 1978.',
      address: 'Shop 78, Kasturba Gandhi Marg, New Delhi',
      phone: '011-24621009',
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2220, 28.6305] },
      analytics: { views: 390, clicks: 210 }
    });

    const geetaStationery = await Shop.create({
      owner: r10._id,
      shopName: 'Geeta Book Depot & Stationery',
      description: 'Pens, notebooks, water bottles, flasks, eyewear, school supplies. Classmate, Parker dealer.',
      address: 'Shop 15, Scindia House, Connaught Place, New Delhi',
      phone: '011-22051010',
      category: 'stationery',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2195, 28.6260] },
      analytics: { views: 210, clicks: 95 }
    });

    const malhotraGrooming = await Shop.create({
      owner: r11._id,
      shopName: 'Malhotra Personal Care & Grooming',
      description: 'Trimmers, shavers, hair dryers, straighteners, electric toothbrushes, perfumes, deodorants.',
      address: 'Shop 33, Rajiv Chowk Metro Market, New Delhi',
      phone: '011-26891011',
      category: 'personal_care',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2150, 28.6280] },
      analytics: { views: 175, clicks: 82 }
    });

    const bhatiaCamera = await Shop.create({
      owner: r12._id,
      shopName: 'Bhatia Camera House & Smart Home',
      description: 'DSLR cameras, drones, action cameras, routers, smart home devices. Canon, Nikon, GoPro dealer.',
      address: 'Shop 90, Minto Road, New Delhi',
      phone: '011-25521012',
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
      location: { type: 'Point', coordinates: [77.2240, 28.6255] },
      analytics: { views: 260, clicks: 134 }
    });

    console.log('✅ 12 Shops created (all within 2km of each other)');

    // =====================================================
    // PRODUCTS WITH IMAGES
    // Using real product images from Unsplash
    // =====================================================

    await Product.insertMany([

      // ========== BAJAJ HOME APPLIANCES ==========
      { shop: bajajAppliances._id, productName: 'LG 260L Double Door Refrigerator', description: 'Smart Inverter Compressor, frost-free, convertible', category: 'refrigerators', brand: 'LG', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop', price: 28990, stock: 8, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: bajajAppliances._id, productName: 'Samsung 253L Frost Free Refrigerator', description: 'Digital Inverter Technology, all-around cooling', category: 'refrigerators', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop', price: 26490, stock: 6, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: bajajAppliances._id, productName: 'Whirlpool 190L Single Door Fridge', description: 'Direct cool, stabilizer free, ice twister', category: 'refrigerators', brand: 'Whirlpool', image: 'https://images.unsplash.com/photo-1536353284924-9220c464e262?w=300&h=300&fit=crop', price: 14990, stock: 12, unit: 'piece', analytics: { views: 56, clicks: 23 } },
      { shop: bajajAppliances._id, productName: 'Godrej 236L Double Door Refrigerator', description: 'Intelligent inverter, cool balance technology', category: 'refrigerators', brand: 'Godrej', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop', price: 22490, stock: 5, unit: 'piece', analytics: { views: 34, clicks: 15 } },
      { shop: bajajAppliances._id, productName: 'Bosch 7kg Front Load Washing Machine', description: 'Anti-vibration design, 1200 RPM, EcoSilence', category: 'washing_machines', brand: 'Bosch', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&h=300&fit=crop', price: 32990, stock: 4, unit: 'piece', analytics: { views: 67, clicks: 30 } },
      { shop: bajajAppliances._id, productName: 'IFB 6.5kg Front Load Washer', description: 'Aqua Energie, cradle wash, 2D wash system', category: 'washing_machines', brand: 'IFB', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&h=300&fit=crop', price: 27490, stock: 6, unit: 'piece', analytics: { views: 55, clicks: 28 } },
      { shop: bajajAppliances._id, productName: 'LG 8kg Top Load Washing Machine', description: 'Smart Inverter, TurboDrum, auto restart', category: 'washing_machines', brand: 'LG', image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=300&h=300&fit=crop', price: 21990, stock: 7, unit: 'piece', analytics: { views: 72, clicks: 35 } },
      { shop: bajajAppliances._id, productName: 'Voltas 1.5 Ton 3 Star Split AC', description: 'Copper condenser, high ambient cooling 52°C', category: 'air_conditioners', brand: 'Voltas', image: 'https://images.unsplash.com/photo-1631545806609-11e16530d0c3?w=300&h=300&fit=crop', price: 33990, stock: 10, unit: 'piece', analytics: { views: 120, clicks: 56 } },
      { shop: bajajAppliances._id, productName: 'LG 1.5 Ton 5 Star Inverter Split AC', description: 'Dual Inverter, Wi-Fi, Himalaya Cool', category: 'air_conditioners', brand: 'LG', image: 'https://images.unsplash.com/photo-1631545806609-11e16530d0c3?w=300&h=300&fit=crop', price: 42990, stock: 5, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: bajajAppliances._id, productName: 'Kent Grand Plus RO Water Purifier', description: 'RO+UV+UF, 8 litre storage, mineral ROTM', category: 'water_purifiers', brand: 'Kent', image: 'https://images.unsplash.com/photo-1564419320461-6e1ab1031060?w=300&h=300&fit=crop', price: 18500, stock: 15, unit: 'piece', analytics: { views: 89, clicks: 44 } },
      { shop: bajajAppliances._id, productName: 'Aquaguard Aura RO+UV Purifier', description: '7 litre, mineral guard, copper+ tech', category: 'water_purifiers', brand: 'Aquaguard', image: 'https://images.unsplash.com/photo-1564419320461-6e1ab1031060?w=300&h=300&fit=crop', price: 16990, stock: 10, unit: 'piece', analytics: { views: 65, clicks: 30 } },
      { shop: bajajAppliances._id, productName: 'Bajaj New Shakti 15L Water Heater', description: 'Glass lined tank, 4 star BEE rating', category: 'water_heaters', brand: 'Bajaj', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop', price: 6490, stock: 20, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: bajajAppliances._id, productName: 'Crompton High Flo Eva Ceiling Fan', description: '1200mm, 53 watts, anti-dust coating', category: 'electric_fans', brand: 'Crompton', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', price: 1590, stock: 25, unit: 'piece', analytics: { views: 67, clicks: 34 } },
      { shop: bajajAppliances._id, productName: 'Samsung 55 inch Crystal 4K Smart TV', description: 'Crystal Processor 4K, HDR, Smart Hub', category: 'televisions', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', price: 47990, stock: 3, unit: 'piece', analytics: { views: 145, clicks: 67 } },
      { shop: bajajAppliances._id, productName: 'Sony Bravia 50 inch 4K Google TV', description: 'X1 processor, Triluminos Pro, Dolby Vision', category: 'televisions', brand: 'Sony', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', price: 56990, stock: 2, unit: 'piece', analytics: { views: 98, clicks: 48 } },

      // ========== PREM CHAND KITCHEN EMPORIUM ==========
      { shop: premChandKitchen._id, productName: 'Preethi Zodiac MG 218 Mixer Grinder', description: '750W, 5 jars, master chef jar included', category: 'kitchen_appliances', brand: 'Preethi', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop', price: 6490, stock: 15, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: premChandKitchen._id, productName: 'Bajaj Rex 500W Mixer Grinder', description: '3 jars, multi-purpose grinding & mixing', category: 'kitchen_appliances', brand: 'Bajaj', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop', price: 2290, stock: 25, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: premChandKitchen._id, productName: 'Philips HL7756 750W Mixer Grinder', description: '3 jars, turbo motor, leak-proof lids', category: 'kitchen_appliances', brand: 'Philips', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop', price: 3690, stock: 18, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: premChandKitchen._id, productName: 'Sujata Dynamix 900W Mixer Grinder', description: 'Heavy duty motor, 3 jars, double ball bearing', category: 'kitchen_appliances', brand: 'Sujata', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop', price: 4490, stock: 10, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: premChandKitchen._id, productName: 'Philips Viva Collection HR1863 Juicer', description: '700W, quick clean, 2L pulp container', category: 'kitchen_appliances', brand: 'Philips', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300&h=300&fit=crop', price: 5490, stock: 8, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: premChandKitchen._id, productName: 'IFB 25L Convection Microwave Oven', description: '300+ auto cook menus, rotisserie, child lock', category: 'microwave_ovens', brand: 'IFB', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=300&fit=crop', price: 13490, stock: 6, unit: 'piece', analytics: { views: 78, clicks: 34 } },
      { shop: premChandKitchen._id, productName: 'Samsung 28L Convection Microwave', description: 'SlimFry, Tandoor technology, ceramic cavity', category: 'microwave_ovens', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=300&fit=crop', price: 14990, stock: 5, unit: 'piece', analytics: { views: 65, clicks: 30 } },
      { shop: premChandKitchen._id, productName: 'Bajaj Majesty 1.7L Electric Kettle', description: 'Stainless steel, auto shut-off, cool touch', category: 'kitchen_appliances', brand: 'Bajaj', image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&h=300&fit=crop', price: 899, stock: 30, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: premChandKitchen._id, productName: 'Prestige Iris 3 Burner Gas Stove', description: 'Toughened glass top, brass burners, ISI certified', category: 'cooktops_stoves', brand: 'Prestige', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop', price: 3890, stock: 10, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: premChandKitchen._id, productName: 'Philips Viva 2100W Induction Cooktop', description: 'Crystal glass, auto-off, sensor touch buttons', category: 'cooktops_stoves', brand: 'Philips', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop', price: 2490, stock: 15, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: premChandKitchen._id, productName: 'Eureka Forbes Quick Clean DX Vacuum', description: '1200W, multi-surface, reusable dust bag', category: 'vacuum_cleaners', brand: 'Eureka Forbes', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&h=300&fit=crop', price: 4990, stock: 8, unit: 'piece', analytics: { views: 34, clicks: 16 } },
      { shop: premChandKitchen._id, productName: 'Dyson V8 Absolute Cordless Vacuum', description: 'Motorhead, 40 min run time, HEPA filtration', category: 'vacuum_cleaners', brand: 'Dyson', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&h=300&fit=crop', price: 35900, stock: 2, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      // ========== GUPTA COMPUTERS & HARDWARE ==========
      { shop: guptaComputers._id, productName: 'Intel Core i5-13400F Processor', description: '10 cores, 16 threads, 4.6GHz boost, LGA 1700', category: 'computer_hardware', brand: 'Intel', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop', price: 15490, stock: 12, unit: 'piece', analytics: { views: 189, clicks: 98 } },
      { shop: guptaComputers._id, productName: 'AMD Ryzen 5 5600X Processor', description: '6 cores, 12 threads, 4.6GHz, AM4 socket', category: 'computer_hardware', brand: 'AMD', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop', price: 13990, stock: 10, unit: 'piece', analytics: { views: 167, clicks: 89 } },
      { shop: guptaComputers._id, productName: 'ASUS ROG Strix B550-F Motherboard', description: 'ATX, AM4, WiFi 6, PCIe 4.0, 2.5Gb LAN', category: 'computer_hardware', brand: 'ASUS', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop', price: 16990, stock: 7, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: guptaComputers._id, productName: 'Corsair Vengeance 16GB DDR4 RAM', description: '3200MHz, dual channel kit (2x8GB), XMP 2.0', category: 'computer_hardware', brand: 'Corsair', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&h=300&fit=crop', price: 3490, stock: 25, unit: 'piece', analytics: { views: 145, clicks: 78 } },
      { shop: guptaComputers._id, productName: 'Samsung 970 EVO Plus 1TB NVMe SSD', description: '3500MB/s read, V-NAND, 5 year warranty', category: 'computer_hardware', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=300&fit=crop', price: 6490, stock: 20, unit: 'piece', analytics: { views: 198, clicks: 112 } },
      { shop: guptaComputers._id, productName: 'WD Blue 1TB SATA Hard Disk', description: '7200 RPM, 64MB cache, 2 year warranty', category: 'computer_hardware', brand: 'Western Digital', image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=300&h=300&fit=crop', price: 2990, stock: 30, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: guptaComputers._id, productName: 'NVIDIA GeForce RTX 4060 8GB GPU', description: 'DLSS 3.0, ray tracing, PCIe 4.0, 115W TDP', category: 'computer_hardware', brand: 'NVIDIA', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=300&fit=crop', price: 29990, stock: 4, unit: 'piece', analytics: { views: 345, clicks: 189 } },
      { shop: guptaComputers._id, productName: 'Corsair CV650 Power Supply 650W', description: '80+ Bronze, non-modular, 120mm fan', category: 'computer_hardware', brand: 'Corsair', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=300&fit=crop', price: 4490, stock: 15, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: guptaComputers._id, productName: 'Dell S2422HG 24" Curved Gaming Monitor', description: '165Hz, FHD, 1ms, AMD FreeSync Premium', category: 'computer_hardware', brand: 'Dell', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop', price: 14990, stock: 6, unit: 'piece', analytics: { views: 123, clicks: 67 } },
      { shop: guptaComputers._id, productName: 'Logitech G102 Lightsync Gaming Mouse', description: '8000 DPI, RGB, 6 programmable buttons', category: 'computer_hardware', brand: 'Logitech', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop', price: 1295, stock: 40, unit: 'piece', analytics: { views: 167, clicks: 89 } },
      { shop: guptaComputers._id, productName: 'Razer BlackWidow V3 Mechanical Keyboard', description: 'Green switches, RGB Chroma, media keys', category: 'computer_hardware', brand: 'Razer', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=300&fit=crop', price: 8490, stock: 8, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: guptaComputers._id, productName: 'NZXT H510 Mid Tower Cabinet', description: 'Tempered glass, cable management, 2 fans', category: 'computer_hardware', brand: 'NZXT', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=300&fit=crop', price: 6990, stock: 6, unit: 'piece', analytics: { views: 89, clicks: 45 } },

      // ========== SHARMA & SONS HARDWARE STORE ==========
      { shop: sharmaHardware._id, productName: 'Bosch GSB 550 Impact Drill Kit', description: '550W, 13mm chuck, variable speed, 100pc kit', category: 'power_tools', brand: 'Bosch', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop', price: 3490, stock: 15, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: sharmaHardware._id, productName: 'Black+Decker 20V Cordless Drill Driver', description: 'Lithium-ion, LED light, 10mm keyless chuck', category: 'power_tools', brand: 'Black+Decker', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop', price: 4990, stock: 8, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: sharmaHardware._id, productName: 'Stanley 8-Piece Screwdriver Set', description: 'Chrome vanadium steel, cushion grip handle', category: 'hand_tools', brand: 'Stanley', image: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0bf8?w=300&h=300&fit=crop', price: 790, stock: 30, unit: 'set', analytics: { views: 78, clicks: 38 } },
      { shop: sharmaHardware._id, productName: 'Taparia 1621 Combination Plier 8"', description: 'Hardened cutting edge, insulated handle', category: 'hand_tools', brand: 'Taparia', image: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0bf8?w=300&h=300&fit=crop', price: 320, stock: 50, unit: 'piece', analytics: { views: 45, clicks: 20 } },
      { shop: sharmaHardware._id, productName: 'Godrej NavTal 7 Lever Padlock', description: 'Hardened shackle, 3 keys, anti-rust body', category: 'locks_security', brand: 'Godrej', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', price: 590, stock: 40, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: sharmaHardware._id, productName: 'Yale Essential 6-Pin Deadbolt Lock', description: 'Anti-pick, anti-bump, satin nickel finish', category: 'locks_security', brand: 'Yale', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', price: 2490, stock: 10, unit: 'piece', analytics: { views: 34, clicks: 16 } },
      { shop: sharmaHardware._id, productName: 'Havells Pearlz 16A Modular Switch', description: 'Polycarbonate body, silver alloy contacts', category: 'electrical_hardware', brand: 'Havells', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', price: 120, stock: 200, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: sharmaHardware._id, productName: 'Schneider Electric Acti9 32A MCB', description: 'Single pole, C curve, 10kA breaking capacity', category: 'electrical_hardware', brand: 'Schneider', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop', price: 290, stock: 80, unit: 'piece', analytics: { views: 56, clicks: 25 } },
      { shop: sharmaHardware._id, productName: 'Asian Paints Apcolite Premium Emulsion 4L', description: 'Interior walls, washable, smooth finish', category: 'paint_coatings', brand: 'Asian Paints', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=300&h=300&fit=crop', price: 1690, stock: 25, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: sharmaHardware._id, productName: 'Berger Silk Glamour Emulsion 4L', description: 'Luxury finish, anti-fade, low VOC', category: 'paint_coatings', brand: 'Berger', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=300&h=300&fit=crop', price: 1890, stock: 20, unit: 'piece', analytics: { views: 45, clicks: 20 } },
      { shop: sharmaHardware._id, productName: 'Finolex 1 inch CPVC Pipe 3 Metre', description: 'Hot & cold water, ISI certified', category: 'pipes_fittings', brand: 'Finolex', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop', price: 490, stock: 100, unit: 'piece', analytics: { views: 34, clicks: 14 } },

      // ========== RAVI ELECTRONICS EMPORIUM ==========
      { shop: raviElectronics._id, productName: 'Samsung Galaxy S24 128GB', description: 'Galaxy AI, 50MP camera, 6.2" Dynamic AMOLED', category: 'smartphones', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop', price: 74999, stock: 8, unit: 'piece', analytics: { views: 345, clicks: 178 } },
      { shop: raviElectronics._id, productName: 'Apple iPhone 15 128GB', description: 'A16 Bionic, Dynamic Island, 48MP, USB-C', category: 'smartphones', brand: 'Apple', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop', price: 79900, stock: 5, unit: 'piece', analytics: { views: 456, clicks: 234 } },
      { shop: raviElectronics._id, productName: 'Xiaomi 14 256GB', description: 'Leica camera, Snapdragon 8 Gen 3, 120W charge', category: 'smartphones', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', price: 59999, stock: 6, unit: 'piece', analytics: { views: 234, clicks: 112 } },
      { shop: raviElectronics._id, productName: 'OnePlus 12 256GB', description: 'Snapdragon 8 Gen 3, 100W SUPERVOOC', category: 'smartphones', brand: 'OnePlus', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', price: 64999, stock: 7, unit: 'piece', analytics: { views: 289, clicks: 145 } },
      { shop: raviElectronics._id, productName: 'Apple iPad 10th Gen 64GB WiFi', description: '10.9" Liquid Retina, A14 Bionic, Touch ID', category: 'tablets', brand: 'Apple', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop', price: 34900, stock: 6, unit: 'piece', analytics: { views: 234, clicks: 112 } },
      { shop: raviElectronics._id, productName: 'Samsung Galaxy Tab S9 FE 128GB', description: '10.9", S Pen included, IP68 water resistant', category: 'tablets', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop', price: 29999, stock: 5, unit: 'piece', analytics: { views: 156, clicks: 78 } },
      { shop: raviElectronics._id, productName: 'Apple Watch Series 9 GPS 45mm', description: 'S9 chip, double tap gesture, Always On', category: 'smartwatches', brand: 'Apple', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=300&h=300&fit=crop', price: 44900, stock: 4, unit: 'piece', analytics: { views: 198, clicks: 89 } },
      { shop: raviElectronics._id, productName: 'Noise ColorFit Pro 5 Max Smartwatch', description: '1.96" AMOLED, BT calling, 100+ sports', category: 'smartwatches', brand: 'Noise', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=300&h=300&fit=crop', price: 3999, stock: 20, unit: 'piece', analytics: { views: 234, clicks: 120 } },
      { shop: raviElectronics._id, productName: 'Dell Inspiron 15 i5-1235U Laptop', description: '8GB RAM, 512GB SSD, 15.6" FHD, Win 11', category: 'laptops', brand: 'Dell', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', price: 52990, stock: 5, unit: 'piece', analytics: { views: 278, clicks: 134 } },
      { shop: raviElectronics._id, productName: 'Apple MacBook Air M2 256GB', description: '8-core GPU, 8GB RAM, 13.6" Liquid Retina', category: 'laptops', brand: 'Apple', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop', price: 99900, stock: 3, unit: 'piece', analytics: { views: 345, clicks: 178 } },
      { shop: raviElectronics._id, productName: 'Anker 20000mAh PowerCore Power Bank', description: 'PowerIQ, dual USB-A, USB-C input, 18W', category: 'chargers_powerbanks', brand: 'Anker', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', price: 2499, stock: 25, unit: 'piece', analytics: { views: 156, clicks: 78 } },
      { shop: raviElectronics._id, productName: 'Mi 10000mAh Wireless Power Bank', description: 'Qi wireless charging, 22.5W wired fast charge', category: 'chargers_powerbanks', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', price: 1799, stock: 30, unit: 'piece', analytics: { views: 134, clicks: 67 } },

      // ========== IRFAN SOUND & MUSIC HOUSE ==========
      { shop: irfanAudio._id, productName: 'Sony WH-1000XM5 Wireless Headphones', description: 'Industry-leading ANC, 30hr battery, LDAC', category: 'headphones_earbuds', brand: 'Sony', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', price: 26990, stock: 6, unit: 'piece', analytics: { views: 234, clicks: 120 } },
      { shop: irfanAudio._id, productName: 'JBL Tune 230NC TWS Earbuds', description: 'Active noise cancelling, 40hr total, IPX4', category: 'headphones_earbuds', brand: 'JBL', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f6d?w=300&h=300&fit=crop', price: 4999, stock: 15, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: irfanAudio._id, productName: 'Boat Airdopes 141 TWS Earbuds', description: '42hr playback, IPX4, 8mm drivers', category: 'headphones_earbuds', brand: 'Boat', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f6d?w=300&h=300&fit=crop', price: 1299, stock: 40, unit: 'piece', analytics: { views: 289, clicks: 156 } },
      { shop: irfanAudio._id, productName: 'Apple AirPods Pro 2nd Gen USB-C', description: 'Adaptive Audio, conversation awareness, IP54', category: 'headphones_earbuds', brand: 'Apple', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop', price: 24900, stock: 4, unit: 'piece', analytics: { views: 198, clicks: 98 } },
      { shop: irfanAudio._id, productName: 'JBL Flip 6 Portable Bluetooth Speaker', description: 'IP67, 12hr battery, PartyBoost', category: 'speakers', brand: 'JBL', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', price: 9999, stock: 10, unit: 'piece', analytics: { views: 167, clicks: 78 } },
      { shop: irfanAudio._id, productName: 'Bose SoundLink Flex Bluetooth Speaker', description: 'IP67, PositionIQ, deep bass, 12hr', category: 'speakers', brand: 'Bose', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', price: 14990, stock: 5, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: irfanAudio._id, productName: 'Sony HT-S400 2.1ch Soundbar', description: 'Wireless subwoofer, Dolby Audio, 330W', category: 'sound_systems', brand: 'Sony', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop', price: 19990, stock: 4, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: irfanAudio._id, productName: 'Epson EF-11 Portable Laser Projector', description: '1080p, 1000 lumens, 2.7kg, HDMI', category: 'projectors', brand: 'Epson', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=300&fit=crop', price: 79990, stock: 2, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: irfanAudio._id, productName: 'BenQ TH585P Full HD Projector', description: '3500 lumens, low input lag, 10W speaker', category: 'projectors', brand: 'BenQ', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=300&fit=crop', price: 54990, stock: 3, unit: 'piece', analytics: { views: 67, clicks: 32 } },

      // ========== YADAV SPORTS BHANDAR ==========
      { shop: yadavSports._id, productName: 'SG Nexus Plus Kashmir Willow Cricket Bat', description: 'Short handle, thick edges, full cane handle', category: 'cricket', brand: 'SG', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop', price: 2490, stock: 15, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: yadavSports._id, productName: 'SS Ton English Willow Cricket Bat', description: 'Grade 1, full profile, wide sweetspot', category: 'cricket', brand: 'SS', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop', price: 7490, stock: 6, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: yadavSports._id, productName: 'MRF Genius Grand Cricket Bat', description: 'English Willow, Virat Kohli signature edition', category: 'cricket', brand: 'MRF', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop', price: 12990, stock: 3, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: yadavSports._id, productName: 'Nike Flight Match Football Size 5', description: 'Aerowsculpt, 12-panel, FIFA Quality Pro', category: 'football', brand: 'Nike', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=300&h=300&fit=crop', price: 3990, stock: 10, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: yadavSports._id, productName: 'Adidas UCL Pro Match Ball', description: 'Seamless surface, FIFA approved, size 5', category: 'football', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=300&h=300&fit=crop', price: 4490, stock: 8, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: yadavSports._id, productName: 'Yonex Nanoray Light 18i Badminton Racket', description: 'Isometric head, 77g, strung, cover included', category: 'badminton', brand: 'Yonex', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300&h=300&fit=crop', price: 1890, stock: 12, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: yadavSports._id, productName: 'Wilson Clash 100 v2 Tennis Racket', description: 'FreeFlex, StableSmart, 295g', category: 'tennis', brand: 'Wilson', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=300&fit=crop', price: 16990, stock: 4, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: yadavSports._id, productName: 'Stag 1 Star Table Tennis Racket', description: 'ITTF approved, 5-ply blade, pimple in', category: 'table_tennis', brand: 'Stag', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=300&h=300&fit=crop', price: 590, stock: 20, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: yadavSports._id, productName: 'Grays GR5000 Hockey Stick', description: 'Ultrabow, carbon composite, 36.5"', category: 'hockey', brand: 'Grays', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcfed?w=300&h=300&fit=crop', price: 4490, stock: 6, unit: 'piece', analytics: { views: 56, clicks: 28 } },

      // ========== JAIN FITNESS & GYM EQUIPMENT ==========
      { shop: jainFitness._id, productName: 'PowerMax 10kg Rubber Hex Dumbbell Pair', description: 'Hex shape anti-roll, chrome handle', category: 'gym_workout', brand: 'PowerMax', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop', price: 2490, stock: 15, unit: 'pair', analytics: { views: 89, clicks: 45 } },
      { shop: jainFitness._id, productName: 'Fitkit FT200S Motorised Treadmill', description: '2HP peak, 12 programs, 0-14km/h, foldable', category: 'gym_workout', brand: 'Fitkit', image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&h=300&fit=crop', price: 24990, stock: 3, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: jainFitness._id, productName: 'Decathlon Domyos Resistance Band Set', description: '3 bands (light/medium/heavy), latex', category: 'gym_workout', brand: 'Decathlon', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop', price: 799, stock: 30, unit: 'set', analytics: { views: 112, clicks: 56 } },
      { shop: jainFitness._id, productName: 'Speedo Jet Swimming Goggles', description: 'Anti-fog, UV protection, wide vision', category: 'swimming', brand: 'Speedo', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=300&fit=crop', price: 590, stock: 25, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: jainFitness._id, productName: 'Hero Sprint Pro 26T Mountain Bike', description: '21 speed Shimano gears, front suspension', category: 'cycling', brand: 'Hero', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop', price: 14990, stock: 4, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: jainFitness._id, productName: 'Nike Air Zoom Pegasus 40 Running Shoes', description: 'React foam, Zoom Air unit, breathable mesh', category: 'athletics_running', brand: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', price: 10795, stock: 8, unit: 'pair', analytics: { views: 145, clicks: 72 } },
      { shop: jainFitness._id, productName: 'Adidas Ultraboost Light Running Shoes', description: 'Light BOOST, Primeknit+, Continental rubber', category: 'athletics_running', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', price: 14999, stock: 5, unit: 'pair', analytics: { views: 112, clicks: 56 } },
      { shop: jainFitness._id, productName: 'Reebok 6mm Yoga Mat', description: 'Reversible, textured surface, carry strap', category: 'yoga_mats', brand: 'Reebok', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop', price: 1490, stock: 20, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: jainFitness._id, productName: 'Fitbit Charge 6 Fitness Band', description: 'GPS, heart rate, Google apps, 7-day battery', category: 'fitness_bands', brand: 'Fitbit', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop', price: 14999, stock: 8, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: jainFitness._id, productName: 'Xiaomi Smart Band 8 Pro', description: '1.74" AMOLED, GPS, 150+ workout modes', category: 'fitness_bands', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop', price: 3999, stock: 15, unit: 'piece', analytics: { views: 178, clicks: 89 } },

      // ========== KAPOOR WATCH GALLERY & ACCESSORIES ==========
      { shop: kapoorWatchGallery._id, productName: 'Titan Octane Chronograph Watch', description: 'Stainless steel, mineral glass, 100m WR', category: 'watches', brand: 'Titan', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop', price: 5995, stock: 10, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: kapoorWatchGallery._id, productName: 'Casio G-Shock GA-2100 Watch', description: 'Carbon core guard, 200m WR, world time', category: 'watches', brand: 'Casio', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop', price: 9995, stock: 6, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: kapoorWatchGallery._id, productName: 'Fossil Grant Chronograph Leather Watch', description: 'Genuine leather, Roman numerals, 44mm', category: 'watches', brand: 'Fossil', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=300&h=300&fit=crop', price: 8995, stock: 5, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: kapoorWatchGallery._id, productName: 'Ray-Ban Aviator Classic RB3025', description: 'Gold frame, green G-15 lens, 58mm', category: 'sunglasses', brand: 'Ray-Ban', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop', price: 7990, stock: 10, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: kapoorWatchGallery._id, productName: 'Fastrack Wayfarer Unisex Sunglasses', description: 'UV protected, polycarbonate lens', category: 'sunglasses', brand: 'Fastrack', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop', price: 1290, stock: 20, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: kapoorWatchGallery._id, productName: 'Hidesign Leather Bi-Fold Wallet', description: 'Genuine leather, 6 card slots, coin pocket', category: 'wallets_belts', brand: 'Hidesign', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop', price: 1995, stock: 12, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: kapoorWatchGallery._id, productName: 'WildHorn Leather Belt for Men', description: 'Italian leather, auto-lock buckle', category: 'wallets_belts', brand: 'WildHorn', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop', price: 599, stock: 25, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: kapoorWatchGallery._id, productName: 'Tanishq 22KT Gold Stud Earrings', description: 'Diamond cut, lightweight, BIS hallmark', category: 'jewelry', brand: 'Tanishq', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop', price: 12990, stock: 4, unit: 'pair', analytics: { views: 134, clicks: 67 } },
      { shop: kapoorWatchGallery._id, productName: 'Wildcraft 45L Trekking Backpack', description: 'Rain cover, multiple compartments, padded', category: 'backpacks_bags', brand: 'Wildcraft', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', price: 2990, stock: 10, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: kapoorWatchGallery._id, productName: 'Samsonite Spinner 68cm Trolley Bag', description: 'Polycarbonate, TSA lock, 4 wheels', category: 'luggage', brand: 'Samsonite', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=300&h=300&fit=crop', price: 8990, stock: 5, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: kapoorWatchGallery._id, productName: 'American Tourister Ivy 55cm Cabin Bag', description: 'Hard case, combination lock, 4 wheels', category: 'luggage', brand: 'American Tourister', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=300&h=300&fit=crop', price: 3490, stock: 10, unit: 'piece', analytics: { views: 112, clicks: 56 } },

      // ========== GEETA BOOK DEPOT & STATIONERY ==========
      { shop: geetaStationery._id, productName: 'Reynolds Trimax Gel Pen Pack of 5', description: 'Waterproof ink, 0.5mm fine tip', category: 'pens_notebooks', brand: 'Reynolds', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=300&fit=crop', price: 120, stock: 100, unit: 'pack', analytics: { views: 89, clicks: 45 } },
      { shop: geetaStationery._id, productName: 'Parker Classic Gold Trim Ball Pen', description: 'Stainless steel, gold plated clip', category: 'pens_notebooks', brand: 'Parker', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=300&fit=crop', price: 390, stock: 20, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: geetaStationery._id, productName: 'Classmate Spiral Notebook 400 Pages', description: 'A4 size, single line, soft cover', category: 'pens_notebooks', brand: 'Classmate', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&h=300&fit=crop', price: 180, stock: 80, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: geetaStationery._id, productName: 'Milton Thermosteel 1L Flask', description: '24hr hot/cold, stainless steel, leak proof', category: 'water_bottles_flasks', brand: 'Milton', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop', price: 890, stock: 25, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: geetaStationery._id, productName: 'Cello Puro Steel Water Bottle 900ml', description: 'Stainless steel, single wall, leak proof', category: 'water_bottles_flasks', brand: 'Cello', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop', price: 490, stock: 30, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: geetaStationery._id, productName: 'Lenskart Hustlr Blue Light Glasses', description: 'Anti-glare, zero power, computer use', category: 'eyewear', brand: 'Lenskart', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop', price: 1290, stock: 20, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: geetaStationery._id, productName: 'Titan Eye+ Round Reading Glasses +1.50', description: 'Lightweight frame, spring hinge', category: 'eyewear', brand: 'Titan Eye+', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop', price: 990, stock: 15, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      // ========== MALHOTRA PERSONAL CARE & GROOMING ==========
      { shop: malhotraGrooming._id, productName: 'Philips BT3221 Beard Trimmer', description: 'DuraPower, 20 length settings, 90 min runtime', category: 'trimmers_shavers', brand: 'Philips', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&h=300&fit=crop', price: 1795, stock: 15, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: malhotraGrooming._id, productName: 'Braun Series 5 Electric Shaver', description: 'AutoSense, EasyClean, wet & dry', category: 'trimmers_shavers', brand: 'Braun', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&h=300&fit=crop', price: 8990, stock: 5, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: malhotraGrooming._id, productName: 'Havells BT6202 Beard Trimmer', description: '20 length settings, USB charging, 100 min', category: 'trimmers_shavers', brand: 'Havells', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&h=300&fit=crop', price: 1295, stock: 20, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: malhotraGrooming._id, productName: 'Philips BHD356 Hair Dryer 2100W', description: 'ThermoProtect, ionic care, 6 settings', category: 'hair_dryers', brand: 'Philips', image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300&h=300&fit=crop', price: 2495, stock: 10, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: malhotraGrooming._id, productName: 'Vega Keratin Glow Hair Straightener', description: 'Ceramic plates, adjustable temp, quick heat', category: 'hair_dryers', brand: 'Vega', image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300&h=300&fit=crop', price: 1590, stock: 12, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: malhotraGrooming._id, productName: 'Philips Sonicare ProtectiveClean 4300', description: 'BrushSync, 2 min timer, pressure sensor', category: 'electric_toothbrushes', brand: 'Philips', image: 'https://images.unsplash.com/photo-1559467278-020d6a907e2d?w=300&h=300&fit=crop', price: 3990, stock: 8, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: malhotraGrooming._id, productName: 'Oral-B Vitality 100 Electric Toothbrush', description: '2D cleaning, 2 min timer, 1 brush head', category: 'electric_toothbrushes', brand: 'Oral-B', image: 'https://images.unsplash.com/photo-1559467278-020d6a907e2d?w=300&h=300&fit=crop', price: 1290, stock: 15, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: malhotraGrooming._id, productName: 'Fogg Scent Xpressio EDP Perfume 100ml', description: 'Long lasting, citrus woody, for men', category: 'deodorants_perfumes', brand: 'Fogg', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop', price: 499, stock: 30, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: malhotraGrooming._id, productName: 'Wild Stone Code Steel Body Perfume 120ml', description: 'No gas, long lasting, fresh & citrus', category: 'deodorants_perfumes', brand: 'Wild Stone', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop', price: 349, stock: 40, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: malhotraGrooming._id, productName: 'Nivea Men Deep Impact Deo 150ml', description: 'Anti-perspirant, 48hr protection', category: 'deodorants_perfumes', brand: 'Nivea', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop', price: 225, stock: 50, unit: 'piece', analytics: { views: 98, clicks: 48 } },

      // ========== BHATIA CAMERA HOUSE & SMART HOME ==========
      { shop: bhatiaCamera._id, productName: 'Canon EOS R50 Mirrorless Camera Body', description: '24.2MP APS-C, 4K video, Dual Pixel AF', category: 'cameras', brand: 'Canon', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop', price: 59990, stock: 3, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: bhatiaCamera._id, productName: 'Nikon Z50 with 16-50mm Kit Lens', description: '20.9MP DX, 4K UHD, 209 AF points', category: 'cameras', brand: 'Nikon', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop', price: 72990, stock: 2, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: bhatiaCamera._id, productName: 'Sony Alpha A6400 with 16-50mm Lens', description: '24.2MP, 4K, real-time eye AF, flip screen', category: 'cameras', brand: 'Sony', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', price: 78990, stock: 2, unit: 'piece', analytics: { views: 167, clicks: 82 } },
      { shop: bhatiaCamera._id, productName: 'GoPro HERO12 Black Action Camera', description: '5.3K60, HyperSmooth 6.0, 10m waterproof', category: 'drones_action_cameras', brand: 'GoPro', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop', price: 39990, stock: 4, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: bhatiaCamera._id, productName: 'DJI Mini 4 Pro Drone', description: '4K/60fps, ActiveTrack 360, 34 min flight, 249g', category: 'drones_action_cameras', brand: 'DJI', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=300&fit=crop', price: 79990, stock: 2, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: bhatiaCamera._id, productName: 'TP-Link Archer AX73 WiFi 6 Router', description: 'AX5400, dual band, 6 antennas, HomeCare', category: 'routers_modems', brand: 'TP-Link', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=300&fit=crop', price: 6999, stock: 10, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: bhatiaCamera._id, productName: 'Amazon Echo Dot 5th Gen Smart Speaker', description: 'Alexa, improved bass, smart home hub', category: 'smart_home_devices', brand: 'Amazon', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop', price: 4499, stock: 15, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: bhatiaCamera._id, productName: 'Google Nest Hub 2nd Gen Smart Display', description: '7" display, Google Assistant, sleep sensing', category: 'smart_home_devices', brand: 'Google', image: 'https://images.unsplash.com/photo-1558089687-f282d8b1b0d3?w=300&h=300&fit=crop', price: 7999, stock: 6, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: bhatiaCamera._id, productName: 'Philips Hue White Ambiance Starter Kit', description: '3 bulbs + bridge, app control', category: 'smart_home_devices', brand: 'Philips', image: 'https://images.unsplash.com/photo-1558089687-f282d8b1b0d3?w=300&h=300&fit=crop', price: 8990, stock: 5, unit: 'set', analytics: { views: 98, clicks: 48 } },
      { shop: bhatiaCamera._id, productName: 'Canon PIXMA G3060 Ink Tank Printer', description: 'Print/scan/copy, WiFi, 6000 pages/bottle', category: 'printers', brand: 'Canon', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&h=300&fit=crop', price: 13990, stock: 6, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: bhatiaCamera._id, productName: 'Epson EcoTank L3250 Ink Tank Printer', description: 'WiFi, borderless print, 4500 pages black', category: 'printers', brand: 'Epson', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&h=300&fit=crop', price: 11990, stock: 5, unit: 'piece', analytics: { views: 98, clicks: 48 } },
    ]);

    console.log('✅ 130+ Products created with images');

    // ===================== REVIEWS =====================
    await Review.insertMany([
      { user: c1._id, shop: bajajAppliances._id, rating: 5, comment: 'Bought LG fridge from here. Ramesh bhai gave best price. Same day delivery!' },
      { user: c1._id, shop: guptaComputers._id, rating: 4, comment: 'Built my gaming PC from Gupta Computers. Good prices on GPUs.' },
      { user: c1._id, shop: raviElectronics._id, rating: 5, comment: 'Got iPhone 15 from here. Genuine products with bill. Very helpful.' },
      { user: c1._id, shop: yadavSports._id, rating: 4, comment: 'Good cricket bat collection. Got SG Nexus at great price.' },
      { user: c1._id, shop: kapoorWatchGallery._id, rating: 5, comment: 'Beautiful Titan watch collection. Kapoor saab is very trustworthy.' },
      { user: c1._id, shop: bhatiaCamera._id, rating: 4, comment: 'Bought Canon R50. Good advice on lenses. Competitive prices.' },
      { user: c2._id, shop: premChandKitchen._id, rating: 5, comment: 'Best kitchen store! Bought Preethi mixer. Prem Chand uncle is so sweet.' },
      { user: c2._id, shop: sharmaHardware._id, rating: 4, comment: 'Bought paints and tools for renovation. They have everything!' },
      { user: c2._id, shop: irfanAudio._id, rating: 5, comment: 'Amazing audio store! Tested Sony XM5 here. Irfan bhai knows his sound.' },
      { user: c2._id, shop: jainFitness._id, rating: 4, comment: 'Got yoga mat and fitness band. Good quality, reasonable prices.' },
      { user: c2._id, shop: geetaStationery._id, rating: 5, comment: 'My go-to for stationery. Geeta aunty always gives student discount!' },
      { user: c2._id, shop: malhotraGrooming._id, rating: 4, comment: 'Bought Philips trimmer and hair dryer. Knowledgeable staff.' },
      { user: c3._id, shop: bajajAppliances._id, rating: 4, comment: 'Got Samsung AC. Good after-sales service. Installation on time.' },
      { user: c3._id, shop: guptaComputers._id, rating: 5, comment: 'Best in Nehru Place! Got Corsair RAM at lowest price. Legend shop.' },
      { user: c3._id, shop: raviElectronics._id, rating: 4, comment: 'Bought Dell laptop. Good selection across all budgets.' },
      { user: c3._id, shop: irfanAudio._id, rating: 5, comment: 'JBL Bar 1000 sounds insane! They did full setup and wiring.' },
      { user: c3._id, shop: jainFitness._id, rating: 5, comment: 'Bought Hero bike. Jain saab assembled it free! Great service.' },
      { user: c3._id, shop: bhatiaCamera._id, rating: 4, comment: 'Got DJI Mini 4 Pro. Bhatia uncle gave demo in shop. Genuine!' },
    ]);

    console.log('✅ 18 Reviews created');

    console.log('\n========================================');
    console.log('🎉 SEED COMPLETE — Near By Store');
    console.log('========================================');
    console.log('📊 15 Users | 12 Shops | 130+ Products | 18 Reviews');
    console.log('🗺️  All shops within 2km of Connaught Place, Delhi');
    console.log('🖼️  All shops & products have images');
    console.log('🗺️  Using Geoapify Maps');
    console.log('========================================');
    console.log('\n📋 CUSTOMER ACCOUNTS:');
    console.log('  rahul@example.com / password123');
    console.log('  priya@example.com / password123');
    console.log('  ankit@example.com / password123');
    console.log('\n📋 RETAILER ACCOUNTS:');
    console.log('  ramesh.bajaj@example.com → Bajaj Home Appliances');
    console.log('  premchand@example.com → Prem Chand Kitchen Emporium');
    console.log('  vinod.gupta@example.com → Gupta Computers & Hardware');
    console.log('  harbans@example.com → Sharma & Sons Hardware Store');
    console.log('  ravi.kapoor@example.com → Ravi Electronics Emporium');
    console.log('  irfan@example.com → Irfan Sound & Music House');
    console.log('  dharamvir@example.com → Yadav Sports Bhandar');
    console.log('  sunil.jain@example.com → Jain Fitness & Gym Equipment');
    console.log('  manish.kapoor@example.com → Kapoor Watch Gallery');
    console.log('  geeta.devi@example.com → Geeta Book Depot & Stationery');
    console.log('  arun.malhotra@example.com → Malhotra Personal Care');
    console.log('  satish.bhatia@example.com → Bhatia Camera House');
    console.log('  (All passwords: password123)');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
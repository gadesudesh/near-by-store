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

    // =============================================
    // CUSTOMERS
    // =============================================
    const c1 = await User.create({ name: 'Rahul Kumar', email: 'rahul@example.com', password: 'password123', role: 'customer', phone: '9876543210' });
    const c2 = await User.create({ name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', role: 'customer', phone: '9876543211' });
    const c3 = await User.create({ name: 'Ankit Joshi', email: 'ankit@example.com', password: 'password123', role: 'customer', phone: '9876543224' });

    // =============================================
    // RETAILERS (12 shop owners)
    // =============================================
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

    console.log('✅ Users created (15 total — 3 customers, 12 retailers)');

    // =============================================
    // SHOPS — Real Indian Market Names
    // =============================================

    const bajajAppliances = await Shop.create({
      owner: r1._id,
      shopName: 'Bajaj Home Appliances',
      description: 'Since 1985. Refrigerators, ACs, washing machines, water purifiers, geysers, fans and TVs. Authorized dealer for LG, Samsung, Whirlpool & Godrej.',
      address: 'Shop No. 23, Main Market, Lajpat Nagar-II, New Delhi - 110024',
      phone: '011-29831001',
      category: 'home_appliances',
      location: { type: 'Point', coordinates: [77.2373, 28.5700] },
      analytics: { views: 320, clicks: 145 }
    });

    const premChandKitchen = await Shop.create({
      owner: r2._id,
      shopName: 'Prem Chand Kitchen Emporium',
      description: 'Karol Bagh\'s trusted kitchen store. Mixer grinders, microwaves, cooktops, kettles, vacuum cleaners and all kitchen needs since 1992.',
      address: 'Shop No. 56, Ajmal Khan Road, Karol Bagh, New Delhi - 110005',
      phone: '011-25721002',
      category: 'home_appliances',
      location: { type: 'Point', coordinates: [77.1903, 28.6519] },
      analytics: { views: 275, clicks: 130 }
    });

    const guptaComputers = await Shop.create({
      owner: r3._id,
      shopName: 'Gupta Computers & Hardware',
      description: 'Nehru Place\'s leading computer hardware shop. Processors, GPUs, RAM, SSDs, monitors, keyboards, gaming peripherals. Custom PC builds.',
      address: 'Shop No. 312, Sathy Complex, Nehru Place, New Delhi - 110019',
      phone: '011-26441003',
      category: 'hardware',
      location: { type: 'Point', coordinates: [77.2513, 28.5491] },
      analytics: { views: 510, clicks: 289 }
    });

    const sharmaHardware = await Shop.create({
      owner: r4._id,
      shopName: 'Sharma & Sons Hardware Store',
      description: 'Three generations of hardware. Power tools, hand tools, locks, pipes, electrical fittings, paints. Chandni Chowk since 1964.',
      address: 'Shop No. 89, Nai Sarak, Chandni Chowk, Old Delhi - 110006',
      phone: '011-23921004',
      category: 'hardware',
      location: { type: 'Point', coordinates: [77.2307, 28.6506] },
      analytics: { views: 180, clicks: 78 }
    });

    const raviElectronics = await Shop.create({
      owner: r5._id,
      shopName: 'Ravi Electronics Emporium',
      description: 'CP\'s biggest electronics store. Smartphones, laptops, tablets, smartwatches, power banks. Apple, Samsung, OnePlus authorized reseller.',
      address: 'Shop No. 34, Palika Bazaar, Connaught Place, New Delhi - 110001',
      phone: '011-23411005',
      category: 'electronics',
      location: { type: 'Point', coordinates: [77.2195, 28.6328] },
      analytics: { views: 620, clicks: 345 }
    });

    const irfanAudio = await Shop.create({
      owner: r6._id,
      shopName: 'Irfan Sound & Music House',
      description: 'Premium audio since 1998. Headphones, earbuds, Bluetooth speakers, soundbars, home theaters, projectors. Sony, JBL, Bose dealer.',
      address: 'Shop No. 67, Main Market, Rajouri Garden, New Delhi - 110027',
      phone: '011-25101006',
      category: 'electronics',
      location: { type: 'Point', coordinates: [77.1219, 28.6492] },
      analytics: { views: 290, clicks: 156 }
    });

    const yadavSports = await Shop.create({
      owner: r7._id,
      shopName: 'Yadav Sports Bhandar',
      description: 'Delhi\'s favourite sports shop. Cricket, football, badminton, tennis, hockey equipment. SG, Yonex, Nike, Adidas stockist.',
      address: 'Shop No. 45, Community Centre, Saket, New Delhi - 110017',
      phone: '011-29561007',
      category: 'sports',
      location: { type: 'Point', coordinates: [77.2177, 28.5245] },
      analytics: { views: 410, clicks: 198 }
    });

    const jainFitness = await Shop.create({
      owner: r8._id,
      shopName: 'Jain Fitness & Gym Equipment',
      description: 'Complete fitness solutions. Dumbbells, treadmills, yoga mats, cycling gear, swimming accessories, fitness bands and gym wear.',
      address: 'Shop No. 22, Sector 6 Market, Dwarka, New Delhi - 110075',
      phone: '011-28081008',
      category: 'fitness',
      location: { type: 'Point', coordinates: [77.0688, 28.5921] },
      analytics: { views: 345, clicks: 167 }
    });

    const kapoorWatchGallery = await Shop.create({
      owner: r9._id,
      shopName: 'Kapoor Watch Gallery & Accessories',
      description: 'Finest watches, sunglasses, wallets, belts, bags, jewelry. Titan, Fossil, Ray-Ban, Samsonite authorized dealer since 1978.',
      address: 'Shop No. 78, M Block Market, South Extension Part-I, New Delhi - 110049',
      phone: '011-24621009',
      category: 'accessories',
      location: { type: 'Point', coordinates: [77.2226, 28.5775] },
      analytics: { views: 390, clicks: 210 }
    });

    const geetaStationery = await Shop.create({
      owner: r10._id,
      shopName: 'Geeta Book Depot & Stationery',
      description: 'Everything for students and office. Pens, notebooks, water bottles, flasks, eyewear, school supplies. Classmate, Parker dealer.',
      address: 'Shop No. 15, Main Road, Preet Vihar, New Delhi - 110092',
      phone: '011-22051010',
      category: 'stationery',
      location: { type: 'Point', coordinates: [77.2951, 28.6381] },
      analytics: { views: 210, clicks: 95 }
    });

    const malhotraGrooming = await Shop.create({
      owner: r11._id,
      shopName: 'Malhotra Personal Care & Grooming',
      description: 'Trimmers, shavers, hair dryers, straighteners, electric toothbrushes, perfumes, deodorants. Philips, Braun authorized service.',
      address: 'Shop No. 33, Vasant Square Mall, Vasant Kunj, New Delhi - 110070',
      phone: '011-26891011',
      category: 'personal_care',
      location: { type: 'Point', coordinates: [77.1590, 28.5186] },
      analytics: { views: 175, clicks: 82 }
    });

    const bhatiaCamera = await Shop.create({
      owner: r12._id,
      shopName: 'Bhatia Camera House & Smart Home',
      description: 'DSLR cameras, drones, action cameras, routers, smart home devices. Canon, Nikon, GoPro, DJI dealer. Janakpuri since 1990.',
      address: 'Shop No. 90, C-1 Market, Janakpuri, New Delhi - 110058',
      phone: '011-25521012',
      category: 'electronics',
      location: { type: 'Point', coordinates: [77.0857, 28.6289] },
      analytics: { views: 260, clicks: 134 }
    });

    console.log('✅ 12 Shops created with real Indian names');

    // =============================================
    // PRODUCTS — 120+ products across all 12 shops
    // =============================================

    await Product.insertMany([

      // ============================================================
      // BAJAJ HOME APPLIANCES — Lajpat Nagar
      // Refrigerators, Washing Machines, ACs, Water Purifiers,
      // Water Heaters, Electric Fans, Televisions
      // ============================================================
      { shop: bajajAppliances._id, productName: 'LG 260L Double Door Refrigerator', description: 'Smart Inverter Compressor, frost-free, convertible', category: 'refrigerators', brand: 'LG', price: 28990, stock: 8, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: bajajAppliances._id, productName: 'Samsung 253L Frost Free Refrigerator', description: 'Digital Inverter Technology, all-around cooling', category: 'refrigerators', brand: 'Samsung', price: 26490, stock: 6, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: bajajAppliances._id, productName: 'Whirlpool 190L Single Door Fridge', description: 'Direct cool, stabilizer free, ice twister', category: 'refrigerators', brand: 'Whirlpool', price: 14990, stock: 12, unit: 'piece', analytics: { views: 56, clicks: 23 } },
      { shop: bajajAppliances._id, productName: 'Godrej 236L Double Door Refrigerator', description: 'Intelligent inverter, cool balance technology', category: 'refrigerators', brand: 'Godrej', price: 22490, stock: 5, unit: 'piece', analytics: { views: 34, clicks: 15 } },
      { shop: bajajAppliances._id, productName: 'Haier 195L Direct Cool Refrigerator', description: 'Stabilizer free, diamond edge freezing', category: 'refrigerators', brand: 'Haier', price: 13990, stock: 9, unit: 'piece', analytics: { views: 42, clicks: 19 } },

      { shop: bajajAppliances._id, productName: 'Bosch 7kg Front Load Washing Machine', description: 'Anti-vibration design, 1200 RPM, EcoSilence', category: 'washing_machines', brand: 'Bosch', price: 32990, stock: 4, unit: 'piece', analytics: { views: 67, clicks: 30 } },
      { shop: bajajAppliances._id, productName: 'IFB 6.5kg Front Load Washer', description: 'Aqua Energie, cradle wash, 2D wash', category: 'washing_machines', brand: 'IFB', price: 27490, stock: 6, unit: 'piece', analytics: { views: 55, clicks: 28 } },
      { shop: bajajAppliances._id, productName: 'LG 8kg Top Load Washing Machine', description: 'Smart Inverter, TurboDrum, auto restart', category: 'washing_machines', brand: 'LG', price: 21990, stock: 7, unit: 'piece', analytics: { views: 72, clicks: 35 } },
      { shop: bajajAppliances._id, productName: 'Samsung 7kg Semi-Automatic Washer', description: 'Air turbo drying, rust-proof body', category: 'washing_machines', brand: 'Samsung', price: 11490, stock: 10, unit: 'piece', analytics: { views: 48, clicks: 22 } },

      { shop: bajajAppliances._id, productName: 'Voltas 1.5 Ton 3 Star Split AC', description: 'Copper condenser, high ambient cooling 52°C', category: 'air_conditioners', brand: 'Voltas', price: 33990, stock: 10, unit: 'piece', analytics: { views: 120, clicks: 56 } },
      { shop: bajajAppliances._id, productName: 'LG 1.5 Ton 5 Star Inverter Split AC', description: 'Dual Inverter, Wi-Fi, Himalaya Cool', category: 'air_conditioners', brand: 'LG', price: 42990, stock: 5, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: bajajAppliances._id, productName: 'Daikin 1 Ton 3 Star Split AC', description: 'Power chill, PM2.5 filter, Coanda airflow', category: 'air_conditioners', brand: 'Daikin', price: 35490, stock: 4, unit: 'piece', analytics: { views: 76, clicks: 32 } },
      { shop: bajajAppliances._id, productName: 'Blue Star 1.5 Ton 5 Star Inverter AC', description: 'Precision cooling, self-clean, turbo cool', category: 'air_conditioners', brand: 'Blue Star', price: 44990, stock: 3, unit: 'piece', analytics: { views: 65, clicks: 30 } },

      { shop: bajajAppliances._id, productName: 'Kent Grand Plus RO Water Purifier', description: 'RO+UV+UF, 8 litre storage, mineral ROTM', category: 'water_purifiers', brand: 'Kent', price: 18500, stock: 15, unit: 'piece', analytics: { views: 89, clicks: 44 } },
      { shop: bajajAppliances._id, productName: 'Aquaguard Aura RO+UV Purifier', description: '7 litre, mineral guard, copper+ tech', category: 'water_purifiers', brand: 'Aquaguard', price: 16990, stock: 10, unit: 'piece', analytics: { views: 65, clicks: 30 } },
      { shop: bajajAppliances._id, productName: 'Livpure Glo Star RO Purifier', description: 'RO+UV+UF+Mineraliser, 7 stage, 7 litre', category: 'water_purifiers', brand: 'Livpure', price: 11990, stock: 8, unit: 'piece', analytics: { views: 45, clicks: 20 } },

      { shop: bajajAppliances._id, productName: 'Bajaj New Shakti 15L Water Heater', description: 'Glass lined tank, 4 star BEE rating', category: 'water_heaters', brand: 'Bajaj', price: 6490, stock: 20, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: bajajAppliances._id, productName: 'AO Smith 25L Storage Geyser', description: 'Blue diamond glass lined, 5 star rated', category: 'water_heaters', brand: 'AO Smith', price: 12490, stock: 8, unit: 'piece', analytics: { views: 38, clicks: 18 } },

      { shop: bajajAppliances._id, productName: 'Crompton High Flo Eva Ceiling Fan', description: '1200mm, 53 watts, anti-dust coating', category: 'electric_fans', brand: 'Crompton', price: 1590, stock: 25, unit: 'piece', analytics: { views: 67, clicks: 34 } },
      { shop: bajajAppliances._id, productName: 'Havells Festiva 1200mm Ceiling Fan', description: 'Decorative, dust resistant, copper motor', category: 'electric_fans', brand: 'Havells', price: 2190, stock: 18, unit: 'piece', analytics: { views: 54, clicks: 26 } },
      { shop: bajajAppliances._id, productName: 'Orient Electric Ujala Air Ceiling Fan', description: '1200mm, aerodynamic blade, 50W', category: 'electric_fans', brand: 'Orient', price: 1390, stock: 20, unit: 'piece', analytics: { views: 43, clicks: 20 } },

      { shop: bajajAppliances._id, productName: 'Samsung 55 inch Crystal 4K Smart TV', description: 'Crystal Processor 4K, HDR, Smart Hub', category: 'televisions', brand: 'Samsung', price: 47990, stock: 3, unit: 'piece', analytics: { views: 145, clicks: 67 } },
      { shop: bajajAppliances._id, productName: 'Xiaomi Mi 43 inch Smart TV 5A', description: 'Full HD, Android TV, 20W speakers, Vivid Picture', category: 'televisions', brand: 'Xiaomi', price: 23999, stock: 7, unit: 'piece', analytics: { views: 112, clicks: 55 } },
      { shop: bajajAppliances._id, productName: 'Sony Bravia 50 inch 4K Google TV', description: 'X1 processor, Triluminos Pro, Dolby Vision', category: 'televisions', brand: 'Sony', price: 56990, stock: 2, unit: 'piece', analytics: { views: 98, clicks: 48 } },


      // ============================================================
      // PREM CHAND KITCHEN EMPORIUM — Karol Bagh
      // Mixer Grinders, Juicers, Food Processors, Kettles,
      // Microwaves, Cooktops/Gas Stoves, Vacuum Cleaners
      // ============================================================
      { shop: premChandKitchen._id, productName: 'Preethi Zodiac MG 218 Mixer Grinder', description: '750W, 5 jars, master chef jar included', category: 'kitchen_appliances', brand: 'Preethi', price: 6490, stock: 15, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: premChandKitchen._id, productName: 'Bajaj Rex 500W Mixer Grinder', description: '3 jars, multi-purpose grinding & mixing', category: 'kitchen_appliances', brand: 'Bajaj', price: 2290, stock: 25, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: premChandKitchen._id, productName: 'Philips HL7756 750W Mixer Grinder', description: '3 jars, turbo motor, leak-proof', category: 'kitchen_appliances', brand: 'Philips', price: 3690, stock: 18, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: premChandKitchen._id, productName: 'Sujata Dynamix 900W Mixer Grinder', description: 'Heavy duty motor, 3 jars, double ball bearing', category: 'kitchen_appliances', brand: 'Sujata', price: 4490, stock: 10, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: premChandKitchen._id, productName: 'Panasonic MX-AV325 600W Mixer Grinder', description: '3 jars, samurai edge blades', category: 'kitchen_appliances', brand: 'Panasonic', price: 3190, stock: 12, unit: 'piece', analytics: { views: 45, clicks: 22 } },

      { shop: premChandKitchen._id, productName: 'Philips Viva Collection HR1863 Juicer', description: '700W, quick clean, 2L pulp container', category: 'kitchen_appliances', brand: 'Philips', price: 5490, stock: 8, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: premChandKitchen._id, productName: 'Havells Stilus 500W Juicer Mixer Grinder', description: '2 speed, stainless steel mesh, 3 jars', category: 'kitchen_appliances', brand: 'Havells', price: 3790, stock: 12, unit: 'piece', analytics: { views: 38, clicks: 18 } },
      { shop: premChandKitchen._id, productName: 'Morphy Richards Vitae 500W Juicer', description: 'Centrifugal, stainless steel filter, 1.25L', category: 'kitchen_appliances', brand: 'Morphy Richards', price: 3290, stock: 7, unit: 'piece', analytics: { views: 34, clicks: 16 } },

      { shop: premChandKitchen._id, productName: 'Bosch TrueMixx Pro 1000W Food Processor', description: '30+ functions, 4 jars, citrus press', category: 'kitchen_appliances', brand: 'Bosch', price: 8990, stock: 5, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: premChandKitchen._id, productName: 'Kenwood FDM307SS Food Processor', description: '800W, 2.1L bowl, variable speed, multi-mill', category: 'kitchen_appliances', brand: 'Kenwood', price: 7490, stock: 4, unit: 'piece', analytics: { views: 34, clicks: 16 } },

      { shop: premChandKitchen._id, productName: 'Bajaj Majesty 1.7L Electric Kettle', description: 'Stainless steel, auto shut-off, cool touch handle', category: 'kitchen_appliances', brand: 'Bajaj', price: 899, stock: 30, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: premChandKitchen._id, productName: 'Morphy Richards Instacook 1.8L Kettle', description: '1500W, cool touch body, cordless, 360° base', category: 'kitchen_appliances', brand: 'Morphy Richards', price: 1290, stock: 20, unit: 'piece', analytics: { views: 34, clicks: 16 } },
      { shop: premChandKitchen._id, productName: 'Philips HD9306 1.5L Electric Kettle', description: 'Food grade stainless steel, spring lid, 1800W', category: 'kitchen_appliances', brand: 'Philips', price: 1490, stock: 15, unit: 'piece', analytics: { views: 38, clicks: 18 } },

      { shop: premChandKitchen._id, productName: 'IFB 25L Convection Microwave Oven', description: '300+ auto cook menus, rotisserie, child lock', category: 'microwave_ovens', brand: 'IFB', price: 13490, stock: 6, unit: 'piece', analytics: { views: 78, clicks: 34 } },
      { shop: premChandKitchen._id, productName: 'Samsung 28L Convection Microwave', description: 'SlimFry, Tandoor technology, ceramic cavity', category: 'microwave_ovens', brand: 'Samsung', price: 14990, stock: 5, unit: 'piece', analytics: { views: 65, clicks: 30 } },
      { shop: premChandKitchen._id, productName: 'LG 32L Charcoal Convection Microwave', description: 'Charcoal lighting heater, 211 auto cook menus', category: 'microwave_ovens', brand: 'LG', price: 16990, stock: 4, unit: 'piece', analytics: { views: 56, clicks: 25 } },
      { shop: premChandKitchen._id, productName: 'Panasonic 27L Convection Microwave', description: '101 menus, vapour clean, 360° heat wrap', category: 'microwave_ovens', brand: 'Panasonic', price: 12490, stock: 5, unit: 'piece', analytics: { views: 45, clicks: 20 } },

      { shop: premChandKitchen._id, productName: 'Prestige Iris 3 Burner Gas Stove', description: 'Toughened glass top, brass burners, ISI certified', category: 'cooktops_stoves', brand: 'Prestige', price: 3890, stock: 10, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: premChandKitchen._id, productName: 'Philips Viva 2100W Induction Cooktop', description: 'Crystal glass, auto-off, sensor touch buttons', category: 'cooktops_stoves', brand: 'Philips', price: 2490, stock: 15, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: premChandKitchen._id, productName: 'Pigeon Favourite 2 Burner Gas Stove', description: 'Stainless steel, ISI certified, powder coated', category: 'cooktops_stoves', brand: 'Pigeon', price: 1890, stock: 22, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: premChandKitchen._id, productName: 'Bajaj ICX 130 Induction Cooktop', description: '1300W, pan sensor, anti-magnetic wall', category: 'cooktops_stoves', brand: 'Bajaj', price: 1790, stock: 18, unit: 'piece', analytics: { views: 56, clicks: 25 } },

      { shop: premChandKitchen._id, productName: 'Eureka Forbes Quick Clean DX Vacuum', description: '1200W, multi-surface, reusable dust bag', category: 'vacuum_cleaners', brand: 'Eureka Forbes', price: 4990, stock: 8, unit: 'piece', analytics: { views: 34, clicks: 16 } },
      { shop: premChandKitchen._id, productName: 'Philips PowerPro FC9352 Vacuum', description: 'Bagless, PowerCyclone 5, HEPA filter, 370W suction', category: 'vacuum_cleaners', brand: 'Philips', price: 8990, stock: 5, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: premChandKitchen._id, productName: 'Dyson V8 Absolute Cordless Vacuum', description: 'Motorhead, 40 min run time, HEPA filtration', category: 'vacuum_cleaners', brand: 'Dyson', price: 35900, stock: 2, unit: 'piece', analytics: { views: 78, clicks: 38 } },


      // ============================================================
      // GUPTA COMPUTERS & HARDWARE — Nehru Place
      // CPUs, GPUs, RAM, SSDs, HDDs, PSUs, Monitors,
      // Keyboards, Mice, Cases, Coolers
      // ============================================================
      { shop: guptaComputers._id, productName: 'Intel Core i5-13400F Processor', description: '10 cores, 16 threads, 4.6GHz boost, LGA 1700', category: 'computer_hardware', brand: 'Intel', price: 15490, stock: 12, unit: 'piece', analytics: { views: 189, clicks: 98 } },
      { shop: guptaComputers._id, productName: 'AMD Ryzen 5 5600X Processor', description: '6 cores, 12 threads, 4.6GHz, AM4, Wraith cooler', category: 'computer_hardware', brand: 'AMD', price: 13990, stock: 10, unit: 'piece', analytics: { views: 167, clicks: 89 } },
      { shop: guptaComputers._id, productName: 'Intel Core i7-13700K Processor', description: '16 cores, 24 threads, 5.4GHz, unlocked', category: 'computer_hardware', brand: 'Intel', price: 32990, stock: 5, unit: 'piece', analytics: { views: 134, clicks: 72 } },

      { shop: guptaComputers._id, productName: 'ASUS ROG Strix B550-F Motherboard', description: 'ATX, AM4, WiFi 6, PCIe 4.0, 2.5Gb LAN', category: 'computer_hardware', brand: 'ASUS', price: 16990, stock: 7, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: guptaComputers._id, productName: 'Gigabyte B660M DS3H DDR4 Motherboard', description: 'Micro ATX, LGA 1700, PCIe 4.0, M.2', category: 'computer_hardware', brand: 'Gigabyte', price: 9490, stock: 10, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: guptaComputers._id, productName: 'MSI MAG B550 TOMAHAWK Motherboard', description: 'ATX, AM4, Flash BIOS, 2.5G LAN', category: 'computer_hardware', brand: 'MSI', price: 14490, stock: 6, unit: 'piece', analytics: { views: 89, clicks: 45 } },

      { shop: guptaComputers._id, productName: 'Corsair Vengeance 16GB DDR4 RAM', description: '3200MHz, dual channel kit (2x8GB), XMP 2.0', category: 'computer_hardware', brand: 'Corsair', price: 3490, stock: 25, unit: 'piece', analytics: { views: 145, clicks: 78 } },
      { shop: guptaComputers._id, productName: 'Kingston Fury Beast 16GB DDR4 RAM', description: '3200MHz, heat spreader, Intel XMP ready', category: 'computer_hardware', brand: 'Kingston', price: 3290, stock: 20, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: guptaComputers._id, productName: 'G.Skill Trident Z RGB 32GB DDR4', description: '3600MHz, (2x16GB), RGB lighting', category: 'computer_hardware', brand: 'G.Skill', price: 8990, stock: 8, unit: 'piece', analytics: { views: 98, clicks: 50 } },

      { shop: guptaComputers._id, productName: 'Samsung 970 EVO Plus 1TB NVMe SSD', description: '3500MB/s read, V-NAND, 5 year warranty', category: 'computer_hardware', brand: 'Samsung', price: 6490, stock: 20, unit: 'piece', analytics: { views: 198, clicks: 112 } },
      { shop: guptaComputers._id, productName: 'WD Blue 1TB SATA Hard Disk', description: '7200 RPM, 64MB cache, 2 year warranty', category: 'computer_hardware', brand: 'Western Digital', price: 2990, stock: 30, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: guptaComputers._id, productName: 'Kingston A2000 500GB NVMe SSD', description: '2200MB/s read, XTS-AES 256-bit encryption', category: 'computer_hardware', brand: 'Kingston', price: 3490, stock: 18, unit: 'piece', analytics: { views: 112, clicks: 58 } },
      { shop: guptaComputers._id, productName: 'Seagate Barracuda 2TB SATA HDD', description: '7200 RPM, 256MB cache, multi-tier caching', category: 'computer_hardware', brand: 'Seagate', price: 4490, stock: 15, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      { shop: guptaComputers._id, productName: 'NVIDIA GeForce RTX 4060 8GB GPU', description: 'DLSS 3.0, ray tracing, PCIe 4.0, 115W', category: 'computer_hardware', brand: 'NVIDIA', price: 29990, stock: 4, unit: 'piece', analytics: { views: 345, clicks: 189 } },
      { shop: guptaComputers._id, productName: 'ASUS Dual RTX 4070 OC 12GB GPU', description: 'Axial-tech fans, 0dB technology, DLSS 3', category: 'computer_hardware', brand: 'ASUS', price: 52990, stock: 3, unit: 'piece', analytics: { views: 267, clicks: 145 } },
      { shop: guptaComputers._id, productName: 'MSI Gaming X RTX 4060 Ti 8GB GPU', description: 'TORX Fan 5.0, 8GB GDDR6, ray tracing', category: 'computer_hardware', brand: 'MSI', price: 38990, stock: 3, unit: 'piece', analytics: { views: 198, clicks: 98 } },

      { shop: guptaComputers._id, productName: 'Corsair CV650 Power Supply 650W', description: '80+ Bronze, non-modular, 120mm fan', category: 'computer_hardware', brand: 'Corsair', price: 4490, stock: 15, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: guptaComputers._id, productName: 'Cooler Master MWE 750W PSU', description: '80+ Gold, fully modular, 120mm HDB fan', category: 'computer_hardware', brand: 'Cooler Master', price: 7490, stock: 8, unit: 'piece', analytics: { views: 67, clicks: 32 } },

      { shop: guptaComputers._id, productName: 'Dell S2422HG 24" Curved Gaming Monitor', description: '165Hz, FHD, 1ms, AMD FreeSync Premium', category: 'computer_hardware', brand: 'Dell', price: 14990, stock: 6, unit: 'piece', analytics: { views: 123, clicks: 67 } },
      { shop: guptaComputers._id, productName: 'LG 27" UltraGear QHD Monitor 27GP850', description: '165Hz, Nano IPS, 1ms, G-Sync compatible', category: 'computer_hardware', brand: 'LG', price: 26990, stock: 4, unit: 'piece', analytics: { views: 145, clicks: 78 } },
      { shop: guptaComputers._id, productName: 'Samsung 24" FHD IPS Monitor LS24C330', description: '75Hz, IPS, borderless, FreeSync, HDMI', category: 'computer_hardware', brand: 'Samsung', price: 8990, stock: 10, unit: 'piece', analytics: { views: 89, clicks: 42 } },

      { shop: guptaComputers._id, productName: 'Logitech G102 Lightsync Gaming Mouse', description: '8000 DPI, RGB, 6 programmable buttons', category: 'computer_hardware', brand: 'Logitech', price: 1295, stock: 40, unit: 'piece', analytics: { views: 167, clicks: 89 } },
      { shop: guptaComputers._id, productName: 'Razer DeathAdder V3 Gaming Mouse', description: '30000 DPI, Focus Pro sensor, 90hr battery', category: 'computer_hardware', brand: 'Razer', price: 9990, stock: 6, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: guptaComputers._id, productName: 'Razer BlackWidow V3 Mechanical Keyboard', description: 'Green switches, RGB Chroma, media keys', category: 'computer_hardware', brand: 'Razer', price: 8490, stock: 8, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: guptaComputers._id, productName: 'Corsair K70 RGB PRO Keyboard', description: 'Cherry MX Red, polycarbonate keycaps, 8000Hz', category: 'computer_hardware', brand: 'Corsair', price: 12990, stock: 5, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: guptaComputers._id, productName: 'Redgear Shadow Amulet Keyboard', description: 'Semi-mechanical, Rainbow backlit, INR budget king', category: 'computer_hardware', brand: 'Redgear', price: 999, stock: 30, unit: 'piece', analytics: { views: 234, clicks: 120 } },

      { shop: guptaComputers._id, productName: 'Cooler Master Hyper 212 CPU Cooler', description: '4 heat pipes, 120mm fan, universal mount', category: 'computer_hardware', brand: 'Cooler Master', price: 2890, stock: 12, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: guptaComputers._id, productName: 'NZXT H510 Mid Tower Cabinet', description: 'Tempered glass, cable management, 2 fans included', category: 'computer_hardware', brand: 'NZXT', price: 6990, stock: 6, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: guptaComputers._id, productName: 'Corsair 4000D Airflow Mid Tower Case', description: 'Tempered glass, front mesh, 2x 120mm fans', category: 'computer_hardware', brand: 'Corsair', price: 8490, stock: 5, unit: 'piece', analytics: { views: 78, clicks: 38 } },


      // ============================================================
      // SHARMA & SONS HARDWARE STORE — Chandni Chowk
      // Power Tools, Hand Tools, Locks, Pipes, Electrical,
      // Paint, Fasteners
      // ============================================================
      { shop: sharmaHardware._id, productName: 'Bosch GSB 550 Impact Drill Kit', description: '550W, 13mm chuck, variable speed, 100pc kit', category: 'power_tools', brand: 'Bosch', price: 3490, stock: 15, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: sharmaHardware._id, productName: 'Black+Decker 20V Cordless Drill Driver', description: 'Lithium-ion, LED light, 10mm keyless chuck', category: 'power_tools', brand: 'Black+Decker', price: 4990, stock: 8, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: sharmaHardware._id, productName: 'Makita M0801B 850W Angle Grinder', description: '100mm disc, side handle, labyrinth construction', category: 'power_tools', brand: 'Makita', price: 2890, stock: 12, unit: 'piece', analytics: { views: 45, clicks: 22 } },
      { shop: sharmaHardware._id, productName: 'Dewalt DW331K Jigsaw 701W', description: 'Variable speed, keyless blade change, dust blower', category: 'power_tools', brand: 'Dewalt', price: 8990, stock: 5, unit: 'piece', analytics: { views: 34, clicks: 16 } },

      { shop: sharmaHardware._id, productName: 'Stanley 8-Piece Screwdriver Set', description: 'Chrome vanadium steel, cushion grip handle', category: 'hand_tools', brand: 'Stanley', price: 790, stock: 30, unit: 'set', analytics: { views: 78, clicks: 38 } },
      { shop: sharmaHardware._id, productName: 'Taparia 1621 Combination Plier 8"', description: 'Hardened cutting edge, insulated handle', category: 'hand_tools', brand: 'Taparia', price: 320, stock: 50, unit: 'piece', analytics: { views: 45, clicks: 20 } },
      { shop: sharmaHardware._id, productName: 'Bosch Professional Hammer 500g', description: 'Fibreglass handle, anti-vibration', category: 'hand_tools', brand: 'Bosch', price: 690, stock: 25, unit: 'piece', analytics: { views: 34, clicks: 15 } },
      { shop: sharmaHardware._id, productName: 'Stanley Adjustable Wrench 10"', description: 'Chrome vanadium, metric scale jaw', category: 'hand_tools', brand: 'Stanley', price: 590, stock: 20, unit: 'piece', analytics: { views: 28, clicks: 12 } },

      { shop: sharmaHardware._id, productName: 'Godrej NavTal 7 Lever Padlock', description: 'Hardened shackle, 3 keys, anti-rust body', category: 'locks_security', brand: 'Godrej', price: 590, stock: 40, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: sharmaHardware._id, productName: 'Yale Essential 6-Pin Deadbolt Lock', description: 'Anti-pick, anti-bump, satin nickel finish', category: 'locks_security', brand: 'Yale', price: 2490, stock: 10, unit: 'piece', analytics: { views: 34, clicks: 16 } },
      { shop: sharmaHardware._id, productName: 'Hettich Sensys Soft Close Hinge', description: '110° opening, clip-on, integrated silent damper', category: 'locks_security', brand: 'Hettich', price: 380, stock: 60, unit: 'piece', analytics: { views: 23, clicks: 10 } },
      { shop: sharmaHardware._id, productName: 'Hafele Sliding Door Track System', description: 'Aluminium, soft-close, 50kg load capacity', category: 'locks_security', brand: 'Hafele', price: 3490, stock: 8, unit: 'set', analytics: { views: 28, clicks: 12 } },

      { shop: sharmaHardware._id, productName: 'Finolex 1 inch CPVC Pipe 3 Metre', description: 'Hot & cold water, ISI certified, Schedule 80', category: 'pipes_fittings', brand: 'Finolex', price: 490, stock: 100, unit: 'piece', analytics: { views: 34, clicks: 14 } },
      { shop: sharmaHardware._id, productName: 'Astral CPVC Elbow Fitting 1/2"', description: 'Lead free, IS 15778 certified', category: 'pipes_fittings', brand: 'Astral', price: 35, stock: 200, unit: 'piece', analytics: { views: 23, clicks: 8 } },
      { shop: sharmaHardware._id, productName: 'Supreme SWR Pipe 4" (3 Metre)', description: 'Soil waste rain water, ring fit joint', category: 'pipes_fittings', brand: 'Supreme', price: 890, stock: 50, unit: 'piece', analytics: { views: 28, clicks: 12 } },

      { shop: sharmaHardware._id, productName: 'Havells Pearlz 16A Modular Switch', description: 'Polycarbonate body, silver alloy contacts', category: 'electrical_hardware', brand: 'Havells', price: 120, stock: 200, unit: 'piece', analytics: { views: 89, clicks: 45 } },
      { shop: sharmaHardware._id, productName: 'Schneider Electric Acti9 32A MCB', description: 'Single pole, C curve, 10kA breaking capacity', category: 'electrical_hardware', brand: 'Schneider', price: 290, stock: 80, unit: 'piece', analytics: { views: 56, clicks: 25 } },
      { shop: sharmaHardware._id, productName: 'Anchor Roma 6A 2-Way Switch', description: 'Modular, ISI marked, polycarbonate', category: 'electrical_hardware', brand: 'Anchor', price: 65, stock: 300, unit: 'piece', analytics: { views: 67, clicks: 30 } },
      { shop: sharmaHardware._id, productName: 'Legrand Myrius 16A Socket', description: '3 pin, modular, shuttered, child safe', category: 'electrical_hardware', brand: 'Legrand', price: 180, stock: 150, unit: 'piece', analytics: { views: 45, clicks: 20 } },

      { shop: sharmaHardware._id, productName: 'Asian Paints Apcolite Premium Emulsion 4L', description: 'Interior walls, washable, smooth finish, 200+ shades', category: 'paint_coatings', brand: 'Asian Paints', price: 1690, stock: 25, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: sharmaHardware._id, productName: 'Berger Silk Glamour Emulsion 4L', description: 'Luxury finish, anti-fade, low VOC, fungus resistant', category: 'paint_coatings', brand: 'Berger', price: 1890, stock: 20, unit: 'piece', analytics: { views: 45, clicks: 20 } },
      { shop: sharmaHardware._id, productName: 'Nerolac Excel Mica Marble 10L', description: 'Exterior, mica marble finish, anti-algal', category: 'paint_coatings', brand: 'Nerolac', price: 4890, stock: 10, unit: 'piece', analytics: { views: 34, clicks: 15 } },
      { shop: sharmaHardware._id, productName: 'Dulux Velvet Touch Diamond Glow 4L', description: 'Ultra luxury, anti-bacterial, diamond finish', category: 'paint_coatings', brand: 'Dulux', price: 2190, stock: 15, unit: 'piece', analytics: { views: 38, clicks: 18 } },

      { shop: sharmaHardware._id, productName: 'Hettich Wood Screws Pack (100 pcs)', description: 'Zinc plated, countersunk, 4x40mm', category: 'fasteners', brand: 'Hettich', price: 190, stock: 100, unit: 'pack', analytics: { views: 23, clicks: 8 } },
      { shop: sharmaHardware._id, productName: 'GI Hex Bolts & Nuts Pack (50 pcs)', description: 'M8x50mm, galvanized, grade 4.8', category: 'fasteners', brand: 'JK Fasteners', price: 290, stock: 80, unit: 'pack', analytics: { views: 18, clicks: 6 } },


      // ============================================================
      // RAVI ELECTRONICS EMPORIUM — Connaught Place
      // Smartphones, Tablets, Smartwatches, Laptops,
      // Chargers, Power Banks
      // ============================================================
      { shop: raviElectronics._id, productName: 'Samsung Galaxy S24 128GB', description: 'Galaxy AI, 50MP camera, 6.2" Dynamic AMOLED', category: 'smartphones', brand: 'Samsung', price: 74999, stock: 8, unit: 'piece', analytics: { views: 345, clicks: 178 } },
      { shop: raviElectronics._id, productName: 'Apple iPhone 15 128GB', description: 'A16 Bionic, Dynamic Island, 48MP, USB-C', category: 'smartphones', brand: 'Apple', price: 79900, stock: 5, unit: 'piece', analytics: { views: 456, clicks: 234 } },
      { shop: raviElectronics._id, productName: 'Xiaomi 14 256GB', description: 'Leica camera, Snapdragon 8 Gen 3, 120W charge', category: 'smartphones', brand: 'Xiaomi', price: 59999, stock: 6, unit: 'piece', analytics: { views: 234, clicks: 112 } },
      { shop: raviElectronics._id, productName: 'OnePlus 12 256GB', description: 'Snapdragon 8 Gen 3, 100W SUPERVOOC, Hasselblad', category: 'smartphones', brand: 'OnePlus', price: 64999, stock: 7, unit: 'piece', analytics: { views: 289, clicks: 145 } },
      { shop: raviElectronics._id, productName: 'Realme GT 5 Pro 256GB', description: 'Snapdragon 8 Gen 3, 144Hz AMOLED, Sony IMX890', category: 'smartphones', brand: 'Realme', price: 34999, stock: 12, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: raviElectronics._id, productName: 'Vivo X100 Pro 256GB', description: 'Zeiss camera, Dimensity 9300, 120W flash charge', category: 'smartphones', brand: 'Vivo', price: 69999, stock: 4, unit: 'piece', analytics: { views: 198, clicks: 98 } },

      { shop: raviElectronics._id, productName: 'Apple iPad 10th Gen 64GB WiFi', description: '10.9" Liquid Retina, A14 Bionic, Touch ID', category: 'tablets', brand: 'Apple', price: 34900, stock: 6, unit: 'piece', analytics: { views: 234, clicks: 112 } },
      { shop: raviElectronics._id, productName: 'Samsung Galaxy Tab S9 FE 128GB', description: '10.9", Exynos 1380, S Pen included, IP68', category: 'tablets', brand: 'Samsung', price: 29999, stock: 5, unit: 'piece', analytics: { views: 156, clicks: 78 } },
      { shop: raviElectronics._id, productName: 'Lenovo Tab P12 128GB', description: '12.7" 2K display, Dolby Atmos, 10200mAh', category: 'tablets', brand: 'Lenovo', price: 24999, stock: 7, unit: 'piece', analytics: { views: 112, clicks: 56 } },

      { shop: raviElectronics._id, productName: 'Apple Watch Series 9 GPS 45mm', description: 'S9 chip, double tap gesture, Always On Retina', category: 'smartwatches', brand: 'Apple', price: 44900, stock: 4, unit: 'piece', analytics: { views: 198, clicks: 89 } },
      { shop: raviElectronics._id, productName: 'Samsung Galaxy Watch 6 Classic 47mm', description: 'Rotating bezel, BioActive sensor, Sapphire glass', category: 'smartwatches', brand: 'Samsung', price: 34999, stock: 5, unit: 'piece', analytics: { views: 145, clicks: 67 } },
      { shop: raviElectronics._id, productName: 'Noise ColorFit Pro 5 Max Smartwatch', description: '1.96" AMOLED, BT calling, 100+ sports modes', category: 'smartwatches', brand: 'Noise', price: 3999, stock: 20, unit: 'piece', analytics: { views: 234, clicks: 120 } },
      { shop: raviElectronics._id, productName: 'Amazfit GTR 4 Smartwatch', description: '1.43" AMOLED, 150+ sports, dual-band GPS', category: 'smartwatches', brand: 'Amazfit', price: 14999, stock: 8, unit: 'piece', analytics: { views: 112, clicks: 56 } },

      { shop: raviElectronics._id, productName: 'Dell Inspiron 15 i5-1235U Laptop', description: '8GB RAM, 512GB SSD, 15.6" FHD, Win 11', category: 'laptops', brand: 'Dell', price: 52990, stock: 5, unit: 'piece', analytics: { views: 278, clicks: 134 } },
      { shop: raviElectronics._id, productName: 'HP Pavilion 14 Ryzen 5 7530U Laptop', description: '16GB RAM, 512GB SSD, 14" FHD IPS, backlit KB', category: 'laptops', brand: 'HP', price: 56990, stock: 4, unit: 'piece', analytics: { views: 198, clicks: 98 } },
      { shop: raviElectronics._id, productName: 'Apple MacBook Air M2 256GB', description: '8-core GPU, 8GB RAM, 13.6" Liquid Retina, MagSafe', category: 'laptops', brand: 'Apple', price: 99900, stock: 3, unit: 'piece', analytics: { views: 345, clicks: 178 } },
      { shop: raviElectronics._id, productName: 'Lenovo IdeaPad Slim 3 i3-1215U', description: '8GB RAM, 256GB SSD, 15.6" FHD, thin & light', category: 'laptops', brand: 'Lenovo', price: 34990, stock: 8, unit: 'piece', analytics: { views: 167, clicks: 82 } },
      { shop: raviElectronics._id, productName: 'ASUS VivoBook 15 Ryzen 7 Laptop', description: '16GB RAM, 512GB SSD, 15.6" FHD, fingerprint', category: 'laptops', brand: 'ASUS', price: 59990, stock: 4, unit: 'piece', analytics: { views: 145, clicks: 72 } },

      { shop: raviElectronics._id, productName: 'Anker 20000mAh PowerCore Power Bank', description: 'PowerIQ, dual USB-A, USB-C input, 18W', category: 'chargers_powerbanks', brand: 'Anker', price: 2499, stock: 25, unit: 'piece', analytics: { views: 156, clicks: 78 } },
      { shop: raviElectronics._id, productName: 'Mi 10000mAh Wireless Power Bank', description: 'Qi wireless charging, 22.5W wired fast charge', category: 'chargers_powerbanks', brand: 'Xiaomi', price: 1799, stock: 30, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: raviElectronics._id, productName: 'Realme 20000mAh Power Bank 2', description: '18W fast charge, dual output, LED display', category: 'chargers_powerbanks', brand: 'Realme', price: 1499, stock: 20, unit: 'piece', analytics: { views: 112, clicks: 55 } },
      { shop: raviElectronics._id, productName: 'Portronics 65W GaN Charger', description: 'USB-C + USB-A, PD3.0, QC4.0, laptop compatible', category: 'chargers_powerbanks', brand: 'Portronics', price: 1999, stock: 15, unit: 'piece', analytics: { views: 89, clicks: 45 } },


      // ============================================================
      // IRFAN SOUND & MUSIC HOUSE — Rajouri Garden
      // Headphones, Earbuds, Speakers, Soundbars,
      // Home Theaters, Projectors
      // ============================================================
      { shop: irfanAudio._id, productName: 'Sony WH-1000XM5 Wireless Headphones', description: 'Industry-leading ANC, 30hr battery, LDAC', category: 'headphones_earbuds', brand: 'Sony', price: 26990, stock: 6, unit: 'piece', analytics: { views: 234, clicks: 120 } },
      { shop: irfanAudio._id, productName: 'JBL Tune 230NC TWS Earbuds', description: 'Active noise cancelling, 40hr total, IPX4', category: 'headphones_earbuds', brand: 'JBL', price: 4999, stock: 15, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: irfanAudio._id, productName: 'Boat Airdopes 141 TWS Earbuds', description: '42hr playback, IPX4, 8mm drivers, ENx ANC', category: 'headphones_earbuds', brand: 'Boat', price: 1299, stock: 40, unit: 'piece', analytics: { views: 289, clicks: 156 } },
      { shop: irfanAudio._id, productName: 'Apple AirPods Pro 2nd Gen USB-C', description: 'Adaptive Audio, conversation awareness, IP54', category: 'headphones_earbuds', brand: 'Apple', price: 24900, stock: 4, unit: 'piece', analytics: { views: 198, clicks: 98 } },
      { shop: irfanAudio._id, productName: 'Sennheiser HD 599 Open-Back Headphones', description: 'Audiophile, velour ear pads, E.A.R. technology', category: 'headphones_earbuds', brand: 'Sennheiser', price: 12990, stock: 5, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: irfanAudio._id, productName: 'Skullcandy Crusher Evo Wireless', description: 'Adjustable sensory bass, 40hr battery, rapid charge', category: 'headphones_earbuds', brand: 'Skullcandy', price: 7999, stock: 7, unit: 'piece', analytics: { views: 89, clicks: 42 } },

      { shop: irfanAudio._id, productName: 'JBL Flip 6 Portable Bluetooth Speaker', description: 'IP67, 12hr battery, PartyBoost, dual tweeter', category: 'speakers', brand: 'JBL', price: 9999, stock: 10, unit: 'piece', analytics: { views: 167, clicks: 78 } },
      { shop: irfanAudio._id, productName: 'Bose SoundLink Flex Bluetooth Speaker', description: 'IP67, PositionIQ, deep bass, 12hr battery', category: 'speakers', brand: 'Bose', price: 14990, stock: 5, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: irfanAudio._id, productName: 'Boat Stone 1500 40W Bluetooth Speaker', description: 'IPX5, 6hr playback, TWS pairing, RGB lights', category: 'speakers', brand: 'Boat', price: 3999, stock: 12, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: irfanAudio._id, productName: 'Infinity Fuze 120 Portable Speaker', description: 'Deep bass, IPX7, 10hr playback, dual EQ', category: 'speakers', brand: 'Infinity', price: 2499, stock: 15, unit: 'piece', analytics: { views: 98, clicks: 48 } },

      { shop: irfanAudio._id, productName: 'Sony HT-S400 2.1ch Soundbar', description: 'Wireless subwoofer, Dolby Audio, S-Force PRO, 330W', category: 'sound_systems', brand: 'Sony', price: 19990, stock: 4, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: irfanAudio._id, productName: 'JBL Bar 1000 7.1.4ch Soundbar', description: 'Dolby Atmos, detachable speakers, wireless sub, 880W', category: 'sound_systems', brand: 'JBL', price: 89990, stock: 2, unit: 'piece', analytics: { views: 98, clicks: 45 } },
      { shop: irfanAudio._id, productName: 'LG SP7Y 5.1ch Soundbar with Subwoofer', description: 'Meridian audio, DTS Virtual:X, 440W', category: 'sound_systems', brand: 'LG', price: 29990, stock: 3, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: irfanAudio._id, productName: 'Yamaha YAS-209 Soundbar', description: 'DTS Virtual:X, wireless sub, Alexa built-in', category: 'sound_systems', brand: 'Yamaha', price: 24990, stock: 4, unit: 'piece', analytics: { views: 89, clicks: 42 } },

      { shop: irfanAudio._id, productName: 'Epson EF-11 Portable Laser Projector', description: '1080p, 1000 lumens, 2.7kg, HDMI, built-in speaker', category: 'projectors', brand: 'Epson', price: 79990, stock: 2, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: irfanAudio._id, productName: 'BenQ TH585P Full HD Projector', description: '3500 lumens, low input lag, 1080p, 10W speaker', category: 'projectors', brand: 'BenQ', price: 54990, stock: 3, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: irfanAudio._id, productName: 'ViewSonic PX701-4K UHD Projector', description: '3200 lumens, HDR, 240Hz, 5ms, low latency', category: 'projectors', brand: 'ViewSonic', price: 89990, stock: 2, unit: 'piece', analytics: { views: 56, clicks: 28 } },


      // ============================================================
      // YADAV SPORTS BHANDAR — Saket
      // Cricket, Football, Badminton, Tennis, Table Tennis, Hockey
      // ============================================================
      { shop: yadavSports._id, productName: 'SG Nexus Plus Kashmir Willow Cricket Bat', description: 'Short handle, thick edges, full cane handle', category: 'cricket', brand: 'SG', price: 2490, stock: 15, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: yadavSports._id, productName: 'SS Ton English Willow Cricket Bat', description: 'Grade 1, full profile, wide sweetspot', category: 'cricket', brand: 'SS', price: 7490, stock: 6, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: yadavSports._id, productName: 'SG Club White Cricket Ball (Pack of 2)', description: 'Premium alum tanned leather, 4-piece', category: 'cricket', brand: 'SG', price: 890, stock: 30, unit: 'pack', analytics: { views: 89, clicks: 45 } },
      { shop: yadavSports._id, productName: 'MRF Genius Grand Cricket Bat', description: 'English Willow, Virat Kohli signature edition', category: 'cricket', brand: 'MRF', price: 12990, stock: 3, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: yadavSports._id, productName: 'SG Optipro Cricket Helmet', description: 'High impact ABS shell, steel grill, neck guard', category: 'cricket', brand: 'SG', price: 2190, stock: 10, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: yadavSports._id, productName: 'Kookaburra Kahuna Batting Gloves', description: 'Colt mesh, high density foam, right hand', category: 'cricket', brand: 'Kookaburra', price: 1490, stock: 12, unit: 'pair', analytics: { views: 56, clicks: 28 } },

      { shop: yadavSports._id, productName: 'Nike Flight Match Football Size 5', description: 'Aerowsculpt, 12-panel, FIFA Quality Pro', category: 'football', brand: 'Nike', price: 3990, stock: 10, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: yadavSports._id, productName: 'Adidas UCL Pro Match Ball', description: 'Seamless surface, FIFA approved, size 5', category: 'football', brand: 'Adidas', price: 4490, stock: 8, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: yadavSports._id, productName: 'Nivia Storm Football Size 5', description: 'PU material, hand-stitched, training grade', category: 'football', brand: 'Nivia', price: 790, stock: 20, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: yadavSports._id, productName: 'Puma Future Z Football Boots', description: 'FUZIONFIT+, GripControl Pro, AG soleplate', category: 'football', brand: 'Puma', price: 8490, stock: 6, unit: 'pair', analytics: { views: 78, clicks: 38 } },
      { shop: yadavSports._id, productName: 'Cosco Defender Shin Guard', description: 'PP shell, EVA padding, adjustable strap', category: 'football', brand: 'Cosco', price: 390, stock: 25, unit: 'pair', analytics: { views: 34, clicks: 15 } },

      { shop: yadavSports._id, productName: 'Yonex Nanoray Light 18i Badminton Racket', description: 'Isometric head, 77g, strung, cover included', category: 'badminton', brand: 'Yonex', price: 1890, stock: 12, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: yadavSports._id, productName: 'Li-Ning Super Force 87 Badminton Racket', description: 'Mega power frame, dynamic optimum, headlight', category: 'badminton', brand: 'Li-Ning', price: 5490, stock: 5, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: yadavSports._id, productName: 'Yonex Mavis 350 Shuttlecocks (6 pcs)', description: 'Nylon, green cap (slow), tournament grade', category: 'badminton', brand: 'Yonex', price: 690, stock: 30, unit: 'pack', analytics: { views: 134, clicks: 67 } },

      { shop: yadavSports._id, productName: 'Wilson Clash 100 v2 Tennis Racket', description: 'FreeFlex, StableSmart, 295g, 100 sq in', category: 'tennis', brand: 'Wilson', price: 16990, stock: 4, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: yadavSports._id, productName: 'Stag 1 Star Table Tennis Racket', description: 'ITTF approved, 5-ply blade, pimple in rubber', category: 'table_tennis', brand: 'Stag', price: 590, stock: 20, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: yadavSports._id, productName: 'Butterfly Timo Boll ALC Table Tennis Blade', description: 'Arylate Carbon, 5+2 ply, offensive', category: 'table_tennis', brand: 'Butterfly', price: 12990, stock: 3, unit: 'piece', analytics: { views: 45, clicks: 22 } },

      { shop: yadavSports._id, productName: 'Grays GR5000 Hockey Stick', description: 'Ultrabow, carbon composite, 36.5"', category: 'hockey', brand: 'Grays', price: 4490, stock: 6, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: yadavSports._id, productName: 'Adidas Fabela X Hockey Shoes', description: 'Boost midsole, synthetic upper, continental grip', category: 'hockey', brand: 'Adidas', price: 6990, stock: 5, unit: 'pair', analytics: { views: 45, clicks: 22 } },


      // ============================================================
      // JAIN FITNESS & GYM EQUIPMENT — Dwarka
      // Gym, Yoga, Swimming, Cycling, Running, Fitness Bands
      // ============================================================
      { shop: jainFitness._id, productName: 'PowerMax 10kg Rubber Hex Dumbbell Pair', description: 'Hex shape anti-roll, chrome handle, rubber coated', category: 'gym_workout', brand: 'PowerMax', price: 2490, stock: 15, unit: 'pair', analytics: { views: 89, clicks: 45 } },
      { shop: jainFitness._id, productName: 'Cockatoo 20kg Kettlebell Cast Iron', description: 'Vinyl coated, wide handle, flat bottom', category: 'gym_workout', brand: 'Cockatoo', price: 1990, stock: 10, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: jainFitness._id, productName: 'Fitkit FT200S Motorised Treadmill', description: '2HP peak, 12 programs, 0-14km/h, foldable', category: 'gym_workout', brand: 'Fitkit', price: 24990, stock: 3, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: jainFitness._id, productName: 'Decathlon Domyos Resistance Band Set', description: '3 bands (light/medium/heavy), latex, carry bag', category: 'gym_workout', brand: 'Decathlon', price: 799, stock: 30, unit: 'set', analytics: { views: 112, clicks: 56 } },
      { shop: jainFitness._id, productName: 'Body Sculpture Magnetic Exercise Bike', description: '8 resistance levels, LCD display, pulse sensor', category: 'gym_workout', brand: 'Body Sculpture', price: 12990, stock: 4, unit: 'piece', analytics: { views: 89, clicks: 42 } },

      { shop: jainFitness._id, productName: 'Speedo Jet Swimming Goggles', description: 'Anti-fog, UV protection, wide vision, silicone strap', category: 'swimming', brand: 'Speedo', price: 590, stock: 25, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: jainFitness._id, productName: 'Arena Classic Silicone Swim Cap', description: 'Durable silicone, 3D ergonomic, all sizes', category: 'swimming', brand: 'Arena', price: 490, stock: 20, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: jainFitness._id, productName: 'Speedo Endurance+ Swimsuit Men', description: 'Chlorine resistant, 100% polyester, jammer cut', category: 'swimming', brand: 'Speedo', price: 1990, stock: 12, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: jainFitness._id, productName: 'TYR Kickboard Training Aid', description: 'EVA foam, ergonomic shape, leg training', category: 'swimming', brand: 'TYR', price: 890, stock: 15, unit: 'piece', analytics: { views: 34, clicks: 16 } },

      { shop: jainFitness._id, productName: 'Hero Sprint Pro 26T Mountain Bike', description: '21 speed Shimano gears, front suspension, disc brake', category: 'cycling', brand: 'Hero', price: 14990, stock: 4, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: jainFitness._id, productName: 'Firefox Road Runner Pro 700C', description: '16 speed, alloy frame, caliper brakes', category: 'cycling', brand: 'Firefox', price: 18990, stock: 3, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: jainFitness._id, productName: 'Btwin Rockrider ST50 26" MTB', description: 'Steel frame, V-brakes, 6 speed, Decathlon brand', category: 'cycling', brand: 'Decathlon', price: 9999, stock: 5, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: jainFitness._id, productName: 'Decathlon B\'Twin 500 Cycling Helmet', description: 'In-mold, 17 vents, visor, adjustable dial', category: 'cycling', brand: 'Decathlon', price: 1299, stock: 12, unit: 'piece', analytics: { views: 67, clicks: 32 } },

      { shop: jainFitness._id, productName: 'Nike Air Zoom Pegasus 40 Running Shoes', description: 'React foam, Zoom Air unit, breathable mesh', category: 'athletics_running', brand: 'Nike', price: 10795, stock: 8, unit: 'pair', analytics: { views: 145, clicks: 72 } },
      { shop: jainFitness._id, productName: 'Adidas Ultraboost Light Running Shoes', description: 'Light BOOST, Primeknit+, Continental rubber', category: 'athletics_running', brand: 'Adidas', price: 14999, stock: 5, unit: 'pair', analytics: { views: 112, clicks: 56 } },
      { shop: jainFitness._id, productName: 'Puma Velocity Nitro 2 Running Shoes', description: 'NITRO foam, PUMAGRIP, ProFoam sockliner', category: 'athletics_running', brand: 'Puma', price: 7999, stock: 10, unit: 'pair', analytics: { views: 89, clicks: 42 } },

      { shop: jainFitness._id, productName: 'Reebok 6mm Yoga Mat', description: 'Reversible, textured surface, carry strap, NBR foam', category: 'yoga_fitness', brand: 'Reebok', price: 1490, stock: 20, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: jainFitness._id, productName: 'Decathlon Domyos Yoga Mat 8mm', description: 'Comfort foam, gentle yoga, carry strap included', category: 'yoga_fitness', brand: 'Decathlon', price: 699, stock: 25, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: jainFitness._id, productName: 'Adidas Training Mat 10mm', description: 'Rolled, carry strap, non-slip surface, NBR', category: 'yoga_fitness', brand: 'Adidas', price: 1990, stock: 12, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      { shop: jainFitness._id, productName: 'Fitbit Charge 6 Fitness Band', description: 'GPS, heart rate, Google apps, 7-day battery', category: 'fitness_bands', brand: 'Fitbit', price: 14999, stock: 8, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: jainFitness._id, productName: 'Xiaomi Smart Band 8 Pro', description: '1.74" AMOLED, GPS, 150+ workout modes', category: 'fitness_bands', brand: 'Xiaomi', price: 3999, stock: 15, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: jainFitness._id, productName: 'Garmin Vivosmart 5 Fitness Tracker', description: 'Body Battery, Pulse Ox, stress tracking, slim', category: 'fitness_bands', brand: 'Garmin', price: 12990, stock: 6, unit: 'piece', analytics: { views: 89, clicks: 42 } },


      // ============================================================
      // KAPOOR WATCH GALLERY & ACCESSORIES — South Extension
      // Watches, Sunglasses, Wallets, Belts, Jewelry,
      // Bags, Luggage, Travel Accessories
      // ============================================================
      { shop: kapoorWatchGallery._id, productName: 'Titan Octane Chronograph Watch', description: 'Stainless steel, mineral glass, 100m WR', category: 'watches', brand: 'Titan', price: 5995, stock: 10, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: kapoorWatchGallery._id, productName: 'Fastrack Reflex Play+ Smartwatch', description: '1.3" display, BT calling, 7 day battery', category: 'watches', brand: 'Fastrack', price: 2995, stock: 15, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: kapoorWatchGallery._id, productName: 'Casio G-Shock GA-2100 Watch', description: 'Carbon core guard, 200m WR, world time', category: 'watches', brand: 'Casio', price: 9995, stock: 6, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: kapoorWatchGallery._id, productName: 'Fossil Grant Chronograph Leather Watch', description: 'Genuine leather, Roman numerals, 44mm', category: 'watches', brand: 'Fossil', price: 8995, stock: 5, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: kapoorWatchGallery._id, productName: 'Timex Waterbury Classic Watch', description: 'Stainless steel, INDIGLO, 40mm, vintage design', category: 'watches', brand: 'Timex', price: 4495, stock: 8, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      { shop: kapoorWatchGallery._id, productName: 'Ray-Ban Aviator Classic RB3025', description: 'Gold frame, green G-15 lens, 58mm', category: 'sunglasses', brand: 'Ray-Ban', price: 7990, stock: 10, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: kapoorWatchGallery._id, productName: 'Fastrack Wayfarer Unisex Sunglasses', description: 'UV protected, polycarbonate lens, spring hinge', category: 'sunglasses', brand: 'Fastrack', price: 1290, stock: 20, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: kapoorWatchGallery._id, productName: 'Polaroid Round Polarized Sunglasses', description: 'Polarized lens, metal frame, UV 400', category: 'sunglasses', brand: 'Polaroid', price: 3490, stock: 8, unit: 'piece', analytics: { views: 89, clicks: 42 } },

      { shop: kapoorWatchGallery._id, productName: 'Hidesign Leather Bi-Fold Wallet', description: 'Genuine leather, 6 card slots, coin pocket', category: 'wallets_belts', brand: 'Hidesign', price: 1995, stock: 12, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: kapoorWatchGallery._id, productName: 'WildHorn Leather Belt for Men', description: 'Italian leather, auto-lock buckle, adjustable', category: 'wallets_belts', brand: 'WildHorn', price: 599, stock: 25, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: kapoorWatchGallery._id, productName: 'Allen Solly Reversible Belt', description: 'Black/brown reversible, pin buckle, formal', category: 'wallets_belts', brand: 'Allen Solly', price: 1199, stock: 15, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      { shop: kapoorWatchGallery._id, productName: 'Tanishq 22KT Gold Stud Earrings', description: 'Diamond cut, lightweight, daily wear, BIS hallmark', category: 'jewelry', brand: 'Tanishq', price: 12990, stock: 4, unit: 'pair', analytics: { views: 134, clicks: 67 } },
      { shop: kapoorWatchGallery._id, productName: 'Voylla Silver Oxidised Necklace Set', description: 'Tribal design, adjustable, with earrings', category: 'jewelry', brand: 'Voylla', price: 890, stock: 15, unit: 'set', analytics: { views: 89, clicks: 42 } },

      { shop: kapoorWatchGallery._id, productName: 'Wildcraft 45L Trekking Backpack', description: 'Rain cover, multiple compartments, padded straps', category: 'backpacks_bags', brand: 'Wildcraft', price: 2990, stock: 10, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: kapoorWatchGallery._id, productName: 'American Tourister Casual Backpack 32L', description: 'Polyester, laptop sleeve, water resistant', category: 'backpacks_bags', brand: 'American Tourister', price: 1490, stock: 15, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: kapoorWatchGallery._id, productName: 'Puma Ferrari LS Sling Bag', description: 'Licensed, adjustable strap, zip closure', category: 'backpacks_bags', brand: 'Puma', price: 1990, stock: 8, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      { shop: kapoorWatchGallery._id, productName: 'Samsonite Spinner 68cm Trolley Bag', description: 'Polycarbonate, TSA lock, 4 wheels, expandable', category: 'luggage', brand: 'Samsonite', price: 8990, stock: 5, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: kapoorWatchGallery._id, productName: 'American Tourister Ivy 55cm Cabin Bag', description: 'Hard case, combination lock, 4 wheels', category: 'luggage', brand: 'American Tourister', price: 3490, stock: 10, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: kapoorWatchGallery._id, productName: 'VIP Magnum 79cm Hard Trolley', description: 'Polypropylene, built-in lock, 4 wheels, light', category: 'luggage', brand: 'VIP', price: 4990, stock: 7, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: kapoorWatchGallery._id, productName: 'Safari Thorium Sharp 66cm Trolley', description: 'Polycarbonate shell, anti-theft zip, 4 wheels', category: 'luggage', brand: 'Safari', price: 3990, stock: 8, unit: 'piece', analytics: { views: 67, clicks: 32 } },


      // ============================================================
      // GEETA BOOK DEPOT & STATIONERY — Preet Vihar
      // Pens, Notebooks, Water Bottles, Flasks, Eyewear
      // ============================================================
      { shop: geetaStationery._id, productName: 'Reynolds Trimax Gel Pen (Pack of 5)', description: 'Waterproof ink, 0.5mm fine tip, comfortable grip', category: 'pens_notebooks', brand: 'Reynolds', price: 120, stock: 100, unit: 'pack', analytics: { views: 89, clicks: 45 } },
      { shop: geetaStationery._id, productName: 'Cello Butterflow Ball Pen (Pack of 10)', description: 'Smooth writing, elasto grip, German technology', category: 'pens_notebooks', brand: 'Cello', price: 90, stock: 150, unit: 'pack', analytics: { views: 112, clicks: 56 } },
      { shop: geetaStationery._id, productName: 'Parker Classic Gold Trim Ball Pen', description: 'Stainless steel, gold plated clip, refillable', category: 'pens_notebooks', brand: 'Parker', price: 390, stock: 20, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: geetaStationery._id, productName: 'Classmate Spiral Notebook 400 Pages', description: 'A4 size, single line, soft cover, 29.7x21cm', category: 'pens_notebooks', brand: 'Classmate', price: 180, stock: 80, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: geetaStationery._id, productName: 'Camlin Kokuyo Drawing Kit', description: 'Sketch pens 24 shades, oil pastels 25 shades', category: 'pens_notebooks', brand: 'Camlin', price: 390, stock: 30, unit: 'set', analytics: { views: 78, clicks: 38 } },

      { shop: geetaStationery._id, productName: 'Milton Thermosteel 1L Flask', description: '24hr hot/cold, stainless steel, leak proof', category: 'water_bottles_flasks', brand: 'Milton', price: 890, stock: 25, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: geetaStationery._id, productName: 'Cello Puro Steel Water Bottle 900ml', description: 'Stainless steel, single wall, leak proof lid', category: 'water_bottles_flasks', brand: 'Cello', price: 490, stock: 30, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: geetaStationery._id, productName: 'Signoraware Aqua Star 1L Bottle', description: 'BPA free plastic, flip top lid, for school/gym', category: 'water_bottles_flasks', brand: 'Signoraware', price: 290, stock: 40, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: geetaStationery._id, productName: 'Hawkins Vacuum Flask 750ml', description: 'Double wall, copper coated, 12hr retention', category: 'water_bottles_flasks', brand: 'Hawkins', price: 1190, stock: 15, unit: 'piece', analytics: { views: 45, clicks: 22 } },

      { shop: geetaStationery._id, productName: 'Lenskart Hustlr Blue Light Glasses', description: 'Anti-glare, zero power, computer/mobile use', category: 'eyewear', brand: 'Lenskart', price: 1290, stock: 20, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: geetaStationery._id, productName: 'Titan Eye+ Round Reading Glasses +1.50', description: 'Lightweight frame, spring hinge, anti-scratch', category: 'eyewear', brand: 'Titan Eye+', price: 990, stock: 15, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: geetaStationery._id, productName: 'Vogue VO5276 Cat Eye Eyeglasses', description: 'Full rim, acetate frame, demo lens included', category: 'eyewear', brand: 'Vogue', price: 3990, stock: 6, unit: 'piece', analytics: { views: 56, clicks: 28 } },


      // ============================================================
      // MALHOTRA PERSONAL CARE & GROOMING — Vasant Kunj
      // Trimmers, Shavers, Hair Dryers, Straighteners,
      // Electric Toothbrushes, Deodorants, Perfumes
      // ============================================================
      { shop: malhotraGrooming._id, productName: 'Philips BT3221/15 Beard Trimmer', description: 'DuraPower, 20 length settings, 90 min runtime', category: 'trimmers_shavers', brand: 'Philips', price: 1795, stock: 15, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: malhotraGrooming._id, productName: 'Braun Series 5 Electric Shaver', description: 'AutoSense, EasyClean, wet & dry, FlexMotionTec', category: 'trimmers_shavers', brand: 'Braun', price: 8990, stock: 5, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: malhotraGrooming._id, productName: 'Panasonic ER-GK60 Body Trimmer', description: 'Waterproof, 3 comb attachments, cordless', category: 'trimmers_shavers', brand: 'Panasonic', price: 3290, stock: 8, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: malhotraGrooming._id, productName: 'Havells BT6202 Beard Trimmer', description: '20 length settings, USB charging, 100 min runtime', category: 'trimmers_shavers', brand: 'Havells', price: 1295, stock: 20, unit: 'piece', analytics: { views: 112, clicks: 56 } },

      { shop: malhotraGrooming._id, productName: 'Philips BHD356 Hair Dryer 2100W', description: 'ThermoProtect, ionic care, 6 speed/heat settings', category: 'hair_dryers', brand: 'Philips', price: 2495, stock: 10, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: malhotraGrooming._id, productName: 'Havells HD3151 1600W Hair Dryer', description: 'Ionic, foldable, concentrator nozzle, cool shot', category: 'hair_dryers', brand: 'Havells', price: 1195, stock: 15, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: malhotraGrooming._id, productName: 'Vega Keratin Glow Hair Straightener', description: 'Ceramic plates, adjustable temp, quick heat-up', category: 'hair_dryers', brand: 'Vega', price: 1590, stock: 12, unit: 'piece', analytics: { views: 67, clicks: 32 } },
      { shop: malhotraGrooming._id, productName: 'Remington S5525 Hair Straightener', description: 'Advanced ceramic, anti-static, 230°C, digital', category: 'hair_dryers', brand: 'Remington', price: 2990, stock: 6, unit: 'piece', analytics: { views: 56, clicks: 28 } },

      { shop: malhotraGrooming._id, productName: 'Philips Sonicare ProtectiveClean 4300', description: 'BrushSync, 2 min timer, pressure sensor, 2 weeks battery', category: 'electric_toothbrushes', brand: 'Philips', price: 3990, stock: 8, unit: 'piece', analytics: { views: 78, clicks: 38 } },
      { shop: malhotraGrooming._id, productName: 'Oral-B Vitality 100 Electric Toothbrush', description: '2D cleaning, 2 min timer, 1 brush head included', category: 'electric_toothbrushes', brand: 'Oral-B', price: 1290, stock: 15, unit: 'piece', analytics: { views: 89, clicks: 42 } },

      { shop: malhotraGrooming._id, productName: 'Fogg Scent Xpressio EDP Perfume 100ml', description: 'Long lasting, citrus woody, for men', category: 'deodorants_perfumes', brand: 'Fogg', price: 499, stock: 30, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: malhotraGrooming._id, productName: 'Wild Stone Code Steel Body Perfume 120ml', description: 'No gas, long lasting, fresh & citrus', category: 'deodorants_perfumes', brand: 'Wild Stone', price: 349, stock: 40, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: malhotraGrooming._id, productName: 'Nivea Men Deep Impact Deo 150ml', description: 'Anti-perspirant, 48hr protection, fresh scent', category: 'deodorants_perfumes', brand: 'Nivea', price: 225, stock: 50, unit: 'piece', analytics: { views: 98, clicks: 48 } },
      { shop: malhotraGrooming._id, productName: 'Axe Dark Temptation Deodorant 150ml', description: 'Dark chocolate fragrance, 24hr freshness', category: 'deodorants_perfumes', brand: 'Axe', price: 199, stock: 45, unit: 'piece', analytics: { views: 145, clicks: 72 } },

      { shop: malhotraGrooming._id, productName: 'Vega Round Hair Brush', description: 'Nylon bristles, wooden handle, anti-static', category: 'haircare_accessories', brand: 'Vega', price: 290, stock: 20, unit: 'piece', analytics: { views: 56, clicks: 28 } },
      { shop: malhotraGrooming._id, productName: 'Kent Handmade Comb Large', description: 'Cellulose acetate, saw-cut, hand polished', category: 'haircare_accessories', brand: 'Kent', price: 590, stock: 15, unit: 'piece', analytics: { views: 45, clicks: 22 } },


      // ============================================================
      // BHATIA CAMERA HOUSE & SMART HOME — Janakpuri
      // Cameras, Drones, Action Cameras, Routers,
      // Smart Home Devices, Printers
      // ============================================================
      { shop: bhatiaCamera._id, productName: 'Canon EOS R50 Mirrorless Camera Body', description: '24.2MP APS-C, 4K video, Dual Pixel AF, WiFi', category: 'cameras', brand: 'Canon', price: 59990, stock: 3, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: bhatiaCamera._id, productName: 'Nikon Z50 with 16-50mm Kit Lens', description: '20.9MP DX, 4K UHD, 209 AF points, eye detect', category: 'cameras', brand: 'Nikon', price: 72990, stock: 2, unit: 'piece', analytics: { views: 145, clicks: 72 } },
      { shop: bhatiaCamera._id, productName: 'Sony Alpha A6400 with 16-50mm Lens', description: '24.2MP, 4K, real-time eye AF, 180° flip screen', category: 'cameras', brand: 'Sony', price: 78990, stock: 2, unit: 'piece', analytics: { views: 167, clicks: 82 } },
      { shop: bhatiaCamera._id, productName: 'Fujifilm X-T5 Mirrorless Body', description: '40.2MP X-Trans, 7-stop IBIS, 6.2K video', category: 'cameras', brand: 'Fujifilm', price: 149990, stock: 1, unit: 'piece', analytics: { views: 98, clicks: 48 } },

      { shop: bhatiaCamera._id, productName: 'GoPro HERO12 Black Action Camera', description: '5.3K60, HyperSmooth 6.0, 10m waterproof, HDR', category: 'drones_action_cameras', brand: 'GoPro', price: 39990, stock: 4, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: bhatiaCamera._id, productName: 'DJI Mini 4 Pro Drone', description: '4K/60fps, ActiveTrack 360, 34 min flight, 249g', category: 'drones_action_cameras', brand: 'DJI', price: 79990, stock: 2, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: bhatiaCamera._id, productName: 'DJI Osmo Action 4', description: '4K/120fps, dual OLED screens, 16m waterproof', category: 'drones_action_cameras', brand: 'DJI', price: 27990, stock: 3, unit: 'piece', analytics: { views: 89, clicks: 42 } },

      { shop: bhatiaCamera._id, productName: 'TP-Link Archer AX73 WiFi 6 Router', description: 'AX5400, dual band, 6 antennas, OFDMA, HomeCare', category: 'routers_modems', brand: 'TP-Link', price: 6999, stock: 10, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: bhatiaCamera._id, productName: 'Netgear Nighthawk RAX50 WiFi 6 Router', description: 'AX5400, 5 streams, 2500 sq ft, 1.5GHz processor', category: 'routers_modems', brand: 'Netgear', price: 12990, stock: 5, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: bhatiaCamera._id, productName: 'D-Link DIR-1960 AC1900 MU-MIMO Router', description: 'Dual band, mesh compatible, McAfee protection', category: 'routers_modems', brand: 'D-Link', price: 4490, stock: 12, unit: 'piece', analytics: { views: 78, clicks: 38 } },

      { shop: bhatiaCamera._id, productName: 'Amazon Echo Dot 5th Gen Smart Speaker', description: 'Alexa, improved bass, smart home hub, clock', category: 'smart_home_devices', brand: 'Amazon', price: 4499, stock: 15, unit: 'piece', analytics: { views: 178, clicks: 89 } },
      { shop: bhatiaCamera._id, productName: 'Google Nest Hub 2nd Gen Smart Display', description: '7" display, Google Assistant, sleep sensing', category: 'smart_home_devices', brand: 'Google', price: 7999, stock: 6, unit: 'piece', analytics: { views: 134, clicks: 67 } },
      { shop: bhatiaCamera._id, productName: 'Philips Hue White Ambiance Starter Kit', description: '3 bulbs + bridge, warm to cool white, app control', category: 'smart_home_devices', brand: 'Philips', price: 8990, stock: 5, unit: 'set', analytics: { views: 98, clicks: 48 } },
      { shop: bhatiaCamera._id, productName: 'Mi 360° Home Security Camera 2K Pro', description: '3MP, night vision, AI person detection, 2-way audio', category: 'smart_home_devices', brand: 'Xiaomi', price: 3499, stock: 12, unit: 'piece', analytics: { views: 145, clicks: 72 } },

      { shop: bhatiaCamera._id, productName: 'HP LaserJet MFP M234dwe Printer', description: 'Print/scan/copy, WiFi, auto duplex, HP+', category: 'printers', brand: 'HP', price: 18490, stock: 4, unit: 'piece', analytics: { views: 89, clicks: 42 } },
      { shop: bhatiaCamera._id, productName: 'Canon PIXMA G3060 Ink Tank Printer', description: 'Print/scan/copy, WiFi, 6000 pages/bottle', category: 'printers', brand: 'Canon', price: 13990, stock: 6, unit: 'piece', analytics: { views: 112, clicks: 56 } },
      { shop: bhatiaCamera._id, productName: 'Epson EcoTank L3250 Ink Tank Printer', description: 'WiFi, borderless print, 4500 pages black', category: 'printers', brand: 'Epson', price: 11990, stock: 5, unit: 'piece', analytics: { views: 98, clicks: 48 } },

    ]);

    console.log('✅ 130+ Products created across all 12 shops');


    // =============================================
    // REVIEWS — Customers reviewing various shops
    // =============================================
    await Review.insertMany([
      // Customer Rahul reviews
      { user: c1._id, shop: bajajAppliances._id, rating: 5, comment: 'Bought LG fridge from here. Ramesh bhai gave best price in entire Lajpat Nagar. Delivery was same day!' },
      { user: c1._id, shop: guptaComputers._id, rating: 4, comment: 'Built my gaming PC from Gupta Computers. Good prices on GPUs. Slightly crowded on weekends.' },
      { user: c1._id, shop: raviElectronics._id, rating: 5, comment: 'Got my iPhone 15 from here. Genuine products with bill. Ravi bhai is very helpful and honest.' },
      { user: c1._id, shop: yadavSports._id, rating: 4, comment: 'Good collection of cricket bats. Got SG Nexus at good price. Should stock more football items.' },
      { user: c1._id, shop: kapoorWatchGallery._id, rating: 5, comment: 'Beautiful Titan watch collection. Kapoor saab has been in this business for 40+ years. Very trustworthy.' },
      { user: c1._id, shop: bhatiaCamera._id, rating: 4, comment: 'Bought Canon R50 from here. Good advice on lenses. Prices are competitive with online.' },

      // Customer Priya reviews
      { user: c2._id, shop: premChandKitchen._id, rating: 5, comment: 'Best kitchen store in Karol Bagh! Bought Preethi mixer and IFB microwave. Prem Chand uncle is so sweet.' },
      { user: c2._id, shop: sharmaHardware._id, rating: 4, comment: 'Bought Asian Paints and tools for home renovation. They have everything. A bit hard to find in Chandni Chowk lanes.' },
      { user: c2._id, shop: irfanAudio._id, rating: 5, comment: 'Amazing audio store! Tested Sony XM5 and JBL Flip 6 here. Irfan bhai really knows his sound systems.' },
      { user: c2._id, shop: jainFitness._id, rating: 4, comment: 'Got yoga mat and fitness band for my home workouts. Good quality products at reasonable prices.' },
      { user: c2._id, shop: geetaStationery._id, rating: 5, comment: 'My go-to shop for all stationery. Geeta aunty always gives student discount. Love the Milton flask collection!' },
      { user: c2._id, shop: malhotraGrooming._id, rating: 4, comment: 'Bought Philips trimmer and hair dryer. Good collection of grooming products. Staff is knowledgeable.' },

      // Customer Ankit reviews
      { user: c3._id, shop: bajajAppliances._id, rating: 4, comment: 'Got Samsung AC installed through them. Good after-sales service. Installation team came on time.' },
      { user: c3._id, shop: guptaComputers._id, rating: 5, comment: 'Best shop in Nehru Place for PC parts! Got Corsair RAM and Samsung SSD at lowest price. Vinod bhai is legend.' },
      { user: c3._id, shop: raviElectronics._id, rating: 4, comment: 'Bought Dell laptop for office work. Good selection across all budgets. They also help with Windows setup.' },
      { user: c3._id, shop: irfanAudio._id, rating: 5, comment: 'Home theater setup done by Irfan Sound House. JBL Bar 1000 sounds insane! They did wiring and everything.' },
      { user: c3._id, shop: jainFitness._id, rating: 5, comment: 'Bought Hero mountain bike and cycling accessories. Jain saab assembled it free of cost. Great service!' },
      { user: c3._id, shop: bhatiaCamera._id, rating: 4, comment: 'Got DJI Mini 4 Pro from here. Bhatia uncle gave demo in the shop itself. Genuine products with warranty cards.' },
    ]);

    console.log('✅ 18 Reviews created (3 customers × 6 shops each)');


    // =============================================
    // DONE!
    // =============================================
    console.log('\n========================================');
    console.log('🎉 SEED COMPLETE — Near By Store');
    console.log('========================================');
    console.log('📊 Summary:');
    console.log('   👤 3 Customers');
    console.log('   🏪 12 Retailers');
    console.log('   🏬 12 Shops');
    console.log('   📦 130+ Products');
    console.log('   ⭐ 18 Reviews');
    console.log('========================================');
    console.log('\n📋 TEST ACCOUNTS:');
    console.log('─────────────────────────────────────');
    console.log('CUSTOMERS:');
    console.log('   rahul@example.com      / password123');
    console.log('   priya@example.com      / password123');
    console.log('   ankit@example.com      / password123');
    console.log('─────────────────────────────────────');
    console.log('RETAILERS:');
    console.log('   ramesh.bajaj@example.com    / password123  → Bajaj Home Appliances');
    console.log('   premchand@example.com       / password123  → Prem Chand Kitchen Emporium');
    console.log('   vinod.gupta@example.com     / password123  → Gupta Computers & Hardware');
    console.log('   harbans@example.com         / password123  → Sharma & Sons Hardware Store');
    console.log('   ravi.kapoor@example.com     / password123  → Ravi Electronics Emporium');
    console.log('   irfan@example.com           / password123  → Irfan Sound & Music House');
    console.log('   dharamvir@example.com       / password123  → Yadav Sports Bhandar');
    console.log('   sunil.jain@example.com      / password123  → Jain Fitness & Gym Equipment');
    console.log('   manish.kapoor@example.com   / password123  → Kapoor Watch Gallery');
    console.log('   geeta.devi@example.com      / password123  → Geeta Book Depot & Stationery');
    console.log('   arun.malhotra@example.com   / password123  → Malhotra Personal Care');
    console.log('   satish.bhatia@example.com   / password123  → Bhatia Camera House');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
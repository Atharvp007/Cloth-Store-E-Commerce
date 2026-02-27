const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Old Data Destroyed");

    // Create admin user (use create, not insertMany, so pre-save hooks work)
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456", // will hash if you use bcrypt pre-save
      role: "admin", // or isAdmin: true (depends on your schema)
    });

    const userID = createdUser._id;

    // Attach admin user ID to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

const runSeeder = async () => {
  await connectDB();
  await seedData();
};

runSeeder();
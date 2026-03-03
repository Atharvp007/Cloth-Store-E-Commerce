const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // load env FIRST

const connectDB = require("./config/db");
const userroutes = require("./routes/userroutes");
const productroutes = require("./routes/productroutes");
const cartroutes = require("./routes/cartroutes");
const checkoutroutes = require("./routes/checkoutroutes");
const orderroutes = require("./routes/orderroutes");
const uploadroutes = require("./routes/uploadroutes");
const adminroutes = require("./routes/adminroutes");
const productadminroutes = require("./routes/productadminroutes");

const app = express();

// ---------------- DATABASE ----------------
connectDB();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- ROUTES ----------------
app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API!");
});

app.use("/api/users", userroutes);
app.use("/api/products", productroutes);
app.use("/api/cart", cartroutes);
app.use("/api/checkout", checkoutroutes);
app.use("/api/orders", orderroutes);
app.use("/api/upload", uploadroutes);



app.use("/api/admin/users", adminroutes);
app.use("/api/admin/products", productadminroutes);

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
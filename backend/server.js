const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // load env FIRST

const connectDB = require("./config/db");
const userroutes = require("./routes/userroutes");
const productroutes = require("./routes/productroutes");
const cartroutes = require("./routes/cartroutes");

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

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const connectDB = require("./config/db");
const userroutes = require("./routes/userroutes");

dotenv.config(); 

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;


connectDB();


app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API!");
});

console.log(process.env.JWT_SECRET);
app.use("/api/users", userroutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
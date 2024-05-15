require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const commentRoutes = require("./routes/commentRoutes")
const { connectDB } = require("./config/db");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

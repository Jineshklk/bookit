// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const experienceRoutes = require("./routes/experienceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const promoRoutes = require("./routes/promoRoutes");
const seed = require("./seed");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",   // ✅ exact frontend
    credentials: true,                // ✅ allow cookies / auth
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ prevent method block
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ prevent header block
  })
);

app.use(express.json());

app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/promo", promoRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB Atlas");
    await seed(); // Auto seed data on first run
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

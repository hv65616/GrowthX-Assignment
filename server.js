const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes")
const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;
mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/admin",adminRoutes);
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

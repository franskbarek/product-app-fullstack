const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
dotenv.config();
const logger = require("morgan");
const cors = require("cors");

const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const productRoute = require("./src/routes/product");

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5000, () => console.log("Server running on port 5000"));

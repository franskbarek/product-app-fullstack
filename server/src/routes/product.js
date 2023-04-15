const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../helper/verifyToken");

// create
router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get by id
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// update by id
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete by id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all, sort by new product and sort by categories
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCat = req.query.category;
  try {
    if (qNew) {
      const newProduct = await Product.find().sort({ createdAt: -1 }).limit(1);
      res.status(200).json(newProduct);
    } else if (qCat) {
      const catProducts = await Product.find({ categories: { $in: [qCat] } });
      res.status(200).json(catProducts);
    } else {
      const products = await Product.find();
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// get search/filter by title
router.get("/findTitle", async (req, res) => {
  const qFlex = req.query.flex;
  try {
    if (qFlex) {
      const regex = new RegExp(`\\b(${qFlex.split(" ").join("|")})\\b`, "gi");
      const flexProducts = await Product.find({ title: regex });
      res.status(200).json(flexProducts);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

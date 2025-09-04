import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import {
  addProduct,
  productList,
  productById,
  changeStock,
} from '../controllers/productController.js';

const productRouter = express.Router();

// ✅ Add Product (with multiple images upload, only seller allowed)
productRouter.post('/add', upload.array('images'), authSeller, addProduct);

// ✅ Get all products
productRouter.get('/list', productList);

// ✅ Get a product by ID
productRouter.post('/id', productById);

// ✅ Update stock of a product (only seller allowed)
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;

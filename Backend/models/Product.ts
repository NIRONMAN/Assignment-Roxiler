import mongoose, { model, Schema,InferSchemaType } from "mongoose";

const productSchema = new Schema({
  id: {
    type: Number, 
    required: true, 
  },
  title: {
    type: String, 
    required: true, 
    trim: true, 
  },
  price: {
    type: Number, 
    required: true, 
    min: 0, 
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
});
type ProductType = InferSchemaType<typeof productSchema>;
const Product=model('Product',productSchema);
export {ProductType};
export default Product;


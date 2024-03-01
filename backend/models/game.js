import mongoose from"mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    ratings: [
      {
        star: {type:Number},
        comment:{ type:String},
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
   
    description:{
      type: String
    }
  },
  { timestamps: true }
);

//Export the model
const Product = mongoose.model("Product", productSchema);
export default Product;
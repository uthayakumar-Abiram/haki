import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var libSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        price: Number,
      },
    ],
   
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("lib", libSchema);
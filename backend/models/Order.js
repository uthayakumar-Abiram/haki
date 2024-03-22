import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        title: { type: String,  },
        images:
         [
          {
            public_id: String,
            url: String,
          },
        ],
        price: { type: String, },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
    },
 
    taxPrice: {
      type: Number,
      default: 0.0,
    },
  
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

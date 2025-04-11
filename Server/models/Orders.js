import mongoose from "mongoose";

// Schema for individual order entries
const entrySchema = new mongoose.Schema({
  partNumberCount: { type: Number, required: true },
  partNumbers: [{ type: String, required: true }], // Array of part numbers
});

// Schema for Order
const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    trackingId: { type: String, required: true, unique: true },
    entries: [entrySchema], // Array of entries
    status: {
      type: String,
      enum: ["Pending", "Dispatched"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

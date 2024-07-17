import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema(
  {
    rooms: {
      type: Number,
      required: true,
      min: [1, "rooms must be more than 1"],
    },
    name: {
      type: String,
      required: true,
      maxlength: [99, "name lenght shall not exceed 99 symbols"],
    },
    price: {
      type: Number,
      required: true,
      min: [1, "price must be more that 1"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [999, "description length shall no exceed 999 symbols"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Apartment", apartmentSchema);

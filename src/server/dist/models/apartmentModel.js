"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apartmentSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Apartment", apartmentSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apartmentsPatchApartment = exports.apartmentsPostApartment = exports.apartmentsDeleteApartment = exports.apartmentsGetApartment = exports.apartmentsGetAllApartments = void 0;
const apartmentModel_1 = __importDefault(require("../models/apartmentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const apartmentsGetAllApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartments = yield apartmentModel_1.default.find();
        res.status(200).json({ count: apartments.length, apartments: apartments });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});
exports.apartmentsGetAllApartments = apartmentsGetAllApartments;
const apartmentsGetApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(500).json({ message: "Not valid ID" });
        }
        const apartment = yield apartmentModel_1.default.findById(id);
        if (!apartment) {
            return res.status(500).json({ message: "ID not found" });
        }
        res.status(200).json({ apartment });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});
exports.apartmentsGetApartment = apartmentsGetApartment;
const apartmentsPostApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartment = yield apartmentModel_1.default.create(req.body);
        res.status(201).json({
            status: "success",
            data: apartment,
        });
    }
    catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
});
exports.apartmentsPostApartment = apartmentsPostApartment;
const apartmentsDeleteApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "ID not valid" });
        }
        const apartment = yield apartmentModel_1.default.findById(id);
        if (!apartment) {
            return res.status(404).json({ message: "ID not found" });
        }
        yield apartmentModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Apartment successfully deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});
exports.apartmentsDeleteApartment = apartmentsDeleteApartment;
const apartmentsPatchApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "ID not valid" });
        }
        const apartment = yield apartmentModel_1.default.findById(id);
        if (!apartment) {
            res.status(400).json({ message: "No apartment with provided ID found" });
        }
        yield apartmentModel_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            message: "apartment information updated",
            apartment: apartment,
            update: req.body,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: "failed", message: err.message });
    }
});
exports.apartmentsPatchApartment = apartmentsPatchApartment;

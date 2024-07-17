"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apartmentsController_1 = require("../controllers/apartmentsController");
const router = (0, express_1.default)();
router.get("/apartments", apartmentsController_1.apartmentsGetAllApartments);
router.post("/apartments", apartmentsController_1.apartmentsPostApartment);
router.get("/apartments/:id", apartmentsController_1.apartmentsGetApartment);
router.patch("/apartments/:id", apartmentsController_1.apartmentsPatchApartment);
router.delete("/apartments/:id", apartmentsController_1.apartmentsDeleteApartment);
exports.default = router;

import express from "express";
import {
  apartmentsGetAllApartments,
  apartmentsGetApartment,
  apartmentsDeleteApartment,
  apartmentsPostApartment,
  apartmentsPatchApartment,
} from "../controllers/apartmentsController";
const router = express();

router.get("/", apartmentsGetAllApartments);
router.post("/", apartmentsPostApartment);
router.get("/:id", apartmentsGetApartment);
router.patch("/:id", apartmentsPatchApartment);
router.delete("/:id", apartmentsDeleteApartment);
export default router;

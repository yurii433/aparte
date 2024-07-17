import { Request, Response } from "express";
import Apartment from "../models/apartmentModel";
import mongoose from "mongoose";

const apartmentsGetAllApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json({ count: apartments.length, apartments: apartments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const apartmentsGetApartment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ message: "Not valid ID" });
    }
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(500).json({ message: "ID not found" });
    }

    res.status(200).json({ apartment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const apartmentsPostApartment = async (req: Request, res: Response) => {
  try {
    const apartment = await Apartment.create(req.body);

    res.status(201).json({
      status: "success",
      data: apartment,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: (err as Error).message });
  }
};

const apartmentsDeleteApartment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "ID not valid" });
    }

    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(404).json({ message: "ID not found" });
    }

    await Apartment.findByIdAndDelete(id);

    res.status(200).json({ message: "Apartment successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const apartmentsPatchApartment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "ID not valid" });
    }

    const apartment = await Apartment.findById(id);
    if (!apartment) {
      res.status(400).json({ message: "No apartment with provided ID found" });
    }

    await Apartment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "apartment information updated",
      apartment: apartment,
      update: req.body,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "failed", message: (err as Error).message });
  }
};

export {
  apartmentsGetAllApartments,
  apartmentsGetApartment,
  apartmentsDeleteApartment,
  apartmentsPostApartment,
  apartmentsPatchApartment,
};

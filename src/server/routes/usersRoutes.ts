import express from "express";
import {
  usersGetAllUsers,
  usersGetUser,
  usersPostUser,
  usersDeleteUser,
  usersPatchUser,
} from "../controllers/usersController";
const router = express();

router.get("/", usersGetAllUsers);
router.post("/", usersPostUser);
router.get("/:id", usersGetUser);
router.delete("/:id", usersDeleteUser);
router.patch("/:id", usersPatchUser);

export default router;

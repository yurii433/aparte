import express from "express";

import {
  usersGetAllUsers,
  usersGetUser,
  usersDeleteUser,
  usersPatchUser,
  user_signup,
} from "../controllers/usersController";

const router = express();

router.get("/", usersGetAllUsers);
router.post("/", user_signup);
router.get("/:id", usersGetUser);
router.delete("/:id", usersDeleteUser);
router.patch("/:id", usersPatchUser);

export default router;

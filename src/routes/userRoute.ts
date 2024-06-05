import express from "express";
import { addUser, getUser, authUser } from "../controllers/userController";
import { userStats } from "../controllers/userStats";
import { userAvatar } from "../controllers/userAvatar";
const router = express.Router();

router
  .get("/getUser", getUser)
  .post("/authUser", authUser)
  .post("/addUser", addUser)
  .put("/updateStats", userStats)
  .put("/setUserAvatar", userAvatar);

export default router;

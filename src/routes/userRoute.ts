import express from "express";
import { addUser, getUser, authUser } from "../controllers/userController";
import { userStats } from "../controllers/userStats";
import { userAvatar } from "../controllers/userAvatar";
import { userPasswordHandler } from '../controllers/userPasswordHandler'
const router = express.Router();

router
  .get("/getUser", getUser)
  .post("/authUser", authUser)
  .post("/addUser", addUser)
  .put("/updateStats", userStats)
  .put("/setUserAvatar", userAvatar)
  .put("/userPasswordHandler", userPasswordHandler);

export default router;

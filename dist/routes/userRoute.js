"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userStats_1 = require("../controllers/userStats");
const userAvatar_1 = require("../controllers/userAvatar");
const userPasswordHandler_1 = require("../controllers/userPasswordHandler");
const router = express_1.default.Router();
router
    .get("/getUser", userController_1.getUser)
    .post("/authUser", userController_1.authUser)
    .post("/addUser", userController_1.addUser)
    .put("/updateStats", userStats_1.userStats)
    .put("/setUserAvatar", userAvatar_1.userAvatar)
    .put("/userPasswordHandler", userPasswordHandler_1.userPasswordHandler);
exports.default = router;
//# sourceMappingURL=userRoute.js.map
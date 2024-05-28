"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userStats_1 = require("../controllers/userStats");
const router = express_1.default.Router();
router.get('/getUser', userController_1.getUser).post('/authUser', userController_1.authUser).post('/addUser', userController_1.addUser).put('/updateStats', userStats_1.userStats);
exports.default = router;
//# sourceMappingURL=userRoute.js.map
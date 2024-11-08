"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dietAssistant_1 = require("../controllers/dietAssistant");
const calculator_1 = require("../controllers/calculator");
const router = express_1.default.Router();
router
    .post('/dietAssistant', dietAssistant_1.dietAssistant)
    .post("/getCalculatorResult", calculator_1.getCalculatorResult);
exports.default = router;
//# sourceMappingURL=pandaAssistant.js.map
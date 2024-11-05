"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalculatorResult = void 0;
const getCalculatorResult = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { age, gender, height, intensity, weight, goal } = req.body;
    let BMR;
    let TDEE;
    if (gender === "male") {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    switch (true) {
        case intensity < 20:
            TDEE = BMR * 1.2;
            break;
        case intensity >= 20 && intensity <= 40:
            TDEE = BMR * 1.375;
            break;
        case intensity >= 40 && intensity <= 60:
            TDEE = BMR * 1.55;
            break;
        case intensity >= 60 && intensity <= 80:
            TDEE = BMR * 1.725;
            break;
        case intensity >= 80 && intensity <= 100:
            TDEE = BMR * 1.9;
            break;
        default:
            console.warn("Intensity out of range");
    }
    if (goal === "cut") {
        TDEE = TDEE - 500;
    }
    else if (goal === "gain") {
        TDEE = TDEE + 500;
    }
    else {
        TDEE = TDEE;
    }
    const resultObj = {
        TDEE,
        protein: Math.round((TDEE * 0.25) / 4),
        carbs: Math.round((TDEE * 0.5) / 4),
        fat: Math.round((TDEE * 0.25) / 9),
    };
    return res.send(resultObj).status(200);
});
exports.getCalculatorResult = getCalculatorResult;
//# sourceMappingURL=calculator.js.map
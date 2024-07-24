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
exports.dietAssistant = void 0;
const dietAssistant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { gender, age, height, weight, activity, intensity, goal, data: dietPreferences, } = req.body;
    const promise = yield new Promise(resolve => setTimeout(() => resolve("OK"), 2000));
    return res.status(404).send({ message: "The diet assistant is not available yet, sorry." });
});
exports.dietAssistant = dietAssistant;
// `You are a dietitian, creating a dietary plan that best suits a person with the specified parameters : gender: ${gender} age: ${age}, height: ${height}, weight: ${weight}. Person activity is ${activity.toLowerCase()}, activity intense is ${intensity.toLowerCase()}. This person want ${goal.toLowerCase()}. Person diet preferences are ${dietPreferences.map((diet: string) => diet)} The plan should cover 7 days a week and include specific advice and a breakdown of macronutrients`
//# sourceMappingURL=dietAssistant.js.map
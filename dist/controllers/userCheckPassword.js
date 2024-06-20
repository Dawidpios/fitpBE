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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCheckPassword = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const comparePassword_1 = require("../lib/comparePassword");
const userCheckPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, id } = req.body;
        // Asynchronicznie wyszukaj użytkownika w bazie danych
        const userPromise = prismaClient_1.default.user.findUnique({ where: { id: id } });
        const userExist = yield userPromise;
        // Jeśli użytkownik nie istnieje, zwróć błąd
        if (!userExist) {
            return res.status(404).send({ message: "User not found" });
        }
        // Asynchronicznie porównaj hasła
        const passwordIsEqualPromise = (0, comparePassword_1.comparePassword)(password, userExist.password);
        const passwordIsEqual = yield passwordIsEqualPromise;
        // Jeśli hasła się nie zgadzają, zwróć błąd
        if (!passwordIsEqual) {
            return res.status(401).send({ message: "Incorrect password" });
        }
        // Jeśli wszystko jest poprawne, przejdź do następnego middleware
        next();
    }
    catch (error) {
        console.error("Error in userCheckPassword:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});
exports.userCheckPassword = userCheckPassword;
//# sourceMappingURL=userCheckPassword.js.map
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
exports.userPasswordHandler = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const comparePassword_1 = require("../lib/comparePassword");
const hashPassword_1 = require("../lib/hashPassword");
const userPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, newPassword, confirmPassword, id } = req.body;
    if (!password || !newPassword || !confirmPassword || !id) {
        return res.status(400)
            .send({
            message: "Missing data, You should send user id, password, new password and confirmed password",
        });
    }
    if (newPassword !== confirmPassword) {
        return res.status(401).send({ message: "New passwords are not equal!" });
    }
    if (newPassword.trim().length < 8) {
        return res.status(401).send({ message: "New password must be at least 8 characters long" });
    }
    const userExist = yield prismaClient_1.default.user.findUnique({ where: { id: id } });
    if (!userExist) {
        return res.status(404).send({ message: "User not exists" });
    }
    const passwordIsEqual = yield (0, comparePassword_1.comparePassword)(password, userExist.password);
    if (!passwordIsEqual) {
        return res.status(401).send({ message: "Incorrect password" });
    }
    const hashedPassword = yield (0, hashPassword_1.hashPassword)(newPassword);
    const userUpdated = yield prismaClient_1.default.user.update({
        where: { id: id },
        data: { password: hashedPassword },
    });
    if (!userUpdated) {
        return res.status(400).send({ message: "User updated failed!" });
    }
    return res.send({ message: "User password updated!" }).status(200);
});
exports.userPasswordHandler = userPasswordHandler;
//# sourceMappingURL=userPasswordHandler.js.map
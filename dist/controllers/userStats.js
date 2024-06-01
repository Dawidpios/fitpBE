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
exports.userStats = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const userStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { formData, id } = req.body;
    if (Object.keys(formData).length === 0 || id.trim().length === 0) {
        return res.status(400).send({ msg: "Missing arguments" });
    }
    const user = yield prismaClient_1.default.user.findUnique({
        where: { id: id },
        select: { stats: true },
    });
    if (!user) {
        throw new Error('User not found');
    }
    // Aktualne stats
    const currentStats = typeof user.stats === 'object' && user.stats !== null ? user.stats : {};
    Object.keys(formData).forEach(key => {
        if (formData[key] === '') {
            delete formData[key];
        }
        else {
            formData[key] = { value: formData[key], updatedAt: new Date().toLocaleString() };
        }
    });
    // Tworzenie nowego obiektu stats z aktualnymi wartościami
    const newStats = Object.assign(Object.assign({}, currentStats), formData);
    // Aktualizacja użytkownika
    yield prismaClient_1.default.user.update({
        where: { id: id },
        data: {
            stats: Object.assign({}, newStats),
        },
    });
    return res.status(200).send(user);
});
exports.userStats = userStats;
//# sourceMappingURL=userStats.js.map
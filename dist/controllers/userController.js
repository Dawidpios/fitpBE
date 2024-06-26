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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.getUser = exports.addUser = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const hashPassword_1 = require("../lib/hashPassword");
const comparePassword_1 = require("../lib/comparePassword");
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
        return res.status(400).send({ msg: `Missing arguments name: ${name}, pass: ${password} or email: ${email}` });
    }
    const userExist = yield prismaClient_1.default.user.findUnique({ where: { email: email } });
    if (userExist) {
        return res.status(409).json({ message: "User already exist" });
    }
    const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
    yield prismaClient_1.default.user.create({ data: { name, password: hashedPassword, email } });
    return res.status(200).json({ message: "User has been created" });
});
exports.addUser = addUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const email = req.query.email;
    if (id) {
        const userExist = yield prismaClient_1.default.user.findUnique({ where: { id: id } });
        if (userExist) {
            const { password } = userExist, userWithoutPass = __rest(userExist, ["password"]);
            return res.status(200).send(Object.assign({}, userWithoutPass));
        }
        return res.status(404).send({ msg: "User not found" });
    }
    if (email) {
        const userExist = yield prismaClient_1.default.user.findUnique({ where: { email: email } });
        if (userExist) {
            const { password } = userExist, userWithoutPass = __rest(userExist, ["password"]);
            return res.status(200).send(Object.assign({}, userWithoutPass));
        }
        return res.status(404).send({ msg: "User not found" });
    }
    return res.status(400).send({ msg: "You should use user id or email" });
});
exports.getUser = getUser;
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ msg: "You need to pass email and password" });
    }
    const user = yield prismaClient_1.default.user.findUnique({ where: { email: email } });
    const authUser = yield (0, comparePassword_1.comparePassword)(password, user.password);
    if (authUser) {
        const { password } = user, userWithoutPass = __rest(user, ["password"]);
        return res.status(200).send(Object.assign({}, userWithoutPass));
    }
    else {
        return res.status(401).send({ msg: "Authentication failed" });
    }
});
exports.authUser = authUser;
//# sourceMappingURL=userController.js.map
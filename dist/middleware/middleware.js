"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY || "default";
const middleware = {
    authenticateUser: (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Token no proporcionado" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            req.nombre = decoded;
            next();
        }
        catch (error) {
            res.status(403).json({ message: "Token inválido" });
            return;
        }
    }
};
exports.default = middleware;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY || "default";
const middleware = {
    authenticateUser: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("⛔ Token no proporcionado o mal formado");
            res.status(401).json({ message: "Token no proporcionado" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            if (!decoded || !decoded.nombre) {
                console.log("❌ Token sin nombre");
                res.status(403).json({ message: "Token inválido" });
                return;
            }
            console.log("✅ Token válido:", decoded);
            req.nombre = decoded.nombre;
            next();
        }
        catch (error) {
            console.log("❌ Token inválido o expirado:", error.message);
            res.status(403).json({ message: "Token inválido o expirado" });
            return;
        }
    }
};
exports.default = middleware;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuariosModel_1 = __importDefault(require("../model/usuariosModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET || "default";
const userControllers = {
    // Registro de usuario
    registerUser: async (req, res) => {
        const { nombre, contraseña } = req.body;
        const users = usuariosModel_1.default.readUser();
        const existingUser = users.find((user) => user.nombre === nombre);
        if (existingUser) {
            res.status(400).json({ message: "El nombre de usuario ya está en uso" });
            return;
        }
        else if (!nombre || !contraseña) {
            res.status(400).json({ message: "Nombre y contraseña son requeridos" });
            return;
        }
        else if (contraseña.length < 6) {
            res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }
        try {
            const newUser = await usuariosModel_1.default.addUser({ nombre, contraseña });
            res.status(201).json({ message: 'usuario registrado correctamente', user: newUser });
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Error al registrar el usuario" });
            return;
        }
    },
    // Login de usuario
    loginUser: async (req, res) => {
        const { nombre, contraseña } = req.body;
        if (!nombre || !contraseña) {
            res.status(400).json({ message: "Nombre y contraseña son requeridos" });
            return;
        }
        const users = usuariosModel_1.default.readUser();
        const user = users.find((u) => u.nombre.toLowerCase() === nombre.toLowerCase());
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Contraseña incorrecta" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, nombre: user.nombre }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
        return;
    },
};
exports.default = userControllers;

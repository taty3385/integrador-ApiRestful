"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userPath = path_1.default.resolve(__dirname, "../data/user.json");
console.log("Ruta del archivo user.json:", userPath);
const modelUser = {
    readUser: () => {
        const users = fs_1.default.readFileSync(userPath, "utf8");
        if (!users) {
            fs_1.default.writeFileSync(userPath, "[]", "utf8");
            return [];
        }
        const user = JSON.parse(users);
        return user;
    },
    writeUser: (users) => {
        const user = JSON.stringify(users, null, 2);
        fs_1.default.writeFileSync(userPath, user, "utf8");
    },
    addUser: async (user) => {
        const users = modelUser.readUser();
        const hashedPassword = await bcrypt_1.default.hash(user.contraseña, 10);
        const newUser = {
            id: Date.now(),
            nombre: user.nombre,
            contraseña: hashedPassword,
        };
        users.push(newUser);
        modelUser.writeUser(users);
        return newUser;
    },
};
exports.default = modelUser;

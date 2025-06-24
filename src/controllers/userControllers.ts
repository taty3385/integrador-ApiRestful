import  { Request, Response } from 'express';
import modelUser from '../model/usuariosModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const secretKey = process.env.SECRET|| "default";

const userControllers = {
  // Registro de usuario
  registerUser: async (req: Request, res: Response) => {
    const { nombre, contraseña } = req.body;
    const users = modelUser.readUser();
    const existingUser = users.find((user: any) => user.nombre === nombre);
    
    if (existingUser) {
      res.status(400).json({ message: "El nombre de usuario ya está en uso" });
      return;
    } else if (!nombre || !contraseña) {
      res.status(400).json({ message: "Nombre y contraseña son requeridos" });
      return;
    } else if (contraseña.length < 6) {
      res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }
    try {
      const newUser = await modelUser.addUser({ nombre, contraseña });
      res.status(201).json({ message: 'usuario registrado correctamente', user: newUser });
      return;
    } catch (error) {
       res.status(500).json({ message: "Error al registrar el usuario" });
       return;
    }
  },

  // Login de usuario
  loginUser: async (req: Request, res: Response) => {
    const { nombre, contraseña } = req.body;
    if (!nombre || !contraseña) {
       res.status(400).json({ message: "Nombre y contraseña son requeridos" });
       return;
    }
    const users = modelUser.readUser();
    const user = users.find((u: any) => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (!user) {
     res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Contraseña incorrecta" });
        return;
    }
    const token = jwt.sign({ id: user.id, nombre: user.nombre }, secretKey, { expiresIn: '1h' });
     res.status(200).json({ token });
     return;
  },
};

export default userControllers;
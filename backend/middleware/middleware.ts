import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.SECRET_KEY || "default";

const middleware = {
  authenticateUser: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token no proporcionado" });
       return
    }

    try {
      const decoded = jwt.verify(token, secretKey) as { nombre: string };
      (req as any).nombre = decoded.nombre;
      next();
    } catch (error) {
      res.status(403).json({ message: "Token inválido" });
       return
    }
  }
};

export default middleware;



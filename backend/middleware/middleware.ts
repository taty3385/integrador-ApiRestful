import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.SECRET_KEY || "default";

const middleware = {
  authenticateUser: (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("⛔ Token no proporcionado o mal formado");
       res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secretKey) as { nombre: string };

      if (!decoded || !decoded.nombre) {
        console.log("❌ Token sin nombre");
         res.status(403).json({ message: "Token inválido" });
        return;
      }

      console.log("✅ Token válido:", decoded);
      (req as any).nombre = decoded.nombre;
      next();
    } catch (error: any) {
      console.log("❌ Token inválido o expirado:", error.message);
    res.status(403).json({ message: "Token inválido o expirado" });
    return
    }
  }
};

export default middleware;



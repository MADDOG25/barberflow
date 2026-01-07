import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verifica token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user || !req.user.isActive) {
        return res.status(401).json({
          status: "error",
          message: "Usuario no autorizado",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: "Token inválido",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token, acceso denegado",
    });
  }
};

// Verifica roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "No tienes permisos para esta acción",
      });
    }
    next();
  };
};

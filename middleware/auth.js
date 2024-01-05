import jwt from "jsonwebtoken";

export const verify_admin = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Token not provided." });
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const validated = jwt.verify(token, process.env.JWT_SECRET);
      if (validated.type === "admin") {
        next();
      } else {
        return res.status(403).json({ message: "Access denied!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const verify_staff = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Token not provided." });
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const validated = jwt.verify(token, process.env.JWT_SECRET);
      if (validated.type === "staff") {
        next();
      } else {
        return res.status(403).json({ message: "Access denied!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const verify_doctor = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Token not provided." });
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const validated = jwt.verify(token, process.env.JWT_SECRET);
      if (validated.type === "doctor") {
        next();
      } else {
        return res.status(403).json({ message: "Access denied!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

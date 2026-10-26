import jwt from "jsonwebtoken";

export function isAuth(req, res, next) {
  try {
    const token = req.get("Authorization").split(" ")[1];

    let decodedToken = jwt.verify(token, "secret");

    if (!decodedToken) {
      const error = new Error("not authenticated");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    error.statuCode = 500;
    throw error;
  }
}

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/index.js";

export const auth = (resolver) => async (parent, args, context, info) => {
  const authorization = context.req.headers.authorization;
  if (!authorization) {
    throw new Error("Unauthorized");
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = payload.user;
    context.user = user;
    return resolver(parent, args, context, info);
  } catch (error) {
    console.log(error);
    throw new Error("Unauthorized");
  }
};

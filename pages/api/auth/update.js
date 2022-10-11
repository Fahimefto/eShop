import { getSession } from "next-auth/react";
import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../db";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.json({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.json({ message: "signin required" });
  }

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 5)
  ) {
    res.json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();
  const toUpdateUser = await User.findById(session.token._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.json({
    message: "User updated",
  });
}

export default handler;

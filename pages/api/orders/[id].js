import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json("signin required");
  }

  await db.connect();

  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.json(order);
};

export default handler;

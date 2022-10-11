import { getSession } from "next-auth/react";
import db from "../../../db";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }
  const { token } = session;
  await db.connect();
  console.log(token);
  const orders = await Order.find({ user: session.token._id });
  await db.disconnect();
  res.json(orders);
};

export default handler;

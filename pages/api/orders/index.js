import { getSession } from "next-auth/react";

import Order from "../../../models/Order";
import db from "../../../db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  console.log(session);
  console.log(session.user);
  if (!session) {
    return res.status(401).json("signin required");
  }
  console.log(session);
  const { user } = session;
  await db.connect();

  const newOrder = new Order({
    ...req.body,
    user: session.token._id,
  });

  const order = await newOrder.save();
  res.status(201).json(order);
};
export default handler;

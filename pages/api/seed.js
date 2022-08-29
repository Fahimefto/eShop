import db from "../../db";
import data from "../../data/data";
import User from "../../models/User";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: "seed successfully " });
};

export default handler;

import db from "../../../db";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  await db.connect();
  const products = await Product.findById(req.query.id);
  await db.disconnect();
  res.status(200).json(products);
};

export default handler;

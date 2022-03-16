import type { NextApiRequest, NextApiResponse } from 'next';
import db from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const productFromDB = await db
    .collection("products")
    .doc(`${req.query.id}`)
    .get();
  res.status(200).json({ id: productFromDB.id, ...productFromDB.data() });
}

import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../types";
import db from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const promises = [];
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.API_TOKEN
  ) {
    const data: Product[] = req.body;
    const batch = db.batch();
    let counter = 0;
    for (const {
      name,
      description,
      category,
      photo,
      price,
      sold = false,
    } of data) {
      const docRef = db.collection("products").doc();
      batch.set(docRef, {
        name,
        description,
        category,
        photo,
        price,
        sold,
      });
      counter++;
    }

    promises.push(batch.commit());
    await Promise.all(promises);
    res.send(`${counter} products created`);
  } else {
    res.send("Nothing to do here");
  }
}

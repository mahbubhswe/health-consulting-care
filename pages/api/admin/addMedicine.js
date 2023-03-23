import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    await prisma.Medicine.create({
      ...req.body,
    });

    res.send("Medicine added successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const exam = await prisma.exam.findMany();
    res.send(exam);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

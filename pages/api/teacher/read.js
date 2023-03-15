import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const teacher = await prisma.teacher.findMany();
    res.send(teacher);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

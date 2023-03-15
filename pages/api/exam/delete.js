import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.delete(async (req, res) => {
  try {
    await prisma.exam.delete({
      where: {
        id: req.query.id,
      },
    });
    res.send("Stuent marks for this class and subject deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

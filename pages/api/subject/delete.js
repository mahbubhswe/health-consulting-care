import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.delete(async (req, res) => {
  try {
    await prisma.subject.delete({
      where: {
        id: req.query.id,
      },
    });
    res.send("Subject has been deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

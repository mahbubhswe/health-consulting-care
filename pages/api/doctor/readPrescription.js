import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const result = await prisma.Prescription.findMany({
      where: {
        reportedBy: req.query.email,
      },
    });
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

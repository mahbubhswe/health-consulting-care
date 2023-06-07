import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    await prisma.PatientReport.findOne({
      where: {
        id: req.query.id,
        },
        select: {
            
        }
    });
    res.send("Report deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

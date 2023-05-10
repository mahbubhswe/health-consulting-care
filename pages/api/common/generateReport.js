import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    await prisma.PatientReport.create({
      data: {
        ...req.body,
      },
    });

    res.send("Report generated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    await prisma.Prescription.create({
      data: {
        ...req.body,
      },
    });

    res.send("Presentation created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

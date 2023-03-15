import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    const isExist = await prisma.daySubjectAndTime.findMany({
      where: {
        AND: [
          { day: req.body.day },
          { subject: req.body.subject },
          { className: req.body.className },
          { startTime: req.body.startTime },
          { endTime: req.body.endTime },
        ],
      },
    });
    if (isExist.length > 0) {
      res.send(
        "Sorry, you have already added same record. Duplicate entry is not allowed"
      );
    } else {
      await prisma.daySubjectAndTime.create({
        data: req.body,
      });
      res.send("Subject and time added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

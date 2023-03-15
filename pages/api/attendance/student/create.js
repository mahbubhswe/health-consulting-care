import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check tody's attendance exist or not
    const isExist = await prisma.studentAttendance.findMany({
      where: {
        AND: [
          { className: req.body[0].className },
          { subjectId: req.body[0].subjectId },
          { createdAt: req.body[0].createdAt },
        ],
      },
    });
    if (isExist.length > 0) {
      res.send("Sorry, today's attendance already taken");
    } else {
      await prisma.studentAttendance.createMany({
        data: req.body,
      });
      res.send("Attendance saved successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

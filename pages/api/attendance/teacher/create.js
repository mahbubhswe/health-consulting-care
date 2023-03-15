import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check tody's attendance exist or not
    const isExist = await prisma.TeacherAttendance.findFirst({
      where: {
        createdAt: req.body.createdAt,
      },
    });
    if (isExist) {
      res.send("Sorry, today's attendance already taken");
    } else {
      await prisma.TeacherAttendance.createMany({
        data: req.body,
      });
      res.send("Attendance saved successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

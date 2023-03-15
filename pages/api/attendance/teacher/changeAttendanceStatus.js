import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.TeacherAttendance.update({
      where: {
        id: req.query.id,
      },
      data: { status: req.query.status == "present" ? "absent" : "present" },
    });
    res.send("Attendance status has been updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.delete(async (req, res) => {
  try {
    await prisma.studentAttendance.delete({
      where: {
        id: req.query.id,
      },
    });
    res.send("Student attendance has been deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

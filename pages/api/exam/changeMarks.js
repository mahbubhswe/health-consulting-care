import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  if (Number(req.query.marks) >= 0 && Number(req.query.marks) <= Number(req.query.outOfMarks)) {
    try {
      await prisma.exam.update({
        where: {
          id: req.query.id,
        },
        data: { marks: Number(req.query.marks) },
      });
      res.send("Student marks for this class and subject changed successfully");
    } catch (error) {
      res.send(error.message);
    }
  } else {
    res.send(
      `Marks should be positive number and less than or equal to ${req.query.outOfMarks}`
    );
  }
});

export default handler;

import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.delete(async (req, res) => {
  try {
    await prisma.student.delete({
      where: {
        id: req.query.id,
      },
    });
    res.send("Student has been deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

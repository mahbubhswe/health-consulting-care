import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
  try {
    const student = await prisma.student.findMany();
    const teacher = await prisma.teacher.findMany();
    const payment = await prisma.payment.findMany();

    res.send(classList);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    await prisma.payment.create({
      data: {
        studentName: req.body.studentName,
        studentId: req.body.studentId,
        className: req.body.className,
        amount: Number(req.body.amount),
      },
    });
    res.send("Payment saved successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

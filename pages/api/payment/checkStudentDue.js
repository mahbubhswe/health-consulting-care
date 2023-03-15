import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        studentId: req.query.studentId,
      },
      select: {
        studentId: true,
        className: true,
      },
    });

    const paymentList = await prisma.payment.findMany({
      where: {
        AND: [
          { studentId: req.query.studentId },
          { className: student.className },
        ],
      },
      select: {
        amount: true,
      },
    });

    const fees = await prisma.fees.findUnique({
      where: {
        className: student.className,
      },
      select: {
        totalAmount: true,
      },
    });
    const totalPaid = paymentList.reduce((a, c) => a + c.amount, 0);
    res.send(fees.totalAmount > totalPaid ? true : false);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

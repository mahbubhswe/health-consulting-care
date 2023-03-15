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
        className: true,
        payment: {
          select: {
            amount: true,
            className: true,
          },
        },
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
    const totalPaid = student.payment.reduce((a, c) => a + c.amount, 0);
    const currentClassPayment = student.payment.filter(
      (item) => item.className == student.className
    );
    const paidOnCurrentClass = currentClassPayment.reduce(
      (a, c) => a + c.amount,
      0
    );
    const obj = {
      totalPaid,
      payable: fees.totalAmount,
      due: fees.totalAmount - paidOnCurrentClass
    };
    res.send(obj);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

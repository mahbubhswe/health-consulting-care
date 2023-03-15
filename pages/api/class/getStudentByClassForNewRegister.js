import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const studentOfSelectedClass = await prisma.Class.findUnique({
      where: {
        className: req.query.className,
      },
      select: {
        student: {
          select: {
            id: true,
            name: true,
            studentId: true,
          },
        },
      },
    });

    await Promise.all(
      studentOfSelectedClass.student.map(async (item) => {
        const paymentList = await prisma.payment.findMany({
          where: {
            AND: [
              { studentId: item.studentId },
              { className: req.query.className },
            ],
          },
          select: {
            amount: true,
          },
        });

        const fees = await prisma.fees.findUnique({
          where: {
            className: req.query.className,
          },
          select: {
            totalAmount: true,
          },
        });
        const totalPaid = paymentList.reduce((a, c) => a + c.amount, 0);
        item.dueAmount = fees.totalAmount - totalPaid;
      })
    );

    res.send(studentOfSelectedClass.student);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

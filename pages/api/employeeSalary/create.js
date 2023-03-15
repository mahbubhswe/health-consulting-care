import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  console.log(req.body);
  try {
    const isExist = await prisma.EmployeeSalary.findMany({
      where: {
        AND: [
          { employeeId: req.body.employeeId },
          { amount: Number(req.body.amount) },
          { createdAt: req.body.createdAt },
        ],
      },
    });

    if (isExist.length > 0) {
      res.send("Employee's salary already exists for this month");
    } else {
      await prisma.EmployeeSalary.create({
        data: {
          employeeId: req.body.employeeId,
          amount: Number(req.body.amount),
          createdAt: req.body.createdAt,
        },
      });
      res.send("Employee's salary information saved successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

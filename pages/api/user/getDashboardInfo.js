import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const totalStudent = await prisma.Student.findMany();
    const totalTeacher = await prisma.Teacher.findMany();
    const totalStaff = await prisma.User.findMany();
    const totalEmployee = await prisma.Employee.findMany();
    const payment = await prisma.Payment.findMany({
      select: {
        amount: true,
      },
    });
    const utilityCost = await prisma.UtilityCost.findMany({
      select: {
        amount: true,
      },
    });
    const employeeSalary = await prisma.EmployeeSalary.findMany({
      select: {
        amount: true,
      },
    });
    const employee = await prisma.Employee.findMany({
      select: {
        salary: true,
      },
    });
    const withdraw = await prisma.Withdraw.findMany({
      select: {
        amount: true,
      },
    });
    const totalPayment = payment.reduce((a, c) => a + c.amount, 0);
    const totalUtilityCost = utilityCost.reduce((a, c) => a + c.amount, 0);
    const paidEmployeeSalary = employeeSalary.reduce((a, c) => a + c.amount, 0);
    const totalWithdraw = withdraw.reduce((a, c) => a + c.amount, 0);
    const totalEmployeeSalary = employee.reduce((a, c) => a + c.salary, 0);

    const obj = {
      totalStudent: totalStudent.length,
      totalTeacher: totalTeacher.length,
      totalStaff: totalStaff.length,
      totalEmployee: totalEmployee.length,
      totalPayment,
      totalUtilityCost,
      totalEmployeeSalary,
      totalWithdraw,
      paidEmployeeSalary,
      balance:
        totalPayment - (totalUtilityCost + totalWithdraw + paidEmployeeSalary),
    };
    res.send(obj);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const employeeSalary = await prisma.EmployeeSalary.findMany();
    res.send(employeeSalary);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    await prisma.Employee.update({
      where: {
        id: req.body.id,
      },
      data: {
        employeeName: req.body.employeeName,
        employeeType: req.body.employeeType,
        employeePhone: req.body.employeePhone,
        salary: Number(req.body.salary),
      },
    });
    res.send("Employee's information updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

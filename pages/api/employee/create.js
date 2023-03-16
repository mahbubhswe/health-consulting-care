import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check employee exist or not
    const isExist = await prisma.Doctor.findUnique({
      where: { email: String(req.body.email) },
    });
    if (isExist) {
      res.send("Sorry, this doctor already exists");
    } else {
      await prisma.Doctor.create({
        data: {
          employeeId: String(req.body.employeeId),
          employeeName: req.body.employeeName,
          employeeType: req.body.employeeType,
          employeePhone: req.body.employeePhone,
          salary: Number(req.body.salary),
        },
      });
      res.send("Employee added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

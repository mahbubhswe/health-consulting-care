import bcryptjs from "bcryptjs";
import { isAuth } from "../../../utils/auth";
import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    const {
      name,
      className,
      studentId,
      phone,
      email,
      password,
      address,
      gender,
      dob,
      fatherName,
      motherName,
      guardianContactNumber,
    } = req.body;
    await prisma.student.create({
      data: {
        name,
        className,
        studentId,
        phone: phone ? phone : "",
        email: email ? email : "",
        password,
        address,
        gender,
        dob,
        fatherName,
        motherName,
        guardianContactNumber,
        password: bcryptjs.hashSync(password),
      },
    });
    res.send("Student addded successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

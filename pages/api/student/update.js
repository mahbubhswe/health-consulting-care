import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    const {
      id,
      className,
      studentId,
      rollNumber,
      name,
      phone,
      email,
      dob,
      gender,
      address,
      fatherName,
      motherName,
      guardianContactNumber,
    } = req.body;
    await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        className,
        studentId,
        rollNumber,
        name,
        phone,
        email,
        dob,
        gender,
        address,
        fatherName,
        motherName,
        guardianContactNumber,
      },
    });
    res.send("Student information has been updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

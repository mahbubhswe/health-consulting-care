import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    const {
      studentId,
      phone,
      email,
      address,
      fatherName,
      motherName,
      bloodGroup,
    } = req.body;
    await prisma.student.update({
      where: {
        studentId: studentId,
      },
      data: {
        phone,
        email,
        address,
        fatherName,
        motherName,
        bloodGroup,
      },
    });
    res.send("Profile updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    const {
      id,
      avatar,
      name,
      teacherInitial,
      phone,
      email,
      address,
      gender,
      education,
      designation,
    } = req.body;
    await prisma.teacher.update({
      where: { id: id },
      data: {
        name: name,
        teacherInitial: teacherInitial,
        phone: phone,
        email: email,
        gender: gender,
        address: address,
        avatar: avatar,
        education: education,
        designation: designation,
      },
    });
    res.send("Teacher's information has been updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

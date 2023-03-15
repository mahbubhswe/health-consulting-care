import bcryptjs from "bcryptjs";
import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check teacher initial exist or not
    const isExist = await prisma.teacher.findUnique({
      where: {
        teacherInitial: req.body.teacherInitial,
      },
    });
    if (isExist) {
      res.send("Sorry, this teacher ID already exists");
    } else {
      const {
        avatar,
        name,
        teacherInitial,
        phone,
        email,
        password,
        address,
        gender,
        education,
        designation,
        groupName,
      } = req.body;
      await prisma.teacher.create({
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
          groupName: groupName,
          password: bcryptjs.hashSync(password),
        },
      });
      res.send("Teacher addded successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

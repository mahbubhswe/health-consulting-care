import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../utils/db";
import { teacherSignToken } from "../../../../utils/auth.js";
const handler = nc();
handler.post(async (req, res, next) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { email: req.query.email },
    });

    if (teacher && bcryptjs.compareSync(req.query.password, teacher.password)) {
      const token = teacherSignToken(teacher);
      res.send({
        token,
        name: teacher.name,
        phone: teacher.phone,
        email: teacher.email,
        teacherInitial: teacher.teacherInitial,
        designation: teacher.designation,
      });
    } else if (teacher) {
      res.send("Invalid email or password");
    } else {
      res.send("Sorry, no teacher exists with this email address");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

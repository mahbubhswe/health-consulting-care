import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check doctor exist or not
    const isExist = await prisma.Doctor.findUnique({
      where: { email: String(req.body.email) },
    });
    if (isExist) {
      res.send("Sorry, this employee already exists");
    } else {
      const { fullName, phone, email, password, departmentName, gender } =
        req.body;
      await prisma.Doctor.create({
        data: {
          fullName,
          departmentName,
          phone,
          email,
          gender,
          password: bcryptjs.hashSync(password),
        },
      });

      res.send("Doctor added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

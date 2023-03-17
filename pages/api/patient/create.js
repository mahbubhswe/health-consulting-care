import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    //check patient exist or not
    const isExist = await prisma.Patient.findUnique({
      where: { phone: String(req.body.phone) },
    });
    if (isExist) {
      res.send("Sorry, this patient already exists");
    } else {
      const { fullName, phone, password, gender } = req.body;
      await prisma.Patient.create({
        data: {
          fullName,
          phone,
          gender,
          password: bcryptjs.hashSync(password),
        },
      });

      res.send("Account created successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

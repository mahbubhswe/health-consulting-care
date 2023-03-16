import bcryptjs from "bcryptjs";
import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    //check Admin already exist or not
    const admin = await prisma.Admin.findMany({
      where: {
        OR: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    if (admin.length > 0) {
      res.send("Sorry, admin already exists with this information");
    } else {
      const { fullName, phone, email, password } = req.body;
      await prisma.Admin.create({
        data: {
          fullName: fullName,
          phone: phone,
          email: email,
          password: bcryptjs.hashSync(password),
        },
      });
      res.send("Admin addded successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

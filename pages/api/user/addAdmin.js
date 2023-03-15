import bcryptjs from "bcryptjs";
import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    //check user already exist or not
    const user = await prisma.user.findMany({
      where: {
        OR: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    if (user.length > 0) {
      res.send("Sorry, user already exists with this information");
    } else {
      const { name, phone, email, gender, password } = req.body;
      await prisma.user.create({
        data: {
          name: name,
          phone: phone,
          email: email,
          gender: gender,
          role: "System Administrator",
          password: bcryptjs.hashSync(password),
        },
      });
      res.send("User addded successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

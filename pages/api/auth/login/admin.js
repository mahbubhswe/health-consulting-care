import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../utils/db";
import { adminSignToken } from "../../../../utils/auth.js";
const handler = nc();
handler.post(async (req, res, next) => {
  try {
    const admin = await prisma.Admin.findUnique({
      where: { email: req.query.email },
    });

    if (admin && bcryptjs.compareSync(req.query.password, admin.password)) {
      const token = adminSignToken(admin);
      res.send({
        token,
        fullName: admin.fullName,
        phone: admin.phone,
        email: admin.email,
      });
    } else if (admin) {
      res.send("Invalid email or password");
    } else {
      res.send("Sorry, no admin exists with this email address");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

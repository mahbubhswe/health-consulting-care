import bcryptjs from "bcryptjs";
import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  if (req.query.password.length < 6) {
    res.send("Password must be at least 6 characters long");
  } else {
    try {
      await prisma.student.update({
        where: {
          id: req.query.id,
        },
        data: {
          password: bcryptjs.hashSync(req.query.password),
        },
      });
      res.send("Password has been changed successfully");
    } catch (error) {
      res.send(error.message);
    }
  }
});

export default handler;

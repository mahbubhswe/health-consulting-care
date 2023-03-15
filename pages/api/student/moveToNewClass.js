import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    req.body.ids.forEach(async (id) => {
      await prisma.student.update({
        where: {
          id,
        },
        data: {
          className: req.body.className,
        },
      });
    });
    res.send("Student's class updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    const isExist = await prisma.ClassRoutine.findMany({
      where: {
        className: req.body.className,
      },
    });
    if (isExist.length > 0) {
      res.send("Sorry, This routine already exist");
    } else {
      await prisma.ClassRoutine.create({
        data: req.body,
      });
      res.send("Routine created successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

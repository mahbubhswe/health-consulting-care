import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check class exist or not
    const isExist = await prisma.class.count({
      where: {
        AND: [
          { className: req.body.className },
          { className: req.body.year },
        ],
      },
    });
    if (isExist) {
      res.send("Sorry, this class already exists");
    } else {
      await prisma.class.create({
        data: req.body,
      });
      res.send("Class created successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

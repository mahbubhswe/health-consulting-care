import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    await prisma.Noticeboard.update({
      where: {
        id: req.body.id,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });
    res.send("Notice has been updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

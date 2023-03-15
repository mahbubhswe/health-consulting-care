import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    await prisma.RecentEvents.create({
      data: req.body,
    });
    res.send("Event added successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

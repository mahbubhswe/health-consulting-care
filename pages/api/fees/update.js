import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  try {
    await prisma.Fees.update({
      where: {
        id,
      },
      data: req.body,
    });
    res.send("Fees updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

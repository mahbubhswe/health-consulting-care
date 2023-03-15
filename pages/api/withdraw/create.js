import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    await prisma.withdraw.create({
      data: {
        amount: Number(req.body.amount),
      },
    });
    res.send("Your transaction processed successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.delete(async (req, res) => {
  try {
    await prisma.payment.delete({
      where: {
        id: req.query.id,
      },
    });
    res.send("Payment record has been deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

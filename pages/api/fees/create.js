import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check instalment exist or not
    const isExist = await prisma.Fees.findUnique({
      where: {
        className: req.body.className,
      },
    });
    if (isExist) {
      res.send("Sorry, fees of this class already exists");
    } else {
      await prisma.Fees.create({
        data: req.body,
      });
      res.send("Fees saved successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

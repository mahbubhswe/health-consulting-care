import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    //check person exist or not
    const isExist = await prisma.BloodBank.findUnique({
      where: { phone: String(req.body.phone) },
    });
    if (isExist) {
      res.send("Sorry, this doner already exists");
    } else {
      await prisma.BloodBank.create({
        data:req.body,
      });

      res.send("Doner added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

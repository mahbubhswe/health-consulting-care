import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    //check cabine exist or not
    const isExist = await prisma.Cabin.count({
      where: {
        roomAndCabinNumber: req.body.roomAndCabinNumber,
      },
    });
    if (isExist > 0) {
      res.send("Sorry, this cabine already exists");
    } else {
      await prisma.Cabin.create({
        data: req.body,
      });

      res.send("Cabin added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

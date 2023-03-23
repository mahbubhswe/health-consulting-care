import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    //check cabine exist or not
    const isExist = await prisma.Cabin.findUnique({
      where: {
        AND: [
          { roomNumber: req.body.roomNumber },
          { cabineNumber: req.body.cabineNumber },
        ],
      },
    });
    if (isExist) {
      res.send("Sorry, this cabine already exists");
    } else {
      await prisma.Cabin.create({
        ...req.body,
      });

      res.send("Cabin added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    //check cabine exist or not
    const isExist = await prisma.Ambulance.findUnique({
      where: { ambulanceNumber: req.body.ambulanceNumber },
    });
    if (isExist) {
      res.send("Sorry, this ambulance already exists");
    } else {
      await prisma.Ambulance.create({
        ...req.body,
      });

      res.send("Ambulance added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

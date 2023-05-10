import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    await prisma.Doctor.update({
      where: {
        id: req.query.id,
      },
      data: {
        ...req.body,
      },
    });

    res.send("Doctor updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

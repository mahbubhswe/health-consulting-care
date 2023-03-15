import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check subject exist or not in this class
    const isExist = await prisma.subject.findMany({
      where: {
        AND: [
          { className: req.body.className },
          { subjectName: req.body.subjectName },
        ],
      },
    });
    if (isExist.length > 0) {
      res.send("Sorry, this subject already exists");
    } else {
      await prisma.subject.create({
        data: req.body,
      });
      res.send("Subject created successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

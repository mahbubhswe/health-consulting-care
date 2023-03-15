import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check group exist or not
    const isExist = await prisma.group.findUnique({
      where: {
        groupName: req.body.groupName,
      },
    });
    if (isExist) {
      res.send("Sorry, this group already exists");
    } else {
      await prisma.group.create({
        data: req.body,
      });
      res.send("Group created successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

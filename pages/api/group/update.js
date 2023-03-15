import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  if (req.body.groupName.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
    if (req.body.groupName.length < 3) {
      res.send("Group name must be at least 3 characters");
    }
    try {
      const { id, groupName, photo } = req.body;
      await prisma.group.update({
        where: {
          id,
        },
        data: {
          groupName,
          photo,
        },
      });
      res.send("Group information has been updated successfully");
    } catch (error) {
      res.send(error.message);
    }
  } else {
    res.send(
      "Input allowed only alphabetic characters and space not allowed at the beginning and end of the string"
    );
  }
});

export default handler;

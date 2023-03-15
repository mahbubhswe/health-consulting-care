import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  if (req.query.className.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
    if (req.query.className.length < 3) {
      res.send("Class name must be at least 3 characters");
    }
    try {
      await prisma.class.update({
        where: {
          id: req.query.id,
        },
        data: {
          className: req.query.className,
        },
      });
      res.send("Class name updated successfully");
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

import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  if (req.query.subjectName.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
    if (req.query.subjectName.length < 3) {
      res.send("Subject name must be at least 3 characters");
    }
    try {
      await prisma.subject.update({
        where: {
          id: req.query.id,
        },
        data: { subjectName: req.query.subjectName },
      });
      res.send("Subject name updated successfully");
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

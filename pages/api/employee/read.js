import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const employee = await prisma.Employee.findMany();
    res.send(employee);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

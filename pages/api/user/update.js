import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
  try {
    const { id, name, phone, email, gender, role } = req.body;
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        phone: phone,
        email: email,
        gender: gender,
        role: role,
      },
    });
    res.send("User information updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

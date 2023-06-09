import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { isAuth } from "../../../utils/auth";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    //check doctor exist or not
    const isExist = await prisma.Doctor.findUnique({
      where: { email: String(req.body.email) },
    });
    if (isExist) {
      res.send("Sorry, this doctor already exists");
    } else {
      const {
        fullName,
        phone,
        email,
        password,
        departmentName,
        gender,
        roomNumber,
        profilePic,
        description,
        visitingHours,
      } = req.body;
      await prisma.Doctor.create({
        data: {
          fullName,
          profilePic,
          description,
          visitingHours,
          departmentName,
          phone,
          email,
          gender,
          roomNumber: Number(roomNumber),
          password: bcryptjs.hashSync(password),
        },
      });

      res.send("Doctor added successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

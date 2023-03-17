import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../utils/db";
import { doctorSignToken } from "../../../../utils/auth.js";
const handler = nc();
handler.post(async (req, res, next) => {
  try {
    const doctor = await prisma.Doctor.findUnique({
      where: { email: req.query.email },
    });

    if (doctor && bcryptjs.compareSync(req.query.password, doctor.password)) {
      const token = doctorSignToken(doctor);
      res.send({
        token,
        fullName: doctor.fullName,
        phone: doctor.phone,
        email: doctor.email,
        departmentName: doctor.departmentName,
      });
    } else if (doctor) {
      res.send("Invalid email or password");
    } else {
      res.send("Sorry, no doctor exists with this email address");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

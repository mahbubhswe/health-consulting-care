import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../utils/db";
import { patientSignToken } from "../../../../utils/auth.js";
const handler = nc();
handler.post(async (req, res, next) => {
  try {
    const patient = await prisma.Patient.findUnique({
      where: { phone: req.query.phone },
    });

    if (patient && bcryptjs.compareSync(req.query.password, patient.password)) {
      const token = patientSignToken(patient);
      res.send({
        token,
        fullName: patient.fullName,
        phone: patient.phone,
      });
    } else if (patient) {
      res.send("Invalid phone or password");
    } else {
      res.send("Sorry, no patient exists with this phone number");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

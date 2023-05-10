import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const doctor = await prisma.Doctor.count();
    const patient = await prisma.Patient.count();
    const bloodBank = await prisma.BloodBank.count();
    const patientReport = await prisma.PatientReport.count();
    const pendingAppoitment = await prisma.Appointment.count({
      where: {
        status: "pending",
      },
    });
    const approveAppoitment = await prisma.Appointment.count({
      where: {
        status: "approved",
      },
    });
    const freeAmbulance = await prisma.AmbulanceBooking.count({
      where: {
        status: "booked",
      },
    });
    const bookedAmbulance = await prisma.AmbulanceBooking.count({
      where: {
        status: "booked",
      },
    });
    const freeCabin = await prisma.CabinBooking.count({
      where: {
        status: "free",
      },
    });
    const bookedCabin = await prisma.CabinBooking.count({
      where: {
        status: "free",
      },
    });
    const obj = {
      freeAmbulance: freeAmbulance ? freeAmbulance : 0,
      bookedAmbulance: bookedAmbulance ? bookedAmbulance : 0,
      freeCabin: freeCabin ? freeCabin : 0,
      bookedCabin: bookedCabin ? bookedCabin : 0,
      doctor: doctor ? doctor : 0,
      patient: patient ? patient : 0,
      bloodBank: bloodBank ? bloodBank : 0,
      patientReport: patientReport ? patientReport : 0,
      pendingAppoitment: pendingAppoitment ? pendingAppoitment : 0,
      approveAppoitment: approveAppoitment ? approveAppoitment : 0,
    };
    res.send(obj);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

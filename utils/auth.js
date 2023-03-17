import jwt from "jsonwebtoken";

export const adminSignToken = (admin) => {
  return jwt.sign(
    {
      fullName: admin.fullName,
      phone: admin.phone,
      email: admin.email,
    },
    process.env.JWT_Secreet,
    {
      expiresIn: "30d",
    }
  );
};
export const doctorSignToken = (doctor) => {
  return jwt.sign(
    {
      fullName: doctor.fullName,
      phone: doctor.phone,
      email: doctor.email,
      departmentName: doctor.departmentName,
    },
    process.env.JWT_Secreet,
    {
      expiresIn: "30d",
    }
  );
};
export const patientSignToken = (patient) => {
  return jwt.sign(
    {
      fullName: patient.fullName,
      phone: patient.phone,
    },
    process.env.JWT_Secreet,
    {
      expiresIn: "30d",
    }
  );
};
export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_Secreet, (error, decode) => {
      if (error) {
        res.send("Token is not valid");
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.send("Token is empty");
  }
};

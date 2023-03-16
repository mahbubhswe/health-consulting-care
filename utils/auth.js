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
export const teacherSignToken = (teacher) => {
  return jwt.sign(
    {
      name: teacher.name,
      phone: teacher.phone,
      email: teacher.email,
      teacherInitial: teacher.teacherInitial,
      designation: teacher.designation,
    },
    process.env.JWT_Secreet,
    {
      expiresIn: "30d",
    }
  );
};
export const studentSignToken = (student) => {
  return jwt.sign(
    {
      name: student.name,
      studentId: student.studentId,
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

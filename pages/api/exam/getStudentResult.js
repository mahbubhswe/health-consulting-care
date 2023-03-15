import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const exam = await prisma.exam.findMany({
      where: {
        AND: [
          { studentId: req.query.studentId },
          { className: req.query.className },
        ],
      },
      select: {
        subjectName: true,
        marks: true,
        outOfMarks: true,
        className:true
      },
    });
    if (exam.length > 0) {
      const student = await prisma.student.findMany({
        where: {
          studentId: req.query.studentId,
        },
        select: {
          name: true,
          studentId: true,
        },
      });

      exam.forEach((element) => {
        element.grades = genarateGrade(element.marks);
        element.point = genaratePoint(element.marks);
      });

      const check = exam.filter((item) => item.marks < 33);
      const totalMarks = exam.reduce((a, c) => a + c.marks, 0);
      const outOfTotalMarks = exam.reduce((a, c) => a + c.outOfMarks, 0);
      const avgMarks = Math.floor(totalMarks / exam.length);
      let percentage = (totalMarks / outOfTotalMarks) * 100;

      const obj = {
        studentId: student[0].studentId,
        className: req.query.className,
        name: student[0].name,
        totalMarks: totalMarks,
        outOfTotalMarks: outOfTotalMarks,
        avgMarks: avgMarks ? avgMarks : 0,
        grades: genarateGrade(percentage),
        point: genaratePoint(percentage),
        result: check.length > 0 ? "Failed" : "Passed",
        subjectWiseInfo: exam,
      };
      res.send(obj);
    } else {
      res.send("Sorry, result not found");
    }
  } catch (error) {
    res.send(error.message);
  }
});

function genarateGrade(marks) {
  let grades;
  if (marks <= 100 && marks >= 80) {
    grades = "A+";
  } else if (marks <= 79 && marks >= 70) {
    grades = "A";
  } else if (marks <= 69 && marks >= 60) {
    grades = "A-";
  } else if (marks <= 59 && marks >= 50) {
    grades = "B";
  } else if (marks <= 49 && marks >= 40) {
    grades = "C";
  } else if (marks <= 33 && marks >= 39) {
    grades = "D";
  } else {
    grades = "F";
  }

  return grades;
}
function genaratePoint(marks) {
  let point;
  if (marks <= 100 && marks >= 80) {
    point = 5.0;
  } else if (marks <= 79 && marks >= 70) {
    point = 4.0;
  } else if (marks <= 69 && marks >= 60) {
    point = 3.5;
  } else if (marks <= 59 && marks >= 50) {
    point = 3.0;
  } else if (marks <= 49 && marks >= 40) {
    point = 2.0;
  } else if (marks <= 33 && marks >= 39) {
    point = 1.0;
  } else {
    point = 0.0;
  }

  return point;
}
export default handler;

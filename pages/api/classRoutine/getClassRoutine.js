import moment from "moment/moment";
import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  const saturday = [{ day: "Saturday" }];
  const sunday = [{ day: "Sunday" }];
  const monday = [{ day: "Monday" }];
  const tuesday = [{ day: "Tuesday" }];
  const wednesday = [{ day: "Wednesday" }];
  const thursday = [{ day: "Thursday" }];
  const friday = [{ day: "Friday" }];
  try {
    const classRoutine = await prisma.ClassRoutine.findFirst({
      where: {
        className: req.query.className,
      },
      select: {
        daySubjectAndTime: {
          select: {
            day: true,
            subject: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    classRoutine.daySubjectAndTime.forEach((element) => {
      if (element.day == "Saturday") {
        saturday.push({
          subject: element.subject,
          startTime: moment(element.startTime).format("HH:mm"),
          endTime: moment(element.endTime).format("HH:mm"),
        });
      } else if (element.day == "Sunday") {
        sunday.push({
          subject: element.subject,
          startTime: moment(element.startTime).format("HH:mm"),
          endTime: moment(element.endTime).format("HH:mm"),
        });
      } else if (element.day == "Monday") {
        monday.push({
          subject: element.subject,
          startTime: moment(element.startTime).format("HH:mm"),
          endTime: moment(element.endTime).format("HH:mm"),
        });
      } else if (element.day == "Tuesday") {
        tuesday.push({
          subject: element.subject,
          startTime: moment(element.startTime).format("HH:mm"),
          endTime: moment(element.endTime).format("HH:mm"),
        });
      } else if (element.day == "Wednesday") {
        wednesday.push({
          subject: element.subject,
          startTime: moment(element.startTime).format("HH:mm"),
          endTime: moment(element.endTime).format("HH:mm"),
        });
      } else if (element.day == "Thursday") {
        thursday.push({
          subject: element.subject,
          startTime: moment(element.startTime).format("HH:mm"),
          endTime: moment(element.endTime).format("HH:mm"),
        });
      } else {
        friday.push({
          subject: element.subject,
          startTime: moment(element.startTime).format("HH:mm"),
          endTime: moment(element.endTime).format("HH:mm"),
        });
      }
    });
    res.send([saturday, sunday, monday, tuesday, wednesday, thursday, friday]);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;

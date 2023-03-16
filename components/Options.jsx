import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";
import Cookies from "js-cookie";
export default function Options() {
  const [user, setUser] = React.useState();
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setUser(userInfo ? userInfo.role : null);
  });
  return (
    <List dense={true}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard")}>
          <ListItemIcon>
            <Image
              src="/icons/dashboard.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItemButton>
      </ListItem>
      <Box sx={{ display: user == "System Administrator" ? "block" : "none" }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/teacher-portal/attendance/student")}
          >
            <ListItemIcon>
              <Image
                src="/icons/attendance.png"
                height={25}
                width={25}
                quality={100}
                alt="icon"
              />
            </ListItemIcon>
            <ListItemText>Add Doctor</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/teacher-portal/examination")}
          >
            <ListItemIcon>
              <Image
                src="/icons/exam.png"
                height={25}
                width={25}
                quality={100}
                alt="icon"
              />
            </ListItemIcon>
            <ListItemText>Examination</ListItemText>
          </ListItemButton>
        </ListItem>
      </Box>
      <ListItem
        disablePadding
        sx={{ display: user == "System Administrator" ? "block" : "none" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/user")}>
          <ListItemIcon>
            <Image
              src="/icons/user.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>User</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/class")}>
          <ListItemIcon>
            <Image
              src="/icons/class.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Class</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/subject")}>
          <ListItemIcon>
            <Image
              src="/icons/subject.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Subject</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton
          onClick={() => router.push("/dashboard/attendance/teacher")}
        >
          <ListItemIcon>
            <Image
              src="/icons/attendance.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Teacher attendance</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton
          onClick={() => router.push("/dashboard/teacher-assign")}
        >
          <ListItemIcon>
            <Image
              src="/icons/teacherAssign.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Teacher assign</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/student")}>
          <ListItemIcon>
            <Image
              src="/icons/students.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Student</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "block" : "none" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/withdraw")}>
          <ListItemIcon>
            <Image
              src="/icons/withdraw.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Withdraw</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/teacher")}>
          <ListItemIcon>
            <Image
              src="/icons/teacher.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Teacher</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "School Clerk" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/payment")}>
          <ListItemIcon>
            <Image
              src="/icons/payment.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Payment</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/dashboard/noticeboard")}>
          <ListItemIcon>
            <Image
              src="/icons/noticeboard.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Noticeboard</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/group")}>
          <ListItemIcon>
            <Image
              src="/icons/group.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Group</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/recent-events")}>
          <ListItemIcon>
            <Image
              src="/icons/event.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Recent Events</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/latest-news")}>
          <ListItemIcon>
            <Image
              src="/icons/news.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Latest news</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "School Clerk" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/fees")}>
          <ListItemIcon>
            <Image
              src="/icons/fees.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Fees</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "Account Manager" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/class-routine")}>
          <ListItemIcon>
            <Image
              src="/icons/routine.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Class Routine</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "School Clerk" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/employee")}>
          <ListItemIcon>
            <Image
              src="/icons/employee.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Employee</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "School Clerk" ? "none" : "block" }}
      >
        <ListItemButton
          onClick={() => router.push("/dashboard/employee-salary")}
        >
          <ListItemIcon>
            <Image
              src="/icons/salary.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Employee Salary</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "School Clerk" ? "none" : "block" }}
      >
        <ListItemButton onClick={() => router.push("/dashboard/utility-cost")}>
          <ListItemIcon>
            <Image
              src="/icons/cost.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Utility Cost</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        sx={{ display: user == "School Clerk" ? "none" : "block" }}
      >
        <ListItemButton
          onClick={() => router.push("/dashboard/check-student-payment")}
        >
          <ListItemIcon>
            <Image
              src="/icons/checkStudentPayment.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Check Student Payment</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <Image
              src="/icons/settings.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense={true} disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
            }}
            disabled={user == "System Administrator" ? false : true}
            onClick={() => router.push("/auth/password/reset")}
          >
            <ListItemIcon>
              <Image
                src="/icons/changePass.png"
                height={25}
                width={25}
                quality={100}
                alt="icon"
              />
            </ListItemIcon>
            <ListItemText primary="Change password" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              deleteFromStorage("userInfo");
              Cookies.remove("token");
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <Image
                src="/icons/logout.png"
                height={25}
                width={25}
                quality={100}
                alt="icon"
              />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

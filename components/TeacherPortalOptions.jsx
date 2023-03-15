import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { deleteFromStorage } from "@rehooks/local-storage";
import Cookies from "js-cookie";
export default function Options() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <List dense={true}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/teacher-portal")}>
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
          <ListItemText>Student attendance</ListItemText>
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
        <List component="div" disablePadding>
       
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              deleteFromStorage("userInfo");
              Cookies.remove("token");
              router.replace("/auth/teacher/login");
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

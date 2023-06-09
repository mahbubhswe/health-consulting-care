import {
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
export default function PatientOptions() {
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
        <ListItemButton onClick={() => router.push("/dashboard/patient")}>
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
          onClick={() => router.push("/dashboard/patient/doctor-list")}
        >
          <ListItemIcon>
            <Image
              src="/icons/doctor.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Doctor</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/patient/appointment")}
        >
          <ListItemIcon>
            <Image
              src="/icons/appointment.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Appointment</ListItemText>
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/patient/check-medicine")}
        >
          <ListItemIcon>
            <Image
              src="/icons/medicine.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Medicine</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/patient/ambulance-booking")}
        >
          <ListItemIcon>
            <Image
              src="/icons/ambulance.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Booking Ambulance</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/patient/cabin-booking")}
        >
          <ListItemIcon>
            <Image
              src="/icons/cabine.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Booking Cabin</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/patient/check-blood-bank")}
        >
          <ListItemIcon>
            <Image
              src="/icons/bloodBank.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Blood Bank</ListItemText>
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

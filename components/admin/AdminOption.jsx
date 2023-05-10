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
export default function AdminOptions() {
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
        <ListItemButton onClick={() => router.push("/dashboard/admin")}>
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
      <Box>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => router.push("/dashboard/admin/doctor")}
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
            onClick={() => router.push("/dashboard/admin/appointment")}
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
      </Box>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/patient-details")}
        >
          <ListItemIcon>
            <Image
              src="/icons/petient.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Patient Details</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("dashboard/genarate-report")}
        >
          <ListItemIcon>
            <Image
              src="/icons/report.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Genarate Report</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/admin/medicine")}
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
          onClick={() => router.push("/dashboard/admin/ambulance")}
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
          <ListItemText>Ambulance</ListItemText>
        </ListItemButton>
      </ListItem>{" "}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/admin/ambulance-request")}
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
          <ListItemText>Ambulance Request</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/admin/blood-bank")}
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
        <ListItemButton onClick={() => router.push("/dashboard/admin/cabin")}>
          <ListItemIcon>
            <Image
              src="/icons/cabine.png"
              height={25}
              width={25}
              quality={100}
              alt="icon"
            />
          </ListItemIcon>
          <ListItemText>Cabin</ListItemText>
        </ListItemButton>
      </ListItem>{" "}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => router.push("/dashboard/admin/cabin-request")}
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
          <ListItemText>Cabin Request</ListItemText>
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

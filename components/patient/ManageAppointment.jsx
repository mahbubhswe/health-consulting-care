import * as React from "react";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "../ShowDataGrid";
import { Button } from "@mui/material";
export default function ManageAppointment({ data }) {
  const [open, setOpen] = React.useState(false);
  const [doctors, setDoctors] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone
  async function recordFilteringFun(fullName) {
    if (fullName == "") {
      setDoctors(data);
    } else {
      setDoctors(data.filter((item) => item.fullName == fullName));
    }
  }

  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "doctorName", headerName: "Name", width: "200" },
      { field: "departmentName", headerName: "Department Name", width: "200" },
      { field: "doctorPhone", headerName: "Phone", width: "200" },
      { field: "roomNumber", headerName: "Room Number", width: "200" },
      { field: "status", headerName: "Status", width: "200" },
    ],
    [doctors]
  );

  return (
    <React.Fragment>
      <Button
        onClick={() => router.push("/dashboard/patient/appointment/create")}
        variant="outlined"
        color="secondary"
      >
        Create Appointment
      </Button>

      <ShowDataGrid rows={doctors} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}

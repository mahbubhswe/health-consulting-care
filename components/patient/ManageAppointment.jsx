import * as React from "react";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "../ShowDataGrid";
import { Button } from "@mui/material";
export default function ManageAppointment({ data }) {
  const [open, setOpen] = React.useState(false);
  const [dataRecord] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone

  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "doctorName", headerName: "Name", width: "200" },
      { field: "departmentName", headerName: "Department Name", width: "200" },
      { field: "doctorPhone", headerName: "Phone", width: "200" },
      { field: "roomNumber", headerName: "Room Number", width: "200" },
      { field: "status", headerName: "Status", width: "200" },
    ],
    [dataRecord]
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

      <ShowDataGrid rows={dataRecord} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}

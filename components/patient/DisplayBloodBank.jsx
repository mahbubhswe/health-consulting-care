import * as React from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "../ShowDataGrid";
export default function CheckMedicine({ data }) {
  const [open, setOpen] = React.useState(false);
  const [doner] = React.useState(data);
  const router = useRouter();


  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "name", headerName: "Name", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "bloodGroup", headerName: "Blood Group", width: "200" },
      { field: "address", headerName: "Address", width: "200" },
      { field: "gender", headerName: "Gender", width: "200" },
      {
        field: "lastDonationDate",
        headerName: "Last Donation Date",
        width: "200",
      },
    ],
    [doner]
  );

  return (
    <React.Fragment>
    

      <ShowDataGrid rows={doner} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}

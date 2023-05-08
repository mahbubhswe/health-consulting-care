import * as React from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ShowDataGrid from "../ShowDataGrid";
export default function CheckMedicine({ data }) {
  const [open, setOpen] = React.useState(false);
  const [medicine, setMedicine] = React.useState(data);
  const router = useRouter();
  //fees filtering function based on phone
  async function recordFilteringFun(medicineName) {
    if (medicineName == "") {
      setMedicine(data);
    } else {
      setMedicine(data.filter((item) => item.medicineName == medicineName));
    }
  }

  //create columns for data grid
  const columns = React.useMemo(
    () => [
      { field: "medicineName", headerName: "Medicine Name", width: "200" },
      { field: "brand", headerName: "Brand", width: "200" },
      { field: "price", headerName: "Price", width: "200" },
      { field: "quantity", headerName: "Quantity", width: "200" },
    ],
    [medicine]
  );

  return (
    <React.Fragment>
     
        <TextField
          label="Filter..."
          variant="outlined"
          type="search"
          size="small"
          fullWidth
          color="secondary"
          placeholder="Filter by medicine name"
          onChange={(e) => recordFilteringFun(e.target.value)}
        />
    
      <ShowDataGrid rows={medicine} columns={columns} />
      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}

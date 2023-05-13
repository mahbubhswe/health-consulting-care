import * as React from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import FilterListIcon from "@mui/icons-material/FilterList";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import ShowDataGrid from "../ShowDataGrid";
export default function DoctorList({ data }) {
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
      { field: "fullName", headerName: "Name", width: "200" },
      { field: "departmentName", headerName: "Department Name", width: "200" },
      { field: "phone", headerName: "Phone", width: "200" },
      { field: "email", headerName: "Email", width: "200" },
      { field: "gender", headerName: "Gender", width: "200" },
      {
        field: "createdAt",
        headerName: "Date",
        width: "200",
        renderCell: (params) => moment(params.row.createdAt).format("YY-MM-DD"),
      },
    ],
    [doctors]
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
        placeholder="Filter by doctor name"
        onChange={(e) => recordFilteringFun(e.target.value)}
        InputProps={{
          endAdornment: <FilterListIcon />,
        }}
      />

      <ShowDataGrid rows={doctors} columns={columns} />
  

      <Backdrop open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </React.Fragment>
  );
}

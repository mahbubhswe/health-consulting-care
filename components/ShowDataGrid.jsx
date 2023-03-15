import React from "react";
import { DataGrid } from "@mui/x-data-grid";
export default function ShowDataGrid({ rows, columns }) {
  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={25}
        autoHeight
        rowsPerPageOptions={[25]}
      />
    </div>
  );
}

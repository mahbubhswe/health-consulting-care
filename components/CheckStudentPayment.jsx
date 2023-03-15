import * as React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import useSWR from "swr";
import axios from "axios";
import Pdf from "react-to-pdf";
//get student payment info
const getStudentPaymentInfo = (url) => axios.get(url).then((res) => res.data);
export default function CheckStudentPayment({ data }) {
  const ref = React.createRef();
  const [studentId, setStudentId] = React.useState();
  //get student payment info
  const { data: paymentInfo } = useSWR(
    `/api/payment/getStudentPaymentInfo?studentId=${studentId}`,
    getStudentPaymentInfo
  );
  return (
    <React.Fragment>
      <Autocomplete
        options={data.map((option) => option.studentId)}
        onChange={(event, newValue) => {
          setStudentId(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            required
            fullWidth
            color="yallo"
            label="Select Student ID"
            placeholder="Search a student id..."
          />
        )}
      />
      <br></br>
      <Paper sx={{ p: "12px", borderTop: "2px solid #F2D801" }}>
        <div style={{ width: "100%", padding: "12px" }} ref={ref}>
          <Typography
            variant="bold"
            align="center"
            component="h2"
            sx={{ color: "gray" }}
          >
            Student Payment Info
          </Typography>
          <Divider />
          <Typography variant="body1" mt={2} color="initial">
            <strong>Name:</strong> {paymentInfo ? paymentInfo.name : null}
          </Typography>
          <Typography variant="body1" color="initial">
            <strong>Student ID: </strong>
            {paymentInfo ? paymentInfo.studentId : null}
          </Typography>
          <Typography variant="body1" color="initial">
            <strong>Class Name: </strong>
            {paymentInfo ? paymentInfo.className : null}
          </Typography>
          <Typography variant="body1" color="initial">
            <strong>Total Paid: </strong>
            {paymentInfo ? paymentInfo.totalPaid : null}
          </Typography>
          <Typography variant="body1" color="initial">
            <strong>Payable: </strong>{" "}
            {paymentInfo ? paymentInfo.payable : null}
          </Typography>
          <Typography variant="body1" color="initial">
            <strong>Due: </strong> {paymentInfo ? paymentInfo.due : null}
          </Typography>
        </div>
        <Typography align="right">
          <Pdf
            targetRef={ref}
            filename={`Payment report-${paymentInfo ? paymentInfo.name : null}`}
          >
            {({ toPdf }) => (
              <Button
                variant="contained"
                color="yallo"
                endIcon={<FileDownloadIcon />}
                onClick={toPdf}
                size="small"
              >
                Download
              </Button>
            )}
          </Pdf>
        </Typography>
        <br></br>
        <TableContainer sx={{ border: "1px solid #ccc", borderRadius: "4px" }}>
          <Table size="small">
            <TableHead sx={{ background: "gray", color: "#ffffff" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Amount</TableCell>
                <TableCell sx={{ color: "#ffffff" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentInfo
                ? paymentInfo.paymentList == undefined
                  ? null
                  : paymentInfo.paymentList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>
                          {moment(item.createdAt).format("MMM Do YY")}
                        </TableCell>
                      </TableRow>
                    ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}

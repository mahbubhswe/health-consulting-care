import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
export default function ChechResult({ data }) {
  const [className, setClassName] = React.useState();
  const [studentId, setStudentId] = React.useState();
  const [resultInfo, setResultInfo] = React.useState();
  //get student result
  const getStudentResult = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `/api/exam/getStudentResult?className=${className}&studentId=${studentId}`
    );
    setResultInfo(data);
  };
  return (
    <Box sx={{ borderTop: "3px solid #F2D801" }}>
      <Container maxWidth="md" sx={{ py: "20px" }}>
        <Typography
          sx={{ color: "gray" }}
          variant="h4"
          align="center"
          fontWeight={600}
        >
          Result Checking
        </Typography>
        <Divider sx={{ mb: "5px" }}>
          Select class name and type student roll number
        </Divider>
        <Stack
          spacing={2}
          component="form"
          justifyContent="center"
          alignItems="center"
          onSubmit={getStudentResult}
        >
          <Autocomplete
            fullWidth
            options={data.map((option) => option.className)}
            onChange={(event, newValue) => {
              setClassName(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Class"
                size="small"
                required
                color="yallo"
              />
            )}
          />
          <TextField
            label="Student ID"
            type="text"
            size="small"
            fullWidth
            placeholder="Type student student id"
            required
            color="yallo"
            onChange={(e) => setStudentId(e.target.value)}
          />

          <Button
            type="submit"
            sx={{ width: "150px" }}
            variant="contained"
            color="yallo"
            disabled={className ? (studentId ? false : true) : true}
          >
            Show Result
          </Button>
        </Stack>
        <br></br>
        <Paper variant="outlined" sx={{ p: "20px" }}>
          {resultInfo == "Sorry, result not found" ? (
            resultInfo
          ) : (
            <React.Fragment>
              <List dense={true} sx={{border:"1px dashed #ccc",borderRadius:"4px",p:"20px"}}>
                <Divider sx={{ fontSize: "20px" }}>Student Result</Divider>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Class: {resultInfo ? resultInfo.className : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    ID: {resultInfo ? resultInfo.studentId : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Name: {resultInfo ? resultInfo.name : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Total Marks: {resultInfo ? resultInfo.totalMarks : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Out of Marks:{" "}
                    {resultInfo ? resultInfo.outOfTotalMarks : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Avg Marks: {resultInfo ? resultInfo.avgMarks : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Grade: {resultInfo ? resultInfo.grades : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText>
                    Point: {resultInfo ? resultInfo.point : null}
                  </ListItemText>
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText
                    sx={{
                      color: resultInfo
                        ? resultInfo.result == "Failed"
                          ? "red"
                          : "green"
                        : null,
                    }}
                  >
                    Result: {resultInfo ? resultInfo.result : null}
                  </ListItemText>
                </ListItem>
                </List>
                <br></br>
              <Typography fontWeight={700}>
                Subject Wise Point, Grade and Marks:
              </Typography>
              <TableContainer
                size="small"
                sx={{ border: "1px solid #ccc", borderRadius: "4px" }}
              >
                <Table>
                  <TableHead sx={{ background: "gray" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#ffffff" }}>No</TableCell>
                      <TableCell sx={{ color: "#ffffff" }}>
                        Subject Name
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#ffffff" }}>
                        Marks
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#ffffff" }}>
                        Point
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#ffffff" }}>
                        Grade
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#ffffff" }}>
                        Out of Marks
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resultInfo
                      ? resultInfo.subjectWiseInfo.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.subjectName}</TableCell>
                            <TableCell align="center">{item.marks}</TableCell>
                            <TableCell align="center">{item.point}</TableCell>
                            <TableCell align="center">{item.grades}</TableCell>
                            <TableCell align="center">
                              {item.outOfMarks}
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

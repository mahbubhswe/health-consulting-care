import {
  Typography,
  Container,
  Divider,
  Box,
  Autocomplete,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

export default function ShowClassRoutine({ data }) {
  const [routine, setRoutine] = useState();
  const getClassRoutine = async (className) => {
    const { data } = await axios.get(
      `/api/classRoutine/getClassRoutine?className=${className}`
    );
    setRoutine(data);
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
            Check Class Routine
          </Typography>
          <Divider sx={{ mb: "5px" }}>Select a Class</Divider>
          <Autocomplete
            sx={{ mb: "10px" }}
            options={data.map((option) => option.className)}
            onChange={(event, newValue) => {
              if (newValue) {
                getClassRoutine(newValue);
              } else {
                setRoutine([]);
              }
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
          <TableContainer
            sx={{ borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <Table>
              <TableHead sx={{ background: "gray" }}>
                <TableRow>
                  <TableCell sx={{ color: "#ffffff" }}>Day</TableCell>
                  <TableCell
                    align="center"
                    colSpan={6}
                    sx={{ color: "#ffffff" }}
                  >
                    Subject And Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {routine
                  ? routine.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item[0].day}</TableCell>
                        <TableCell align="center">
                          <Typography>
                            {item[1] ? item[1].subject : null}
                          </Typography>
                          <Typography>
                            {item[1] ? item[1]?.startTime : null} -
                            {item[1] ? item[1]?.endTime : null}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {item[2] ? item[2].subject : null}
                          </Typography>
                          <Typography>
                            {item[2] ? item[2].startTime : null} -
                            {item[2] ? item[2].endTime : null}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {item[3] ? item[3].subject : null}
                          </Typography>
                          <Typography>
                            {item[3] ? item[3].startTime : null} -
                            {item[3] ? item[3].endTime : null}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {item[4] ? item[4].subject : null}
                          </Typography>
                          <Typography>
                            {item[4] ? item[4].startTime : null} -
                            {item[4] ? item[4].endTime : null}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {item[5] ? item[5].subject : null}
                          </Typography>
                          <Typography>
                            {item[5] ? item[5].startTime : null} -
                            {item[5] ? item[5].endTime : null}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {item[6] ? item[6].subject : null}
                          </Typography>
                          <Typography>
                            {item[6] ? item[6].startTime : null} -
                            {item[6] ? item[6].endTime : null}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
  );
}



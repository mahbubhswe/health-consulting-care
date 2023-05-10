import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Pdf from "react-to-pdf";
import Lottie from "lottie-web";
import React from "react";
import moment from "moment";
export default function ShowPdf({ data }) {
  const container = React.useRef(null);
  const ref = React.createRef();
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,
      animationData: require("../public/login.json"),
    });
    return () => instance.destroy();
  }, []);

  return (
    <>
      <Container sx={{ my: "20px" }} maxWidth="md">
        <div style={{ width: 800, height: 1000 }} ref={ref}>
          <Paper sx={{ p: "30px" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <p style={{ height: "200px" }} ref={container}></p>
              <div
                style={{
                  display: "grid",
                  placeContent: "center",
                  textAlign: "right",
                }}
              >
                <Typography
                  sx={{ fontWeight: 900, color: "grey", fontSize: "21px" }}
                >
                  XYZ Health Consulting Care
                </Typography>
                <Typography>Your Health Solution</Typography>
                <Typography>23/3 Dhanmondi, Dhaka, Bangladesh</Typography>
                <Typography>xyzchh.help@gmail.com - www.hcc.com</Typography>
                <Typography>+8801623232323</Typography>
              </div>
            </Stack>
            <Divider sx={{ my: "10px" }} />
            <Typography
              align="center"
              sx={{ fontWeight: 900, color: "grey", fontSize: "30px" }}
            >
              Patient Report
            </Typography>
            <br />
            <Stack spacing={2}>
              <Typography>
                Patient Name: <strong>{data ? data.fullName : null}</strong>
              </Typography>
              <Typography>
                Phone: <strong>{data ? data.phone : null}</strong>
              </Typography>
              <Typography>
                Address: <strong>{data ? data.address : null}</strong>
              </Typography>
              <Typography>
                Sex: <strong>{data ? data.sex : null}</strong>
              </Typography>
              <Typography>
                Age: <strong>{data ? data.dateOfBirth : null}</strong>
              </Typography>
              <Typography>
                Blood Group: <strong>{data ? data.bloodGroup : null}</strong>
              </Typography>
              <Typography>
                Marital Status:{" "}
                <strong>{data ? data.maritalStatus : null}</strong>
              </Typography>
              <Typography>
                Height: <strong>{data ? data.height : null}</strong>
              </Typography>
              <Typography>
                Weight: <strong>{data ? data.weight : null}</strong>
              </Typography>
              {data.patientReport.length > 0 ? (
                <React.Fragment>
                  <Typography>
                    Test Name:{" "}
                    <strong>
                      {data ? data.patientReport[0].testName : null}
                    </strong>
                  </Typography>
                  <Typography>
                    Report:{" "}
                    <strong>
                      {data ? data.patientReport[0].report : null}
                    </strong>
                  </Typography>
                  <Typography>
                    Description:
                    <br />
                    <strong>
                      {data ? data.patientReport[0].description : null}
                    </strong>
                  </Typography>{" "}
                  <Divider />
                  <Typography>
                    Report generate by{" "}
                    <strong>
                      {data ? data.patientReport[0].reportedBy : null}
                    </strong>
                  </Typography>{" "}
                  <Typography>
                    Date:{" "}
                    <strong>
                      {data
                        ? moment(data.patientReport[0].createdAt).format(
                            "MMM Do YY"
                          )
                        : null}
                    </strong>
                  </Typography>{" "}
                </React.Fragment>
              ) : (
                <p style={{ color: "Red" }}>No report found for this patient</p>
              )}
            </Stack>
          </Paper>
        </div>
      </Container>{" "}
      <Container maxWidth="md" sx={{ mb: "30px" }}>
        {" "}
   
          {data.patientReport.length > 0 ? (
            <Pdf
              targetRef={ref}
              filename={`report-${
                data ? data.patientReport[0].testName : null
              }`}
            >
              {({ toPdf }) => (
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  color="secondary"
                  sx={{ color: "#FFFFFF" }}
                  onClick={toPdf}
                >
                  Download
                </Button>
              )}
            </Pdf>
          ) : null}

      </Container>
    </>
  );
}

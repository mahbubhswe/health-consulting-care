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
import useLocalStorage from "@rehooks/local-storage";
export default function ShowPdf({ data }) {
  const container = React.useRef(null);
  const ref = React.createRef();
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,
      animationData: require("/public/login.json"),
    });
    return () => instance.destroy();
  }, []);

  return (
    <>
      <Container sx={{ my: "20px" }} maxWidth="md">
        <div style={{ width: 800, height: 600 }} ref={ref}>
          <Paper sx={{ p: "30px" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <p style={{ height: "150px" }} ref={container}></p>
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
                  {data.doctor.fullName}
                </Typography>
                <Typography>{data.doctor.departmentName}</Typography>
                <Typography>{data.doctor.phone}</Typography>
                <Typography>{data.doctor.email}</Typography>
                <br></br>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "16px",
                    textAlign: "left",
                  }}
                >
                  <Typography>
                    Visiting Hour: {data.doctor.visitingHours}
                  </Typography>{" "}
                  <Typography>Room Number: {data.doctor.roomNumber}</Typography>{" "}
                  <Typography style={{ color: "red" }}>
                    Closs on Friday
                  </Typography>{" "}
                </div>
              </div>
            </Stack>
            <Divider sx={{ my: "10px" }} />
            <Stack
              spacing={1}
              direction={{ xs: "column", sm: "row", md: "row" }}
              justifyContent={"space-between"}
            >
              <Typography>Name: {data.prescription.name}</Typography>{" "}
              <Typography>Age: {data.prescription.age}</Typography>{" "}
              <Typography>Sex: {data.prescription.sex}</Typography>{" "}
              <Typography>Date: {data.prescription.date}</Typography>{" "}
            </Stack>{" "}
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: data.prescription.description,
              }}
            />
          </Paper>
        </div>
      </Container>{" "}
      <Container maxWidth="md" sx={{ mb: "30px" }}>
        {" "}
        <Pdf
          targetRef={ref}
          filename={`prescription-${data ? data.doctor.fullName : null}`}
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
      </Container>
    </>
  );
}

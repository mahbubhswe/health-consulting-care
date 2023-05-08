import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Lottie from "lottie-web";
import React from "react";
import CreateFormButtonSpacer from "../../../../components/CreateFormButtonSpacer";
export default function Create() {
  const container = React.useRef(null);
  React.useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      autoplay: true,
      animationData: require("../../../../public/login.json"),
    });
    return () => instance.destroy();
  }, []);
  return (
    <Container sx={{ my: "20px" }} maxWidth="md">
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
        <Divider sx={{ my: "10px" }} />{" "}
        <Typography
          align="center"
          sx={{ fontWeight: 900, color: "grey", fontSize: "30px" }}
        >
          Patient Report
        </Typography>
        <br />
        <Stack spacing={5}>
          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Name"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Date of Birth"
              type="date"
              onChange={(e) => setTime(e.target.value)}
            />{" "}
          </Stack>
          <TextField
            size="small"
            required
            fullWidth
            color="secondary"
            label="Address"
            type="text"
            onChange={(e) => setTime(e.target.value)}
          />{" "}
          <TextField
            size="small"
            required
            fullWidth
            color="secondary"
            label="Phone"
            type="text"
            onChange={(e) => setTime(e.target.value)}
          />
          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />{" "}
          </Stack>{" "}
          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />{" "}
          </Stack>{" "}
          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />{" "}
          </Stack>{" "}
          <Stack spacing={1} direction={{ xs: "column", sm: "row", md: "row" }}>
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              size="small"
              required
              fullWidth
              color="secondary"
              label="Select time"
              type="text"
              onChange={(e) => setTime(e.target.value)}
            />{" "}
          </Stack>{" "}
          <CreateFormButtonSpacer>
            <Button
              type="button"
              variant="contained"
              color="error"
              size="small"
              onClick={() => router.push("/dashboard/doctor/genarate-report")}
            >
              Cancel
            </Button>{" "}
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="small"
              onClick={() => router.push("/dashboard/patient/appointment")}
            >
              Save
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="secondary"
              sx={{ color: "#FFFFFF" }}
            >
              Download
            </Button>
          </CreateFormButtonSpacer>
        </Stack>
      </Paper>
    </Container>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Paper } from "@mui/material";
export default function PasswordResetDailog({
  modalVisible,
  setModalVisible,
  api,
}) {
  const [showHidePassword, setShowHidePassword] = React.useState(false);

  return (
    <Dialog open={modalVisible} fullWidth>
      <Paper>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Password"
            type={showHidePassword ? "text" : "password"}
            placeholder="Choice a new password"
            size="small"
            required
            color="yallo"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => setShowHidePassword(!showHidePassword)}
                  >
                    {showHidePassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => setModalVisible(!modalVisible)}>
            Cancel
          </Button>
          <Button onClick={null}>Subscribe</Button>
        </DialogActions>{" "}
      </Paper>
    </Dialog>
  );
}

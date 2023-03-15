import * as React from "react";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import PhoneIcon from "@mui/icons-material/Phone";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useForm } from "react-hook-form";
import { userFormValidation } from "../utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateUserForm() {
  const [open, setOpen] = React.useState(false);
  const [showHidePassword, setShowHidePassword] = React.useState(false);
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "123456",
    },
    resolver: yupResolver(userFormValidation),
  });
  //Create new user function
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this user",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const apiRes = await axios.post(`/api/user/create`, data, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOpen(false);
        if (apiRes.data == "User addded successfully") {
          router.push("/dashboard/user");
          Swal.fire("Success", apiRes.data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else if (
          apiRes.data == "Sorry, user already exists with this information"
        ) {
          Swal.fire("Warning", apiRes.data, "warning");
        } else {
          Swal.fire("Error", apiRes.data, "error");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Stack spacing={1} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Name"
            type="text"
            fullWidth
            required
            placeholder="Type name"
            size="small"
            color="yallo"
            {...register("name")}
            error={!!errors?.name}
            helperText={errors?.name ? errors.name.message : null}
          />
          <Autocomplete
            size="small"
            fullWidth
            options={["School Clerk", "Account Manager"]}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                color="yallo"
                label="Select User Role"
                {...register("role")}
                error={!!errors?.role}
                helperText={errors?.role ? errors.role.message : null}
              />
            )}
          />
        </Stack>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            placeholder="Type email adress"
            size="small"
            color="yallo"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("email")}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />

          <TextField
            label="Phone"
            type="tel"
            fullWidth
            required
            placeholder="Phone"
            size="small"
            color="yallo"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <PhoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("phone")}
            error={!!errors?.phone}
            helperText={errors?.phone ? errors.phone.message : null}
          />
        </Stack>
        <TextField
          label="Password"
          type={showHidePassword ? "text" : "password"}
          placeholder="Choice a new password"
          size="small"
          required
          color="yallo"
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
          {...register("password")}
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
        />
        <FormControl required>
          <FormLabel error={!!errors?.gender}>Gender</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              {...register("gender")}
              value="male"
              control={<Radio color="yallo" size="small" />}
              label="Male"
            />
            <FormControlLabel
              {...register("gender")}
              value="female"
              control={<Radio color="yallo" size="small" />}
              label="Female"
            />
          </RadioGroup>
          <Typography color="error">
            {errors?.gender ? "Please select a gender" : null}
          </Typography>
        </FormControl>
        <CreateFormButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/user")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="yallo" size="small">
            Save User
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}

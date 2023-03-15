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
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import { useForm } from "react-hook-form";
import { userFormValidation } from "../utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function UpdateUserForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      role: data.role,
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
    },
    resolver: yupResolver(userFormValidation),
  });
  //Update user function
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update user information",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const apiRes = await axios.put(`/api/user/update`, data, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOpen(false);
        if (apiRes.data == "User information updated successfully") {
          router.push("/dashboard/user");
          Swal.fire("Success", apiRes.data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
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
            options={["Account Staff", "Staff"]}
            getOptionLabel={(option) => option}
            defaultValue={data.role}
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

        <FormControl required>
          <FormLabel error={!!errors?.gender}>Gender</FormLabel>
          <RadioGroup row defaultValue={data.gender}>
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
            Update User
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import InputAdornment from "@mui/material/InputAdornment";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import { studentFormValidation } from "../utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateStudentForm({ data }) {
  const [showHidePassword, setShowHidePassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [userInfo] = useLocalStorage("userInfo");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentId: data.newStudentId,
      password: "123456",
    },
    resolver: yupResolver(studentFormValidation),
  });
  //add new student
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to add this student",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const apiRes = await axios.post(`/api/student/create`, data, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOpen(false);
        if (apiRes.data == "Student addded successfully") {
          router.push("/dashboard/student");
          Swal.fire("Success", apiRes.data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.reload);
            }
          });
        } else {
          Swal.fire("Failed", apiRes.data, "error");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Stack spacing={1} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography color="error">
          {data.classList.length > 0
            ? null
            : "Sorry, first you need to create class. Without class can't add student."}
        </Typography>

        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Student ID"
            type="text"
            fullWidth
            required
            size="small"
            color="yallo"
            inputProps={{ disabled: true }}
            {...register("studentId")}
            error={!!errors?.studentId}
            helperText={errors?.studentId ? errors.studentId.message : null}
          />
          <Autocomplete
            size="small"
            fullWidth
            options={data.classList.map((option) => option.className)}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                color="yallo"
                label="Select class"
                {...register("className")}
                error={!!errors?.className}
                helperText={errors?.className ? errors.className.message : null}
              />
            )}
          />
        </Stack>

        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Student Name"
            type="text"
            fullWidth
            required
            placeholder="Type student name"
            size="small"
            color="yallo"
            {...register("name")}
            error={!!errors?.name}
            helperText={errors?.name ? errors.name.message : null}
          />

          <TextField
            label="Phone Number"
            type="text"
            placeholder="Type phone number"
            size="small"
            color="yallo"
            fullWidth
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
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
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
            type="date"
            size="small"
            required
            fullWidth
            color="yallo"
            {...register("dob")}
            error={!!errors?.dob}
            helperText={errors?.dob ? errors.dob.message : null}
          />
          <TextField
            label="Student Address"
            type="text"
            placeholder="Type student's full address"
            size="small"
            required
            fullWidth
            color="yallo"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AddLocationIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("address")}
            error={!!errors?.address}
            helperText={errors?.address ? errors.address.message : null}
          />
        </Stack>

        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Father's Name"
            type="text"
            placeholder="Type student father's name"
            size="small"
            color="yallo"
            fullWidth
            required
            {...register("fatherName")}
            error={!!errors?.fatherName}
            helperText={errors?.fatherName ? errors.fatherName.message : null}
          />
          <TextField
            label="Mother's Name"
            type="text"
            placeholder="Type student mother's name"
            size="small"
            fullWidth
            required
            color="yallo"
            {...register("motherName")}
            error={!!errors?.motherName}
            helperText={errors?.motherName ? errors.motherName.message : null}
          />{" "}
          <TextField
            label="Guardian's Contact Number"
            type="tel"
            placeholder="Type guardian's contact number"
            size="small"
            required
            fullWidth
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
            {...register("guardianContactNumber")}
            error={!!errors?.guardianContactNumber}
            helperText={
              errors?.guardianContactNumber
                ? errors.guardianContactNumber.message
                : null
            }
          />
        </Stack>

        <TextField
          label="Password"
          type={showHidePassword ? "text" : "password"}
          size="small"
          fullWidth
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
            onClick={() => router.push("/dashboard/student")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="yallo" size="small">
            Save Student
          </Button>
        </CreateFormButtonSpacer>
      </Stack>

      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}

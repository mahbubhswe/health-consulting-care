import {
  Button,
  Stack,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import axios from "axios";
import { useForm } from "react-hook-form";
import { studentFormValidation } from "../utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useLocalStorage } from "@rehooks/local-storage";
export default function UpdateStudentForm({ data }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
      const [userInfo] = useLocalStorage("userInfo");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id:data.id,
      className: data.className,
      studentId: data.studentId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      address: data.address,
      fatherName: data.fatherName,
      motherName: data.motherName,
      guardianContactNumber: data.guardianContactNumber,
    },
    resolver: yupResolver(studentFormValidation),
  });
  //add new student
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to update student information",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const apiRes = await axios.put(`/api/student/update`, data, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOpen(false);
        if (
          apiRes.data == "Student information has been updated successfully"
        ) {
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
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <TextField
            required
            fullWidth
            size="small"
            color="yallo"
            label="Select class"
            inputProps={{ readOnly: true }}
            {...register("className")}
            error={!!errors?.className}
            helperText={errors?.className ? errors.className.message : null}
          />

          <TextField
            label="Student ID"
            type="text"
            fullWidth
            required
            size="small"
            color="yallo"
            inputProps={{ readOnly: true }}
            {...register("studentId")}
            error={!!errors?.studentId}
            helperText={errors?.studentId ? errors.studentId.message : null}
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
        </Stack>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
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
          />
        </Stack>
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
            onClick={() => router.push("/dashboard/student")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="yallo" size="small">
            Update Information
          </Button>
        </CreateFormButtonSpacer>
      </Stack>

      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}

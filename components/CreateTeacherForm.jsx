import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Autocomplete,
  Avatar,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useForm } from "react-hook-form";
import { teacherFormValidation } from "../utils/formValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useLocalStorage } from "@rehooks/local-storage";
export default function CreateStudentForm({ data }) {
  const [open, setOpen] = useState(false);
  const [showHidePassword, setShowHidePassword] = React.useState(false);
  const [avatar, setAvatar] = useState();
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
    resolver: yupResolver(teacherFormValidation),
  });
  //add new student
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to add this teacher",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setOpen(true);
          data.avatar = avatar;
          const apiRes = await axios.post(`/api/teacher/create`, data, {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          });
          setOpen(false);
          if (apiRes.data == "Teacher addded successfully") {
            router.push("/dashboard/teacher");
            Swal.fire("Success", apiRes.data, "success").then((result) => {
              router.reload(window.location.reload);
            });
          } else {
            Swal.fire("Failed to add teacher", apiRes.data, "error");
          }
        } catch (error) {
          Swal.fire("Warning", apiRes.data, "warning");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Stack spacing={1} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography color="error">
          {data.length < 0
            ? "Sorry, first you need to create group. Without group can't add teacher."
            : null}
        </Typography>
        <Autocomplete
          size="small"
          fullWidth
          options={data.map((option) => option.groupName)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              color="yallo"
              label="Select group"
              {...register("groupName")}
              error={!!errors?.groupName}
              helperText={errors?.groupName ? errors.groupName.message : null}
            />
          )}
        />
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Teacher's Name"
            type="text"
            fullWidth
            required
            placeholder="Type teacher name"
            size="small"
            color="yallo"
            {...register("name")}
            error={!!errors?.name}
            helperText={errors?.name ? errors.name.message : null}
          />
          <TextField
            label="Teacher's Initial"
            type="text"
            fullWidth
            required
            placeholder="Choice teacher's initial"
            size="small"
            color="yallo"
            {...register("teacherInitial")}
            error={!!errors?.teacherInitial}
            helperText={
              errors?.teacherInitial ? errors.teacherInitial.message : null
            }
          />
        </Stack>
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Designation"
            type="text"
            placeholder="Type designation"
            size="small"
            color="yallo"
            required
            fullWidth
            {...register("designation")}
            error={!!errors?.designation}
            helperText={errors?.designation ? errors.designation.message : null}
          />
          <TextField
            label="Education"
            type="text"
            fullWidth
            required
            placeholder="Type education"
            size="small"
            color="yallo"
            {...register("education")}
            error={!!errors?.education}
            helperText={errors?.education ? errors.education.message : null}
          />
        </Stack>
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            placeholder="Type email address"
            size="small"
            color="yallo"
            {...register("email")}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />
          <TextField
            label="Phone"
            type="tel"
            fullWidth
            required
            placeholder="Type phone number"
            size="small"
            color="yallo"
            {...register("phone")}
            error={!!errors?.phone}
            helperText={errors?.phone ? errors.phone.message : null}
          />
        </Stack>
        <Stack
          spacing={1}
          direction={{ es: "column", sm: "column", md: "row" }}
        >
          <TextField
            label="Teacher's Address"
            type="text"
            placeholder="Type student's full address"
            size="small"
            required
            fullWidth
            color="yallo"
            {...register("address")}
            error={!!errors?.address}
            helperText={errors?.address ? errors.address.message : null}
          />
        </Stack>

        <TextField
          label="Password"
          type={showHidePassword ? "text" : "password"}
          placeholder="Choice a new password"
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
        <Avatar
          alt="Check avater"
          src={avatar}
          sx={{ width: 80, height: 80 }}
        />
        <Typography>Select photo</Typography>
        <FileBase64 onDone={(data) => setAvatar(data.base64)} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => router.push("/dashboard/teacher")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={avatar ? false : true}
            variant="contained"
            color="yallo"
            size="small"
          >
            Save Teacher
          </Button>
        </div>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}

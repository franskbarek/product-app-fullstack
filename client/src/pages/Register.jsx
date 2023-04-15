import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Card, FormHelperText, TextField } from "@mui/material";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  firstname: yup.string("Masukan nama depan").min(3, "Nama depan minimal 3 karakter").required("Nama depan wajib diisi"),
  lastname: yup.string("Masukan nama belakang").min(3, "Nama belakang minimal 3 karakter").required("Nama belakang wajib diisi"),
  username: yup.string("Masukan Username").min(3, "Username minimal 3 karakter").required("Username wajib diisi"),
  email: yup.string("Enter your email").email("Format email tidak valid").required("Email wajib diisi"),
  password: yup.string("Enter your password").min(8, "Password minimal 8 karakter").required("Password wajib diisi"),
});

export default function Register() {
  const [gender, setGender] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    // proses validasi dan simpan ke database
    onSubmit: async (values) => {
      const field = {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
        password: values.password,
        gender,
      };
      // alert(JSON.stringify(values, null, 2));
      try {
        await register(dispatch, field);
        navigate("/");
        toast.success("Selamat, anda berhasil melakukan registrasi akun");
        // } else {
        // toast.error("Terjadi kesalahan di sisi server, tunggu beberapa saat dan submit kembali!");
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  return (
    <div className="flex md:mx-auto justify-center w-1/3 mt-2 shadow-2xl">
      <form onSubmit={formik.handleSubmit} className="mb-20">
        <div className="text-xl text-center underline mt-20">Register</div>
        <div className="mt-5">
          <TextField
            id="firstname"
            name="firstname"
            label="Nama Depan *"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
        </div>
        <div className="mt-5">
          <TextField
            id="lastname"
            name="lastname"
            label="Nama Belakang *"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </div>

        {/* select gender */}
        <div className="mt-4 flex">
          <FormControl required sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-required-label">Jenis Kelamin</InputLabel>
            <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required" value={gender} label="Jenis Kelamin" onChange={handleChange}>
              <MenuItem value="">
                <em>--Pilih--</em>
              </MenuItem>
              <MenuItem value={"Laki-laki"}>Laki-laki</MenuItem>
              <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
            </Select>
            {/* <FormHelperText>Jenis kelamin wajib dipilih</FormHelperText> */}
          </FormControl>
        </div>

        <div className="mt-5">
          <TextField
            id="username"
            name="username"
            label="Username *"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>
        <div className="mt-5">
          <TextField id="email" name="email" label="Email *" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
        </div>
        <div className="mt-5">
          <TextField
            id="password"
            name="password"
            label="Password *"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>

        <div className="mt-5 justify-center flex ">
          <Button color="primary" variant="contained" type="submit" className="w-full" sx={{ height: "50px" }}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

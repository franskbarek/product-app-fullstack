import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  username: yup.string("Masukan Username").min(3, "Username minimal 3 karakter").required("Username wajib diisi"),
  password: yup.string("Enter your password").min(8, "Password minimal 8 karakter").required("Password wajib diisi"),
});

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isFetching, error } = useSelector((state) => state.user);

  const currentUser = useSelector((state) => state.user.currentUser);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,

    // proses validasi dan cek data di database
    onSubmit: async (values) => {
      const field = {
        username: values.username,
        password: values.password,
      };

      try {
        await login(dispatch, field);
        if (!error && currentUser) toast.success("Berhasil login");
        navigate("/");
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  return (
    <div className="flex md:mx-auto justify-center w-1/3 mt-20 shadow-2xl">
      <form onSubmit={formik.handleSubmit} className="mb-20">
        <div className="text-xl text-center underline mt-20">Login</div>

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
          <Button color="primary" variant="contained" type="submit" disabled={isFetching} sx={{ height: "50px" }} className="w-full">
            Submit
          </Button>
        </div>
        {error && <div className="italic mt-3 text-center text-red-600 text-xs">Terjadi kesalahan...</div>}
        <div>
          <div className="mt-7 block underline">
            <Link to="#" className="text-xs italic block">
              LUPA KATA SANDI?
            </Link>
            <Link to="/register" className="mt-2 text-xs italic block">
              BUAT AKUN BARU
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

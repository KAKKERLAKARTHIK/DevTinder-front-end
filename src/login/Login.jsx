import React, { useState } from "react";
import { loginData } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLoginMutation, useUserSignUpMutation } from "../loginApi/loginApi";
import { toast } from "react-toastify";

export default function AuthForm({ onSubmit }) {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [login, { data, isLoading, isSuccess, isError, error }] = useLoginMutation();
  const [signup,] = useUserSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    try {
      let res
      if (mode === "login") {

        res = await login({ emailId: formData?.email, password: formData?.password }).unwrap();
      } else {
        res = await signup(
          {
            firstName: formData?.firstName,
            lastName: formData?.lastName,
            emailId: formData?.email,
            password: formData?.password,
            mobileNumber: formData?.mobileNumber
          }
        ).unwrap();
      }

      dispatch(loginData(res));
      navigate('/profile');

    } catch (error) {
      toast(error?.data || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 h-96">
      <div style={{ height: "80%" }} className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {mode === "login" ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* signup fields */}
          {mode === "signup" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          {mode === "signup" && <input
            type="mobileNumber"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg text-lg font-medium shadow-md hover:opacity-90 transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login")

            }}
            className="text-blue-600 font-medium hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>

  );
}

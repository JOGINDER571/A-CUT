import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/otpverify.css";
import logo from "../../Assets/logo.png";
import { Formik, ErrorMessage, Field, Form } from "formik";
import Swal from "sweetalert2";

const OtpVerify = () => {
  const url = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const initialData = {
      userOtp: "",
  };
  const validation = "";

  const postData = async (values) => {
    const makeRequest = await fetch(`${url}/verifyOTP`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const response = await makeRequest.json();
    console.log(response);
    if (response.message) {
      navigate(`/signUp${response.email}`);
    }
    if (response.error.message) {
      Swal.fire(response.error.name, response.error.message, "error");
    } else {
      Swal.fire("Sorry", response.error, "error");
    }
  };
  return (
    <>
      <div className="otpverify_main">
        <img src={logo} alt="" />
        <div className="otpverify">
          <h2>Hurry Up !! verifing account</h2>
        </div>
        <Formik
          initialValues={initialData}
          validationSchema={validation}
          onSubmit={(values, { resetForm }) => {
            postData(values);
            resetForm();
          }}
        >
          <Form>
            <div>
              <label>Enter the OTP </label>
              <Field type="text" name="userOtp" />
              <p>
                <ErrorMessage name="userOtp" />
              </p>
            </div>
            <div>
              <button type="submit">Verify</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default OtpVerify;
import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import { Link } from "gatsby";
import fetchDataWithPost from "../../../utils/api"; // Adjust the path based on your project structure
import { Formik, useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for form validation
import LoadingScreen from "../../common/Loader/LoadingScreen";
import "react-toastify/dist/ReactToastify.css";
import { showMessage } from "../../../utils/toast-message";
import KonfehtiService from "../../../constants/konfehti-api";
import { UPDATE_USER_PROFILE } from "../../../constants/endpoints";
import toast, { ToastContainer } from "react-toastify";

const ProfileForm = () => {
    const [isEnable, setIsEnable] = useState(false);

    // Define validation schema using Yup

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        number: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number (should be 10 digits)")
            .required("Phone Number is required"),
    });

    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : {};
    const formik = useFormik({
        initialValues: {
            firstName: authData.f_name || "",
            lastName: authData.l_name || "",
            email: authData.email || "",
            number: authData.phone || "",
            c_code: authData.c_code || "",
        },
        validationSchema: validationSchema, // Use Yup validation schema
        onSubmit: async (values, { resetForm }) => {
            try {
                const authData =
                    typeof window !== "undefined"
                        ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                            ? JSON.parse(localStorage.getItem("auth"))
                            : {}
                        : {};
                if (
                    values.firstName === authData.f_name &&
                    values.lastName === authData.l_name &&
                    values.email === authData.email &&
                    values.number === authData.phone
                ) {
                    showMessage("Looks like you didn't make any update.");
                    return; // Stop further processing
                }

                // Make a POST request using the Axios wrapper
                const responseData = await KonfehtiService.post(
                    UPDATE_USER_PROFILE,
                    {
                        f_name: values.firstName,
                        l_name: values.lastName,
                        email: values.email,
                        phone: values.number,
                        user_id: authData.user_id || "",
                    }
                );

                // Handle the response data as needed

                const updatedAuthData = {
                    ...authData,
                    f_name: values.firstName,
                    l_name: values.lastName,
                    email: values.email,
                    phone: values.number,
                };
                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        "auth",
                        JSON.stringify(updatedAuthData)
                    );
                }

                showMessage("Updated Successfully");
                // Update local storage with latest values

                // Continue with further logic based on the API response
            } catch (error) {
                // Handle errors from the fetchDataWithPost function
                console.error("Error in API request:", error.message);

                // Additional error handling logic can be added here
                // setFormErrors((prevErrors) => ({
                //     ...prevErrors,
                //     form: "An error occurred while processing your request",
                // }));
            }
        },
    });

    return (
        <form className="form-login mt-1" onSubmit={formik.handleSubmit}>
            <div className="single-fild">
                <div>First Name</div>

                <input
                    name="firstName"
                    className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                    type="text"
                    placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="error">
                    {formik.errors.firstName &&
                        formik.touched.firstName &&
                        formik.errors.firstName}
                </div>
            </div>

            <div className="single-fild mt-6">
                <div>Last Name</div>

                <input
                    name="lastName"
                    className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                    type="text"
                    placeholder="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <div className="error">
                    {formik.errors.lastName &&
                        formik.touched.lastName &&
                        formik.errors.lastName}
                </div>
            </div>

            <div className="single-fild mt-6">
                <div>Email</div>

                <input
                    name="email"
                    className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                    type="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div className="error">
                    {formik.errors.email &&
                        formik.touched.email &&
                        formik.errors.email}
                </div>
            </div>

            <div className="single-fild mt-6">
                <div>Contact</div>
                <div className="flex items-center">
                    {" "}
                    {/* Flex container to align the country code and input field */}
                    {/* Display country code */}
                    <input
                        readOnly
                        value={"+" + formik.values.c_code}
                        className={`mr-2 px-4 h-14 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-24`}
                    />
                    {/* Input field for phone number */}
                    <input
                        name="number"
                        className={`px-6 h-14 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                        type={
                            process.env.GATSBY_IS_MOBILE === "0"
                                ? "text"
                                : "tel"
                        }
                        placeholder="Phone Number"
                        value={formik.values.number}
                        onChange={(e) => {
                            // Allow only numeric characters
                            const inputValue = e.target.value;
                            const numericValue = inputValue.replace(/\D/g, "");
                            formik.setFieldValue("number", numericValue);
                        }}
                        onBlur={formik.handleBlur}
                        readOnly
                    />
                </div>
                <div className="error">
                    {formik.errors.number &&
                        formik.touched.number &&
                        formik.errors.number}
                </div>
            </div>

            <div className="button text-center mt-6">
                <Button
                    shape="square2xl"
                    className="text-white btn-bg-image"
                    type="submit"
                    // path="/login"
                    disabled={isEnable}
                >
                    Update
                    <StaticImage
                        className="align-middle ml-3 transition-all group-hover:ml-5"
                        src="../../../data/images/icons/arrrow-icon.webp"
                        alt=""
                    />
                </Button>
            </div>

            {/* Displaying the form-wide error, if any */}
        </form>
    );
};

export default ProfileForm;

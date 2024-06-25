import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import { Link } from "gatsby";
import { navigate } from "gatsby";
import fetchDataWithPost from "../../../utils/api";
import { Formik, useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../../common/Loader/LoadingScreen";
import axios from "axios";
import Select from "react-select";
import { Capacitor } from "@capacitor/core";
import KonfehtiService from "../../../constants/konfehti-api";
import {
    GET_COUNTRIES,
    USER_PH_REGISTRATION,
} from "../../../constants/endpoints";
import { showMessage } from "../../../utils/toast-message";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    uemail: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    // password: Yup.string().required("Password is required"),
    gender: Yup.string().required("Gender is required"),
    number: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Phone Number is required"),
    // countryCode: Yup.string()
    //     .required("Country code is required."),
});

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [countryList, setCountryList] = useState(null); // Default country code

    // const [countryCode, setCountryCode] = useState(); // Default country cod

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);

        fetchCountryCode();
    }, []);

    const fetchCountryCode = async () => {
        try {
            const response = await KonfehtiService.post(GET_COUNTRIES);
            setCountryList(response.data.response);
        } catch (error) {
            console.error("Error fetching country code:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            uemail: "",
            number: "",
            password: "",
            gender: "",
            countryCode: "+1",
            countryName: "US", // Add countryCode to form values
        },
        onSubmit: async (values, { resetForm }) => {
            // console.log("values::",values);
            setLoading(true);
            try {
                const cCode = values.countryCode.match(/\d+/)[0];

                let responseData;
                if (process.env.GATSBY_IS_MOBILE == "0") {
                    responseData = await KonfehtiService.post(
                        USER_PH_REGISTRATION,
                        {
                            f_name: values.firstName,
                            l_name: values.lastName,
                            email: values.uemail,
                            password: values.password,
                            phone: values.number,
                            gender: values.gender,
                            c_code: cCode,
                            web_token:
                                localStorage.getItem("DEVICE_TOKEN") || "",
                        }
                    );
                } else {
                    responseData = await KonfehtiService.post(
                        USER_PH_REGISTRATION,
                        {
                            f_name: values.firstName,
                            l_name: values.lastName,
                            email: values.uemail,
                            password: values.password,
                            phone: values.number,
                            gender: values.gender,
                            c_code: cCode,
                            // web_token: localStorage.getItem('DEVICE_TOKEN') || '',
                            device_token:
                                localStorage.getItem("app_device_token") || "",
                            device_type:
                                Capacitor.getPlatform() === "ios"
                                    ? "ios"
                                    : "android",
                        }
                    );
                }

                showMessage("Registered Successfully");

                setLoading(false);
                resetForm();
                if (typeof window !== "undefined") {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error in API request:", error.message);
                setLoading(false);
                showMessage(error.response.data.message, "error");
            }
        },
        validationSchema: validationSchema, // Use Yup schema for validation
    });

    return (
        <>
            {loading && <LoadingScreen />}

            <form className="form-login mt-10" onSubmit={formik.handleSubmit}>
                {/* ... Your form inputs ... */}
                <div className="single-fild mt-6">
                    <input
                        name="firstName"
                        className={`px-6 h-14 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none 
            `}
                        type="text"
                        placeholder="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // value={firstName}
                        // onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className="error">
                        {formik.errors.firstName &&
                            formik.touched.firstName &&
                            formik.errors.firstName}
                        {/* <ErrorMessage name="password" component="span" /> */}
                    </div>
                </div>
                <div className="single-fild mt-6">
                    <input
                        name="lastName"
                        className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none `}
                        type="text"
                        placeholder="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // value={lastName}
                        // onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className="error">
                        {formik.errors.lastName &&
                            formik.touched.lastName &&
                            formik.errors.lastName}
                        {/* <ErrorMessage name="password" component="span" /> */}
                    </div>
                </div>
                <div className="single-fild mt-6">
                    <input
                        name="uemail"
                        className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none    formErrors.email && "border-red-500"
            `}
                        type="email"
                        placeholder="E-mail"
                        value={formik.values.uemail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="error">
                        {formik.errors.uemail &&
                            formik.touched.uemail &&
                            formik.errors.uemail}
                        {/* <ErrorMessage name="password" component="span" /> */}
                    </div>
                </div>
                <div className="single-fild mt-6 hidden">
                    <input
                        name="password"
                        className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="error">
                        {formik.errors.password &&
                            formik.touched.password &&
                            formik.errors.password}
                        {/* <ErrorMessage name="password" component="span" /> */}
                    </div>
                </div>

                <div className="single-fild mt-6">
                    <select
                        name="gender"
                        className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ color: "white" }} // Set the color to white
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="error">
                        {formik.errors.gender &&
                            formik.touched.gender &&
                            formik.errors.gender}
                    </div>
                </div>

                <div className="single-fild flex items-center mt-6 p-0">
                    {/* 
                <select
    style={{ width: "93px" }}
    className="text-white px-3 py-2 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid rounded-md focus:outline-none h-14 "
    value={formik.values.countryCode} // Use formik values
    onBlur={formik.handleBlur}
    onChange={formik.handleChange} // Update countryCode using formik handleChange
    name="countryCode" // Name attribute for formik
>
    {countryList && countryList.map((country, i) => (
    <option key={i} value={`${country.code}${country.iso_code}`} selected={country.iso_code == "US"}>{`${country.code}  \u00A0 \u00A0  \u00A0 ${country.name}`}</option>
        ))}

</select> */}

                    <Select
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                width: "99px", // Control width
                                border: "none",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: "white",
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                color: "white",
                                // marginTop: "-15px",
                            }),
                            indicatorSeparator: (provided) => ({
                                ...provided,
                                display: "none",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected
                                    ? "blue"
                                    : "transparent",
                                color: "white",
                            }),
                            menu: (provided) => ({
                                ...provided,
                                marginLeft: "-20px",
                                backgroundColor: "#333",
                                color: "white",
                                width: "auto",
                                minWidth: "200px",
                            }),
                            menuList: (provided) => ({
                                //  zIndex:"2",
                                ...provided,

                                // Additional styles if needed
                            }),
                            valueContainer: (provided) => ({
                                height: "50%",
                                ...provided,
                                marginTop: "8px", // Adjust padding top here for the container
                            }),
                            input: (provided) => ({
                                //     ...provided,
                                width: "150px", // Ensure input field takes full width
                                caretColor: "transparent",
                            }),
                        }}
                        className="react_select text-white pl-2 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid rounded-md focus:outline-none h-14"
                        defaultValue={{
                            value: formik.values.countryCode,
                            label: `${formik.values.countryCode}  \u00A0 \u00A0 \u00A0 \u00A0  \u00A0 ${formik.values.countryName}`,
                            // Set default value to 'US' if formik.values.countrycode is undefined
                            // label: formik.values.countryName ? `+${countryList?.find(country => country.code === formik.values.countryName)?.phone_code}` : '+1' // Set label to '+1' if default value is used, otherwise set it to the corresponding phone code
                        }}
                        onBlur={formik.handleBlur}
                        onChange={(selectedOption) => {
                            console.log("se:", selectedOption);
                            formik.setFieldValue(
                                "countryCode",
                                selectedOption.value
                            ); // Set the selected country code
                            formik.setFieldValue(
                                "countryName",
                                selectedOption.label
                            ); // Set the selected country name
                        }}
                        options={countryList?.map((country) => ({
                            value: country.code,
                            label: `${country.code}  \u00A0 \u00A0 \u00A0  \u00A0 ${country.name}`,
                        }))}
                        placeholder="Select country"
                    />

                    <input
                        name="number"
                        className="px-6 h-14 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none ml-2"
                        type={
                            process.env.GATSBY_IS_MOBILE == "0" ? "text" : "tel"
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
                    />
                </div>
                <div className="error">
                    {!formik.values.countryCode &&
                        !formik.errors.number &&
                        formik.errors.countryCode}
                    {formik.errors.number &&
                        formik.touched.number &&
                        formik.errors.number}
                </div>

                <div className="button text-center mt-6">
                    <Button
                        shape="square2xl"
                        className="text-white btn-bg-image"
                        type="submit"
                        // path="/register"
                    >
                        Register
                        <StaticImage
                            className="align-middle ml-3 transition-all group-hover:ml-5"
                            src="../../../data/images/icons/arrrow-icon.webp"
                            alt=""
                        />
                    </Button>
                </div>

                {/* Displaying the form-wide error, if any */}

                <div className="account-text mt-5 text-center">
                    <p>
                        Already have an account? {""}
                        <Link
                            to="/login"
                            className="font-semibold text-yellow-400"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;

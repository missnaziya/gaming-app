import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import { Link } from "gatsby";
import fetchDataWithPost from "../../../utils/api";
import { Formik, useFormik } from "formik";
import LoadingScreen from "../../common/Loader/LoadingScreen";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Otp from "./Otp";
import axios from "axios";
import Select from "react-select";
import { Capacitor } from "@capacitor/core";
import { number } from "prop-types";
import KonfehtiService from "../../../constants/konfehti-api";
import { GET_COUNTRIES, USER_LOGIN } from "../../../constants/endpoints";
import { showMessage } from "../../../utils/toast-message";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [otpForm, setOtpForm] = useState(false);
    const [isEnable, setIsEnable] = useState(false);
    const [phNo, setPhNo] = useState(null);
    const [c_code, setC_code] = useState(null);

    const [countryList, setCountryList] = useState(null); // Default country code

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);

        fetchCountryCode();
    }, []);

    const fetchCountryCode = async () => {
        try {
            const response = await KonfehtiService.post(GET_COUNTRIES);

            const countries = response.response;
            // console.log(response.data.response)
            // const data = (response.data.response).sort((a, b) => parseInt(a.code) - parseInt(b.code));

            setCountryList(response.data.response);
            // Find the country with the name "India" or any default country
            // const defaultCountry = countries.find(country => country.name.common === "India");
            // if (defaultCountry) {
            //     setCountryCode(defaultCountry.callingCodes[0]);
            // }
        } catch (error) {
            console.error("Error fetching country code:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            countryName: "US",
            countryCode: "+1",
            number: "",
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const cCode = values.countryCode.match(/\d+/)[0];
                setC_code(cCode);
                let resultData;
                if (typeof window !== "undefined") {
                    if (process.env.GATSBY_IS_MOBILE == "0") {
                        resultData = await KonfehtiService.post(USER_LOGIN, {
                            phone: values.number,
                            c_code: cCode, // Use formik values for countryCode
                            web_token:
                                localStorage.getItem("DEVICE_TOKEN") || "",
                        });
                    } else {
                        resultData = await KonfehtiService.post(USER_LOGIN, {
                            phone: values.number,
                            c_code: cCode, // Use formik values for countryCode
                            device_token:
                                localStorage.getItem("app_device_token") || "",
                            device_type:
                                Capacitor.getPlatform() === "ios"
                                    ? "ios"
                                    : "android",
                        });
                    }
                    setLoading(false);
                    resetForm();
                    const authData = {
                        ...resultData?.data?.response,
                        image: resultData.data.response.profile_image_path,
                        isLogin: false,
                        web_token:
                            resultData.data.response.web_token ||
                            localStorage.getItem("DEVICE_TOKEN") ||
                            "",
                    };
                    localStorage.setItem("auth", JSON.stringify(authData));
                    setPhNo(values.number);
                    setOtpForm(true);
                    // console.log("otp")
                }
            } catch (error) {
                setLoading(false);
                showMessage("Invalid phone number.");
                console.error("Error:", error);
            }
        },
        validate: (values) => {
            const errors = {};
            const phoneRegex = /^\d{10}$/;
            if (!values.number) {
                errors.number = "Phone number is required.";
            } else if (!phoneRegex.test(values.number)) {
                errors.number = "Invalid phone number (should be 10 digits)";
            }
            //  else if (!values.countryCode && values.number) {
            //     errors.number = "Country code is required.";
            // }
            return errors;
        },
    });

    return (
        <>
            {loading && <LoadingScreen />}
            {otpForm ? (
                <>
                    <Otp phNo={phNo} c_code={c_code} setOtpForm={setOtpForm} />
                </>
            ) : (
                <form
                    className="form-login mt-10"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="single-fild flex items-center">
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
                                    //    zIndex:"2",

                                    width: "auto",
                                    minWidth: "200px",
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    // Additional styles if needed
                                }),
                                valueContainer: (provided) => ({
                                    padding: "1px",
                                    height: "50%",
                                    ...provided,
                                    marginTop: "8px", // Adjust padding top here for the container
                                }),
                                input: (provided) => ({
                                    // height: '50%',
                                    //     ...provided,
                                    width: "150px", // Ensure input field takes full width
                                    caretColor: "transparent",
                                }),
                            }}
                            className="react_select text-white pl-2 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid rounded-md focus:outline-none h-14"
                            defaultValue={{
                                value: formik.values.countryCode,
                                label: `${formik.values.countryCode} \u00A0 \u00A0 \u00A0 \u00A0  \u00A0 ${formik.values.countryName}`,
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
                                process.env.GATSBY_IS_MOBILE == "0"
                                    ? "text"
                                    : "tel"
                            }
                            placeholder="Phone Number"
                            value={formik.values.number}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const numericValue = inputValue.replace(
                                    /\D/g,
                                    ""
                                );
                                formik.setFieldValue("number", numericValue);
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {/* <div className="single-fild flex items-center">
                    <select
                    style={{width:"93px" }}
    className="text-white px-3 py-2 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid rounded-md focus:outline-none h-14"
    value={formik.values.countryName} // Use formik values
    onBlur={formik.handleBlur}
    onChange={formik.handleChange} // Update countryCode using formik handleChange
    name="countryName" // Name attribute for formik
>


    {countryList && countryList.map((country, i) => (
       <option key={i} value={`${country.code}${country.iso_code}`} >{`${country.code}  \u00A0 \u00A0  \u00A0 ${country.name}`}</option>
    ))}

</select>
<input
    name="number"
    className="px-6 h-14 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none ml-2"
    type="text"
    placeholder="Phone Number"                            
    value={formik.values.number}
    onChange={(e) => {
        // Allow only numeric characters
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        formik.setFieldValue('number', numericValue);
    }}
    onBlur={formik.handleBlur}
/>
                    </div> */}
                    <div className="error">
                        {formik.errors.number &&
                            formik.touched.number &&
                            formik.errors.number}
                    </div>

                    <div className="button text-center">
                        <Button
                            shape="square2xl"
                            className="text-white btn-bg-image mt-6"
                            type="submit"
                            disabled={isEnable}
                        >
                            Login
                            <StaticImage
                                className="align-middle ml-3 transition-all group-hover:ml-5"
                                src="../../../data/images/icons/arrrow-icon.webp"
                                alt=""
                            />
                        </Button>
                    </div>

                    <div className="account-text mt-5 text-center">
                        <p>
                            Do not have an account?{" "}
                            <Link
                                to="/register"
                                className="text-yellow-400 font-semibold"
                            >
                                Signup here
                            </Link>
                        </p>
                    </div>
                </form>
            )}
        </>
    );
};

export default Login;

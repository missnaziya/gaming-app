import React, { useState } from "react";
import OTPInput from "react-otp-input";
import Button from "../../shared/button";
import { Link, navigate } from "gatsby";
import { toast } from "react-toastify";
import LoadingScreen from "../../common/Loader/LoadingScreen";
import { StaticImage } from "gatsby-plugin-image";
import { showMessage } from "../../../utils/toast-message";

const Otp = ({ phNo, c_code, setOtpForm }) => {
    const [loading, setLoading] = useState(false);

    const [otp, setOtp] = useState("");
    const [isOtpValid, setIsOtpValid] = useState(false);

    const handleOtpChange = (value) => {
        setOtp(value);
        // Check if the OTP has exactly 4 digits and update isOtpValid accordingly
        setIsOtpValid(/^\d{4}$/.test(value));
    };

    const handleSubmit = () => {
        setLoading(true);

        // Handle OTP verification logic here
        // console.log("Submitting OTP:", otp);
        // showMessage("Welcome to the Konfehti");
        setOtp("");
        if (typeof window !== "undefined") {
            let data =
                localStorage.getItem("auth") !== undefined
                    ? JSON.parse(localStorage.getItem("auth"))
                    : {};
            data.isLogin = true;
            localStorage.setItem("auth", JSON.stringify(data));
        }

        setTimeout(() => {
            if (typeof window !== "undefined") {
                navigate("/");
            }
            // setLoading(false);
        }, 1000);
    };

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div className="account-text mt-5 text-center">
                        <p>
                            A 4 digit code sent to{" "}
                            <b>
                                +{c_code} {phNo}
                            </b>
                        </p>
                    </div>

                    <form
                        className="form-login mt-10 mb-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="otp-inputs flex justify-center items-center mb-6">
                            <OTPInput
                                style={{ color: "white" }}
                                inputStyle="custom-otp-input border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid d-flex rounded-md focus:outline-none text-white"
                                value={otp}
                                onChange={handleOtpChange}
                                numInputs={4}
                                renderSeparator={<span></span>}
                                inputType="tel"
                                renderInput={(props, index) => (
                                    <input
                                        inputType="tel"
                                        style={{
                                            color: "white",
                                            caretColor: "transparent",
                                        }}
                                        {...props}
                                        autoFocus={index === 0}
                                        className="custom-otp-input border-purple-500 bg-secondary-100  transition-all border-2 border-solid d-flex rounded-md focus:outline-none text-white"
                                    />
                                )}
                            />
                        </div>

                        <div className="button text-center ">
                            <Button
                                shape="square2xl"
                                className="text-white btn-bg-image"
                                type="submit"
                                disabled={!isOtpValid}
                            >
                                Verify
                            </Button>
                        </div>

                        <div className="account-text mt-5 text-center">
                            <p>
                                Don't receive the OTP ?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        showMessage("OTP sent successfully");
                                    }}
                                    // to="/login"
                                    className="text-yellow-400 font-semibold"
                                >
                                    Resend OTP
                                </button>
                                <br />
                                <div
                                    onClick={() => {
                                        setOtpForm(false);
                                    }}
                                    className="inline-flex items-center px-4 py-2   text-base font-medium rounded-md shadow-sm text-white  "
                                >
                                    <StaticImage
                                        className="align-middle ml-3 transition-all group-hover:ml-5 transform scale-x-[-1] mr-3"
                                        src="../../../data/images/icons/arrrow-icon2.webp"
                                        alt=""
                                    />
                                    Back
                                </div>
                            </p>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default Otp;

import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../../components/shared/button";
import { Link } from "gatsby";
import fetchDataWithPost from "../../../../../src/utils/api"; // Adjust the path based on your project structure
import { Formik, useFormik } from "formik";
import LoadingScreen from "../../../../components/common/Loader/LoadingScreen";
import KonfehtiService from "../../../../constants/konfehti-api";
import { ADD_GAME } from "../../../../constants/endpoints";
import { showMessage } from "../../../../utils/toast-message";

const AddGameForm = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            gameName: "",
            description: "",
        },
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);

            try {
                // Make a POST request using the Axios wrapper
                const responseData = await KonfehtiService.post(ADD_GAME, {
                    name: values.gameName,
                    description: values.description,
                });
                resetForm();
                // Handle the response data as needed
                setLoading(false);

                showMessage("Successfully Added Your Game");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

                // Continue with further logic based on the API response
            } catch (error) {
                setLoading(false);

                // Handle errors from the fetchDataWithPost function
                console.error("Error in API request:", error.message);
                // Additional error handling logic can be added here
                // setFormErrors((prevErrors) => ({
                //     ...prevErrors,
                //     form: "An error occurred while processing your request",
                // }));
            }
        },

        validate: (values) => {
            const errors = {};

            if (!values.gameName) {
                errors.gameName = "Name of the game is required";
            }

            if (!values.description) {
                errors.description = "Description is required";
            }

            return errors;
        },
    });

    return (
        <>
            {loading && <LoadingScreen />}

            <div className="account-text mt-5 text-center col-12">
                <p className=" font-bold max-w-3xl text-xl">Add your game</p>
            </div>
            <form className="form-login mt-10" onSubmit={formik.handleSubmit}>
                <div className="single-fild ">
                    <div className="error">
                        {formik.errors.gameName &&
                            formik.touched.gameName &&
                            formik.errors.gameName}
                        {/* <ErrorMessage name="password" component="span" /> */}
                    </div>
                    <input
                        name="gameName"
                        className={`px-6 h-14 w-full mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none 
                    `}
                        type="text"
                        placeholder="Enter the name of game"
                        value={formik.values.gameName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="single-fild">
                    <div className="error">
                        {formik.errors.description &&
                            formik.touched.description &&
                            formik.errors.description}
                    </div>
                    <textarea
                        name="description"
                        className={`px-6 py-3 h-44 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none `}
                        type="text"
                        placeholder="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <div className="button text-center">
                    <Button className="text-white" type="submit">
                        ADD +
                        <StaticImage
                            className="align-middle ml-3 transition-all group-hover:ml-5"
                            src="../../../data/images/icons/arrrow-icon.webp"
                            alt=""
                        />
                    </Button>
                </div>

                {/* <div className="account-text mt-5 text-center">
                <p>
                    Already have an account, {""}
                    <Link to="/login" className="font-semibold text-yellow-400">
                        Login here
                    </Link>
                </p>
            </div> */}
            </form>
        </>
    );
};

export default AddGameForm;

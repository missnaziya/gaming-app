import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import SectionTitle from "../../../components/title";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { showMessage } from "../../../utils/toast-message";

const ContactFormArea = ({ data }) => {
    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^[\d+ -]+$/, "Phone number is not valid")
            .required("Phone is required"),
        address: Yup.string().required("Address is required"),
        message: Yup.string().required("Message is required"),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            message: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            showMessage("Your Form Submitted successfully");
            console.log(values);
            resetForm();
            // Here you would typically handle the form submission, e.g., sending data to a server
        },
    });

    return (
        <section className="contact-us-form-section pt-10 pb-10 md:pt-12 md:pb-12">
            <form onSubmit={formik.handleSubmit}>
                <div className="container">
                    <div className="section-title">
                        {/* Your SectionTitle component */}
                    </div>
                    <div className="grid gap-x-8 grid-cols-2">
                        {/* Name field */}
                        <div className="single-fild mt-6 col-span-full md:col-span-1 lg:col-span-1">
                            <input
                                className="px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="error">
                                    {formik.errors.name}
                                </div>
                            ) : null}
                        </div>

                        {/* Email field */}
                        <div className="single-fild mt-6 col-span-full md:col-span-1 lg:col-span-1">
                            <input
                                className="px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div>
                        <div className="single-fild mt-6 col-span-full md:col-span-1 lg:col-span-1">
                            <input
                                className="px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                                type="tel" // Change type to "tel" for phone input
                                name="phone" // Change name to "phone"
                                placeholder="Phone" // Update placeholder to "Phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="error">
                                    {formik.errors.phone}
                                </div>
                            ) : null}
                        </div>

                        <div className="single-fild mt-6 col-span-full md:col-span-1 lg:col-span-1">
                            <input
                                className="px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                                type="text" // Assuming address is a free text field
                                name="address" // Change name to "address"
                                placeholder="Address" // Update placeholder to "Address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <div className="error">
                                    {formik.errors.address}
                                </div>
                            ) : null}
                        </div>

                        {/* Additional fields... */}

                        {/* Message field */}
                        <div className="single-fild col-span-2 mt-6">
                            <textarea
                                className="px-6 pt-4 h-52 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                                name="message"
                                placeholder="Write from here"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            />
                            {formik.touched.message && formik.errors.message ? (
                                <div className="error">
                                    {formik.errors.message}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="text-center mt-10 flex justify-center">
                        <Button
                            type="submit"
                            className=" text-white btn-bg-image-large"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
};
ContactFormArea.propTypes = {
    data: PropTypes.shape({
        section_title: PropTypes.shape({
            heading: PropTypes.string,
        }),
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string,
            })
        ),
    }),
};
export default ContactFormArea;

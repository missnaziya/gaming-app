import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { StaticImage } from "gatsby-plugin-image";
import ProfileForm from "../../components/forms/profile-form";
import SectionTitle from "../../components/title";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../components/shared/button";
import LoadingScreen from "../../components/common/Loader/LoadingScreen";
import { UPDATE_USER_PROFILE, USER_PH_LOGIN } from "../../constants/endpoints";
import KonfehtiService from "../../constants/konfehti-api";
import { showMessage } from "../../utils/toast-message";
// import SectionTitle from "../../../components/title";
// import ProfileForm from "../../../components/forms/Profile-form";

const Profile = ({ data }) => {
    const [loading, setLoading] = useState(false);

    const [profileImage, setProfileImage] = useState();
    const [defautImage, setDefautImage] = useState(
        "../../data/images/others/profile.png"
    );
    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : {};

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            // const base64Image = reader.result;
            // console.log(base64Image, "Base64 Image");
            // setProfileImage(base64Image);
            setProfileImage(reader.result);
            const base64Image = reader.result.split(",")[1];
            console.log(base64Image, "Base64 Image");

            // Hit the API to update user profile with the new image
            try {
                const response = await KonfehtiService.post(
                    UPDATE_USER_PROFILE,
                    {
                        user_id: authData.user_id, // Replace with the user ID
                        user_image: base64Image,
                        image_type: "jpeg",
                        // f_name: authData.f_name,
                        // l_name: authData.l_name
                        // email: authData.email,
                        // phone: authData.number,
                        // api_key: authData.api_key,
                    }
                );
                showMessage("Profile Updated Successfully.");
                fetchimagepath();

                console.log("API Response:", response.data);
            } catch (error) {
                console.error("Error updating user profile:", error);
            }
        };

        reader.readAsDataURL(selectedImage);
    };

    const fetchimagepath = async () => {
        try {
            // Make a POST request using the Axios wrapper
            const responseData = await KonfehtiService.post(USER_PH_LOGIN, {
                phone: authData.phone,
                c_code: 91,
            });

            // setDefautImage(
            //     `https://2023.stitchmyapp.com/konfehti-game-app/ver5.1/webservices/images/originals/${responseData.data.response.profile_image_path}`
            // );

            const updatedAuthData = {
                ...authData,
                image: responseData.data.response.profile_image_path,
            };
            if (typeof window !== "undefined") {
                localStorage.setItem("auth", JSON.stringify(updatedAuthData));
            }
        } catch (error) {
            console.error("Error in API request:", error);
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <LoadingScreen />}

            <section className="Profile-section">
                <div className="container">
                    <div className="grid gap-10 md:gap-16 lg:gap-24 grid-cols-1 md:grid-cols-2 items-center">
                        <div className="image">
                            {/*                      
                        <StaticImage
                            // src="https://www.digitalclassworld.com/blog/full-form-of-url/"
                            className="align-middle ml-3"
                            src="../../data/images/others/login-thumb.png"
                            alt=""
                        /> */}
                            <div className="  w-32  m-auto flex items-center justify-center relative">
                                {" "}
                                {profileImage ? (
                                    <img
                                        className="align-middle m-auto rounded-full object-cover"
                                        src={profileImage}
                                        alt="Profile"
                                        style={{
                                            width: `${
                                                process.env.GATSBY_IS_MOBILE ==
                                                "1"
                                                    ? "100px"
                                                    : "400px"
                                            }`,
                                            height: `${
                                                process.env.GATSBY_IS_MOBILE ==
                                                "1"
                                                    ? "100px"
                                                    : "400px"
                                            }`,
                                            marginTop: "10px",
                                        }}
                                    />
                                ) : authData.image ? (
                                    <img
                                        className="align-middle m-auto rounded-full object-cover"
                                        // src={defautImage}
                                        src={`${process.env.GATSBY_IMAGE_BASE_URL}${authData.image}`}
                                        alt="Profile"
                                        style={{
                                            width: `${
                                                process.env.GATSBY_IS_MOBILE ==
                                                "1"
                                                    ? "100px"
                                                    : "400px"
                                            }`,
                                            height: `${
                                                process.env.GATSBY_IS_MOBILE ==
                                                "1"
                                                    ? "100px"
                                                    : "400px"
                                            }`,
                                            marginTop: "10px",
                                        }}
                                    />
                                ) : (
                                    <StaticImage
                                        // src="https://www.digitalclassworld.com/blog/full-form-of-url/"
                                        className="align-middle mx-auto rounded-full object-cover"
                                        src="../../data/images/others/profile.png"
                                        // src="./profile.png"
                                        alt=""
                                        style={{
                                            width: `${
                                                process.env.GATSBY_IS_MOBILE ==
                                                "1"
                                                    ? "100px"
                                                    : "400px"
                                            }`,
                                            height: `${
                                                process.env.GATSBY_IS_MOBILE ==
                                                "1"
                                                    ? "100px"
                                                    : "400px"
                                            }`,
                                            margin: "auto",
                                            display: "flex",
                                        }}
                                    />
                                )}
                                {/* Profile Image upload */}
                                <div className=" absolute bottom-0 right-4  p-2 rounded-full bg-purple-500 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M21 5h-4l-1-2H8l-1 2H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                                        />
                                    </svg>
                                    <input
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            {/* Profile Image upload */}
                            {/* <div className="button  text-center relative my-5">
                                <input
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            
                                <Button
                                    className="text-white mx-auto btn-bg-image"
                                    shape="square2xl"
                                >
                                    Upload Profile
                                    <StaticImage
                                        className="align-middle ml-3 transition-all group-hover:ml-5"
                                        src="../../data/images/icons/arrrow-icon2.webp"
                                        alt=""
                                    />
                                </Button>
                            </div> */}

                            {/* Other form fields go here */}

                            {/* Submit button */}
                        </div>
                        <div className="form-warp">
                            {/* {data?.section_title && (
                                <SectionTitle
                                    heading={data?.section_title.heading}
                                    {...data.section_title}
                                />
                            )} */}
                            <ProfileForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
Profile.propTypes = {
    data: PropTypes.shape({
        section_title: PropTypes.shape({
            heading: PropTypes.string,
        }),
    }),
};
export default Profile;

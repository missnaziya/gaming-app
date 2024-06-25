import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "@assets/css/icofont.min.css";
import "@assets/css/modal-video.min.css";
import Header from "./header";
import Footer from "./footer";
import BodyImage from "../data/images/others/body-bg.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../components/common/Loader/LoadingScreen";
import {
    AppPushNotification,
    messaging,
    onMessageListener,
} from "../PushNotification/firebase";
import { getToken } from "firebase/messaging";
import { navigate } from "gatsby";
import { showMessage } from "../utils/toast-message";
// const customTheme = {
//     success: {
//         color: "green", // Customize the color for success toasts
//         backgroundColor: "white",
//         color: "black",
//     },
//     error: {
//         color: "red", // Customize the color for error toasts
//         backgroundColor: "red ",
//         color: "black",
//     },
//     info: {
//         color: "blue", // Customize the color for info toasts
//         backgroundColor: "white",
//         color: "black",
//     },
// };

const Layout = ({ data, children, connectNowcard }) => {
    // Firebase Web Push-Notification
    const generateToken = async () => {
        if (typeof window !== "undefined") {
            if (process.env.GATSBY_IS_MOBILE == "1") {
                AppPushNotification();
            } else {
                localStorage.removeItem("DEVICE_TOKEN");
                const permission = await Notification.requestPermission();
                // console.log("PERMISSION:", permission);
                if (permission === "granted") {
                    // console.log("vapidkey:", process.env.GATSBY_FIREBASE_VAPIDKEY);
                    const token = await getToken(messaging, {
                        vapidKey: process.env.GATSBY_FIREBASE_VAPIDKEY,
                    });
                    //   console.log("TOKEN:", token);
                    localStorage.setItem("DEVICE_TOKEN", token);
                } else if (permission === "denied") {
                    alert("Please enable notification");
                }
            }
        }
    };

    if (typeof window !== "undefined") {
        if (process.env.GATSBY_IS_MOBILE == "0") {
            onMessageListener()
                .then((payload) => {
                    // setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
                    console.log("-----PushCLick:", payload);
                    showMessage(payload.notification.body);
                    // setTimeout(()=>{
                    //     navigate(`/match?rmc=${payload.data["gcm.notification.details"] ? JSON.parse(payload.data["gcm.notification.details"])?.match_code : "undefined"}`)
                    // },2000)
                    // window.location.reload();
                    //    navigate("/match/");
                })
                .catch((err) => console.log("failed: ", err));
        }
    }

    useEffect(() => {
        generateToken();
    }, []);

    return (
        <>
            <div
                className={`${
                    process.env.GATSBY_IS_MOBILE == "1" && "mobile__app "
                } wrapper min-h-[100vh]`}
                style={{
                    backgroundImage: `url(${BodyImage})`,
                }}
            >
                <Header data={data} />
                {children}
                <ToastContainer theme="dark" />
                <Footer data={data} connectNowcard={connectNowcard} />
            </div>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.shape({}),
    connectNowcard: PropTypes.bool,
};

export default Layout;

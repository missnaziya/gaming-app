import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import { Link, graphql, navigate } from "gatsby";
import KonfehtiService from "../../constants/konfehti-api";
import { GET_NOTIFICATIONS } from "../../constants/endpoints";


const MyNotifications = () => {

    const [notificationListData, setNotificationListData] = useState([]);
    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : {};


    // get notifications list data
    const getNotificationList = async () => {
        try {
            const res = await KonfehtiService.post(
                `${GET_NOTIFICATIONS}?to_id=${authData.user_id}`
            );
            console.log("NotificationList:>?>", res?.data?.response);
            setNotificationListData(res?.data?.response);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        getNotificationList();
    }, []);
   
    return (
        <>
            <div className="match-post-content-wrapper">
               
{/* <div className="container    "> */}
{notificationListData?.length > 0 && (
    <>
        {/* <h1 className="font-bold text-white mb-4 text-md text-center mt-8">
            {" "}
            Recent Notifications{" "}
        </h1> */}
        <div
            className={`${"visible mt-4 opacity-100 border rounded-lg md:p-12 border-4 border-secondary-90 bg-secondary-100"}   rounded-lg transition-all duration-500 text-white md:w-[800px] w-full m-auto`}
        >
            <ul className="m-auto">
                {notificationListData &&
                    notificationListData?.length > 0 &&
                    notificationListData
                        // ?.slice(0, )
                        ?.map((item, ind) => {
                            return (
                                <>
                                    <Link
                                        to={`/match?rmc=${item?.Match?.match_code}`}
                                    >
                                        <li
                                            key={ind}
                                            className="p-4  rounded cursor-pointer m-4 border border-gray-100 flex items-center justify-between text-sm font-medium text-white py-1"
                                        >
                                            <div className="flex m-2">
                                                <div className="rounded-full overflow-hidden h-10 w-10 flex-shrink-0 mr-3">
                                                    <img
                                                        src={
                                                            item
                                                                ?.Match
                                                                ?.Player[0]
                                                                ?.image_path
                                                                ? `${process.env.GATSBY_IMAGE_BASE_URL}${item?.Match?.Player[0]?.image_path}`
                                                                : "http://localhost:1998/static/18100b0d2fb6422645a163832ff555d3/023cb/logo.webp"
                                                        }
                                                        alt="User Profile"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h5>
                                                        {
                                                            item?.title
                                                        }
                                                    </h5>
                                                    <p className="text-[12px] font-medium text-white">
                                                        {
                                                            item?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center flex-wrap justify-end">
                                                {/* <button className="text-green hover:text-primary">
                                                    Accept
                                                </button>
                                                <button className="text-red-500 hover:text-primary ml-5">
                                                    Reject
                                                </button> */}
                                            </div>
                                        </li>
                                    </Link>
                                </>
                            );
                        })}
            </ul>
     
        </div>
    </>
)}
</div>
                {/* </div> */}
        </>
    );
};

MyNotifications.propTypes = {
    location: PropTypes.object,
    pageContext: PropTypes.object,
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        page: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};



export default MyNotifications;









import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import { Link, graphql, navigate } from "gatsby";
import { normalizedData } from "@utils/functions";
// import PageBreadcrumb from "../components/pagebreadcrumb";
import { StaticImage } from "gatsby-plugin-image";
// import Button from "../components/shared/button";
// import Popup from "../components/common/Popup";

// import PageBreadcrumb from "../pagebreadcrumb";
import Button from "../shared/button";
import PageBreadcrumb from "../pagebreadcrumb";
import SectionTitle from "../title";
import axios from "axios";
import Popup from "../common/Popup";
import KonfehtiService from "../../constants/konfehti-api";
import { GET_NOTIFICATIONS } from "../../constants/endpoints";

const Dashboard = ({ data, location, pageContext }) => {
    const [isInstruction, setIsInstruction] = useState(false);
    const [msglimit, setMsglimit] = useState(5);
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
            {/* <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Match"
                /> */}

            {/* <div className="match-post-content-wrapper"> */}
            {process.env.GATSBY_IS_MOBILE == "1" && (
                <div className="flex items-start justify-center p-6">
                    <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                        {/* Card 1 */}
                        <div className="cursor-pointer bg-gradient-to-r from-purple-700 to-purple-900 rounded-md overflow-hidden flex justify-center mb-3 p-1 h-[80px] md:h-[100px]">
                            <div
                                onClick={() => navigate("/games")}
                                className="text-white text-md leading-none font-semibold p-5 self-center"
                            >
                                {/* <div>8</div>
                        <StaticImage
                            className="align-middle ml-3 transition-all group-hover:ml-5"
                            src="../../data/images/icons/arrrow-icon.webp"
                            alt=""
                        /> */}
                                <div className="text-yellow-200 font-exo  leading-none font-semibold m-auto">
                                    PLAY NOW
                                    <StaticImage
                                        className="align-middle ml-3 transition-all group-hover:ml-5"
                                        src="../../data/images/icons/arrrow-icon.webp"
                                        alt=""
                                    />
                                </div>
                            </div>
                            {/* <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="absolute right-0 bottom-0 h-24 w-32 -mr-8 -mb-8 text-yellow-700 opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </svg> */}
                        </div>

                        <div className="cursor-pointer relative flex justify-start p-4 border border-purple-500 rounded-md overflow-hidden h-[80px] md:h-[100px]">
                            <div className="items-center text-white text-base leading-none font-semibold self-center">
                                <div className="mb-2">
                                    {" "}
                                    Don't know how to Play{" "}
                                </div>
                                <span
                                    onClick={() => {
                                        setIsInstruction(true);
                                    }}
                                    className="text-yellow-200 font-semibold"
                                >
                                    Click here.
                                </span>
                            </div>
                        </div>

                        {/* -------------------how to play instruction----------------  */}
                        <Popup
                            btnType={"submit"}
                            open={isInstruction}
                            setOpen={setIsInstruction}
                            modalTitle={"HOW TO PLAY!"}
                            body={
                                <>
                                    <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                        <div class="flex items-center mt-1">
                                            {/* <!-- Fixed width for step indicator --> */}
                                            <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                                Step 1
                                            </div>
                                            {/* <!-- Content takes the remaining space --> */}
                                            <span class="flex-grow">
                                                Click on play now button.
                                            </span>
                                        </div>
                                    </div>

                                    <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                        <div class="flex items-center mt-1">
                                            {/* <!-- Fixed width for step indicator --> */}
                                            <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                                Step 2
                                            </div>
                                            {/* <!-- Content takes the remaining space --> */}
                                            <span class="flex-grow">
                                                Select a game and go to details
                                                page.{" "}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                        <div class="flex items-center mt-1">
                                            {/* <!-- Fixed width for step indicator --> */}
                                            <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                                Step 3
                                            </div>
                                            {/* <!-- Content takes the remaining space --> */}
                                            <span class="flex-grow">
                                                Click on play button.{" "}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                        <div class="flex items-center mt-1">
                                            {/* <!-- Fixed width for step indicator --> */}
                                            <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                                Step 4
                                            </div>
                                            {/* <!-- Content takes the remaining space --> */}
                                            <span class="flex-grow">
                                                Create match room and invite
                                                player.{" "}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-center align-center px-auto">
                                        <Button
                                            path={""}
                                            shape="square2xl"
                                            onClick={() => {
                                                navigate("/games");
                                            }}
                                            className="text-white  btn-bg-image  mt-8"
                                        >
                                            PLAY NOW
                                            {/* <StaticImage
            className="align-middle ml-3 transition-all group-hover:ml-5 "
            src="../../data/images/icons/navigation-arrow1.webp"
            alt=""
        /> */}
                                        </Button>
                                    </div>

                                    <div className="single-fild mt-8"></div>
                                    <div className="single-fild mt-8"></div>
                                    <div className="flex flex-col items-center sm:flex-row mt-8"></div>
                                </>
                            }
                        />
                    </section>
                </div>
            )}

            <div className="flex items-start justify-center p-6 height-auto">
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                    {/* Card 1 */}
                    <div
                        onClick={() => navigate("/match")}
                        className="cursor-pointer relative p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md overflow-hidden"
                    >
                        <div className="flex items-center  text-white text-md leading-none  justify-between">
                            <div className="text-lg  ">8</div>
                            <StaticImage
                                className="align-middle ml-3 transition-all group-hover:ml-5"
                                src="../../data/images/icons/arrrow-icon.webp"
                                alt=""
                            />
                        </div>
                        <div className=" relative z-10 text-yellow-200 leading-none text-[18px] font-black">
                            Live Games
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-24 w-32 -mr-8 -mb-8 text-yellow-700 opacity-50"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                        </svg>
                    </div>

                    {/* Card 2 */}
                    <div
                        onClick={() => navigate("/my-matches")}
                        className="cursor-pointer relative p-4 bg-gradient-to-r from-red-400 to-red-600 rounded-md overflow-hidden"
                    >
                        <div className="flex items-center  text-white text-md leading-none font-semibold justify-between">
                            <div className="text-lg ">3</div>
                            <StaticImage
                                className="align-middle ml-3 transition-all group-hover:ml-5"
                                src="../../data/images/icons/arrrow-icon.webp"
                                alt=""
                            />
                        </div>
                        <div className="relative z-10 text-red-200 leading-none text-[18px] font-black">
                            Total Played
                        </div>
                        <svg
                            className="absolute right-0 bottom-0 h-24 w-32 -mr-8 -mb-8 text-red-700 opacity-50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Card 3 */}
                    <div className="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md overflow-hidden">
                        <div className="flex items-center  text-white text-md leading-none font-semibold justify-between">
                            <div className="text-md mb-2  ">$122</div>
                            <StaticImage
                                className="align-middle ml-3 transition-all group-hover:ml-5"
                                src="../../data/images/icons/arrrow-icon.webp"
                                alt=""
                            />
                        </div>
                        <div className="relative z-10 text-blue-200 leading-none text-[18px] font-black">
                            Earnings
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="absolute right-0 bottom-0 h-14 w-32 -mr-8 -mb-8 text-green-600 opacity-50"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Card 4 */}
                    <div
                        onClick={() => {
                            navigate("/wallet");
                        }}
                        className="relative p-5 bg-gradient-to-r from-teal-400 to-green-600 rounded-md overflow-hidden"
                    >
                        <div className="flex items-center  text-white text-md leading-none font-semibold justify-between cursor-pointer">
                            <div className="text-md mb-2 ">
                                ${authData?.wallet}
                            </div>
                            <StaticImage
                                className="align-middle ml-3 transition-all group-hover:ml-5"
                                src="../../data/images/icons/arrrow-icon.webp"
                                alt=""
                            />
                        </div>
                        <div className="relative z-10 text-green-200 leading-none text-[18px] font-black">
                            Wallet
                        </div>
                        <svg
                            className="absolute right-0 bottom-0 h-14 w-31 -mr-4 -mb-4 text-green-700 opacity-50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zM18 13a2 2 0 110-4 2 2 0 010 4z"
                            />
                        </svg>
                    </div>
                </section>
            </div>

            <div className="container px-4   ">
                {notificationListData?.length > 0 && (
                    <>
                        <h1 className="font-bold text-white mb-4 text-md text-center mt-8">
                            {" "}
                            Recent Notifications{" "}
                        </h1>
                        <div
                            className={`${"visible mt-4 opacity-100 border rounded-lg md:p-12 border-4 border-secondary-90 bg-secondary-100"}   rounded-lg transition-all duration-500 text-white md:w-[800px] w-full m-auto`}
                        >
                            <ul className="m-auto">
                                {notificationListData &&
                                    notificationListData?.length > 0 &&
                                    notificationListData
                                        ?.slice(0, msglimit)
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
                            <div className="flex justify-end">
                                <div
                                    className="cursor-pointer text-start m-2"
                                    onClick={() => {
                                       navigate("/notifications")
                                    }}
                                >
                                  view all
                                </div>
                        </div>
{/* 
                            <div className="flex justify-between">
                                <div
                                    className="cursor-pointer text-start m-2"
                                    onClick={() => {
                                        if (msglimit > 5) {
                                            setMsglimit(msglimit - 5);
                                        }
                                    }}
                                >
                                    show less
                                </div>
                                <div
                                    className="cursor-pointer text-end m-2"
                                    onClick={() => {
                                        setMsglimit(msglimit + 5);
                                    }}
                                >
                                    show more
                                </div>
                            </div> */}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

Dashboard.propTypes = {
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

export const query = graphql`
    query contactUsPageQuery {
        allGeneral {
            nodes {
                section
                id
                menu {
                    ...Menu
                }
                footer {
                    ...Footer
                }
            }
        }
        page(title: { eq: "contactUsPage" }, pageType: { eq: innerpage }) {
            content {
                ...PageContentAll
            }
        }
    }
`;

export default Dashboard;

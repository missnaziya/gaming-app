import { StaticImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Logo from "../../components/logo";
import MainMenu from "../../components/menu/main-menu";
import MobileNavMenu from "../../components/menu/mobile-menu";
import Button from "../../components/shared/button";
import { useSticky } from "../../hooks";
import { toast } from "react-toastify";
import { Link, navigate } from "gatsby";
import LoadingScreen from "../../components/common/Loader/LoadingScreen";
import Popup from "../../components/common/Popup";
import axios from "axios";
import ShareMatchCode from "../../components/share-matchcode";
import KonfehtiService, {
    KonfehtiServiceLoaderless,
} from "../../constants/konfehti-api";
import { ADD_PLAYER, GET_NOTIFICATIONS } from "../../constants/endpoints";
import { showMessage } from "../../utils/toast-message";

const Header = ({ data }) => {
    // Get the path from window.location
    const [endpoint, setEndpoint] = useState(null);

    useEffect(() => {
        // Get the path from window.location
        const path = window.location.pathname;

        // Determine the endpoint based on the path
        switch (path) {
            case "/":
                setEndpoint("Dashboard");
                break;
            case "/about-us/":
                setEndpoint("about");
                break;
            case "/match/":
                setEndpoint("Live Games");
                break;
            case "/my-profile/":
                setEndpoint("My Profile");
                break;
            case "/wallet/":
                setEndpoint("Wallet");
                break;
            case "/my-matches/":
                setEndpoint("Games Played");
                break;
            case "/faq/":
                setEndpoint("FAQ");
                break; // Add more cases as needed for other paths
            case "/privacy-policy/":
                setEndpoint("Privacy Policy");
                break;
            case "/term-condition/":
                setEndpoint("Term Condition");
                break;
            default:
                const cleanedPath = path.replace(/^\/|\/$/g, "").split('/');
                const lastText = cleanedPath[cleanedPath.length - 1].replace(/-/g, ' ')
                console.log(cleanedPath,"path...?????",lastText)
                setEndpoint(lastText); // Set endpoint to null if the path doesn't match any case
                break;
        }
    }, []);

    // console.log(endpoint);

    const [loading, setLoading] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [modal, setModal] = useState(false);
    const [roomCode, setRoomCode] = useState("");
    const [notificationListData, setNotificationListData] = useState([]);

    // Sticky Header
    const { sticky, headerRef, fixedRef } = useSticky();

    // OfCanvas Menu
    const [ofcanvasOpen, setOfcanvasOpen] = useState(false);

    // OfCanvas Menu Open & Remove
    const ofcanvasHandaler = () => {
        setOfcanvasOpen((prev) => !prev);
    };

    // Handle logout
    const handleLogout = () => {
        setLoading(true);

        // Remove authentication data from local storage
        if (typeof window !== "undefined") {
            localStorage.clear();
        }
        // showMessage("Logout Successfully");
        setTimeout(() => {
            if (typeof window !== "undefined") {
                navigate("/login");
            }
            setLoading(false);
        }, 3000);

        // Redirect to the logout page
    };

    // Check if authentication data is available in local storage

    let isAuthAvailable = false;
    if (typeof window !== "undefined") {
        isAuthAvailable =
            localStorage.getItem("auth") !== null
                ? JSON.parse(localStorage.getItem("auth"))
                : false;
        isAuthAvailable = isAuthAvailable?.isLogin;
    }

    // join with code function
    const joinMatch = (code) => {
        getData(code);
    };

    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : {};

    const getData = async (code) => {
        try {
            const result = await KonfehtiService.post(ADD_PLAYER, {
                match_code: roomCode || code,
                user_id: authData.user_id,
            });
            // console.log("RESULT:", result?.data?.response);
            if (result?.data?.code === 200) {
                showMessage("Match Begin!!");
                setModal(false);
                setRoomCode("");
            }
        } catch (error) {
            console.error("Error:", error);
            setModal(false);

            showMessage(error.response.data.message);
        }
    };

    // get notifications list data
    const getNotificationList = async () => {
        try {
            const res = await KonfehtiServiceLoaderless.post(GET_NOTIFICATIONS);
            console.log("NotificationList:", res?.data?.response);
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
            {loading ? (
                <LoadingScreen />
            ) : (
                <header
                    ref={headerRef}
                    className={`${
                        process.env.GATSBY_IS_MOBILE == "0"
                            ? " bg-transparent absolute w-full mx-auto z-40"
                            : " bg-transparent absolute w-full mx-auto z-40"
                        // mobile__header
                    }`}
                >
                    <div
                        ref={fixedRef}
                        className={`  ${
                            process.env.GATSBY_IS_MOBILE == "0"
                                ? "header-top"
                                : "pt-0"
                        }  ${
                            sticky
                                ? "fixed top-0 bg-secondary-100 opacity-90 w-full"
                                : ""
                        }`}
                    >
                        <div className="container px-4">
                            <nav className="bg-transparent flex justify-between items-center py-3">
                                {/* <div className="text-3xl font-semibold leading-none"> */}
                                {
                                    // process.env.GATSBY_IS_MOBILE == "0" &&
                                    isAuthAvailable && (
                                        <button
                                            onClick={ofcanvasHandaler}
                                            onKeyDown={ofcanvasHandaler}
                                            className="flex flex-col space-y-1.5  lg:hidden"
                                        >
                                            <span className="line h-0.5 w-6 inline-block bg-white"></span>
                                            <span className="line h-0.5 w-6 inline-block bg-white"></span>
                                            <span className="line h-0.5 w-6 inline-block bg-white"></span>
                                        </button>
                                    )
                                }
                                {process.env.GATSBY_IS_MOBILE == "0" && (
                                    <Logo />
                                )}
                                {/* </div> */}
                                <MainMenu allmenuData={data?.menu} />
                                {process.env.GATSBY_IS_MOBILE == "1" && (
                                    <div className="flex justify-center align-center px-[15px] ">
                                        <h1 className=" h-10 text-ellipsis overflow-hidden font-bold text-md text-white  text-center ">
                                            {" "}
                                            {endpoint}
                                        </h1>
                                    </div>
                                )}
                                <div className="header-right-action flex items-center">
                                    {/* Notification */}
                                    {isAuthAvailable && (
                                        <div className="relative">
                                            <button
                                                onClick={() =>
                                                    setOpenNotification(
                                                        !openNotification
                                                    )
                                                }
                                                // className="mx-8"
                                            >
                                                <StaticImage
                                                    src="../../data/images/bell-icon.png"
                                                    alt=""
                                                    style={{ maxWidth: "40px" }}
                                                />
                                            </button>
                                            <>
                                                {openNotification ? (
                                                    <div
                                                        className="fixed left-0 top-0 z-20 opacity-0 h-full w-full bg-black"
                                                        onClick={() =>
                                                            setOpenNotification(
                                                                !openNotification
                                                            )
                                                        }
                                                        onKeyDown={() =>
                                                            setOpenNotification(
                                                                !openNotification
                                                            )
                                                        }
                                                        tabIndex={0}
                                                    ></div>
                                                ) : null}
                                                <div
                                                    className={`${
                                                        openNotification
                                                            ? "visible mt-4 opacity-100"
                                                            : "invisible mt-14 opacity-0"
                                                    } notification__popup submenu-nav absolute right-0 z-50 bg-white rounded-lg transition-all duration-500 p-4 border border-gray-100 md:w-[300px] w-[250px]`}
                                                >
                                                    <ul>
                                                        <h4 className="text-black	text-center ">
                                                            Notifications
                                                        </h4>
                                                        {notificationListData &&
                                                            notificationListData?.length >
                                                                0 &&
                                                            notificationListData?.map(
                                                                (item, ind) => {
                                                                    return (
                                                                        <>
                                                                            <Link
                                                                                to={`/match?rmc=${item?.Match?.match_code}`}
                                                                            >
                                                                                <li
                                                                                    key={
                                                                                        ind
                                                                                    }
                                                                                    className="cursor-pointer border-solid border-b border-black-500 last:border-b-0 flex items-center justify-between text-sm font-medium text-black py-1"
                                                                                >
                                                                                    <div className="flex">
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
                                                                                            <p className="text-[12px] font-medium text-black">
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
                                                                }
                                                            )}
                                                    </ul>
                                                    <div className="border-solid border-t border-black-500 flex items-center justify-center text-sm font-medium text-black mt-5 pt-3">
                                                        <button
                                                            onClick={() => {
                                                                setModal(true);
                                                                setOpenNotification(
                                                                    !openNotification
                                                                );
                                                            }}
                                                            className="cursor-pointer text-primary"
                                                        >
                                                            Join with Code
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                    )}

                                    {/* /Notification */}
                                    {isAuthAvailable ? (
                                        // Render Log Out button if authentication data is available
                                        process.env.GATSBY_IS_MOBILE == "0" && (
                                            <Button
                                                onClick={handleLogout}
                                                shape="square2xl"
                                                className="text-white hidden xs:block btn-bg-image"
                                            >
                                                LOG OUT
                                                <StaticImage
                                                    className="align-middle ml-3 transition-all group-hover:ml-5"
                                                    src="../../data/images/icons/arrrow-icon2.webp"
                                                    alt=""
                                                />
                                            </Button>
                                        )
                                    ) : // : (
                                    //     <button
                                    //         type="button"
                                    //         onClick={handleLogout}
                                    //     >
                                    //         <svg
                                    //             width="30px"
                                    //             height="30px"
                                    //             viewBox="0 0 24 24"
                                    //             xmlns="http://www.w3.org/2000/svg"
                                    //             fill="#ffffff"
                                    //         >
                                    //             <g
                                    //                 id="SVGRepo_bgCarrier"
                                    //                 stroke-width="0"
                                    //             ></g>
                                    //             <g
                                    //                 id="SVGRepo_tracerCarrier"
                                    //                 stroke-linecap="round"
                                    //                 stroke-linejoin="round"
                                    //             ></g>
                                    //             <g id="SVGRepo_iconCarrier">
                                    //                 {" "}
                                    //                 <g>
                                    //                     {" "}
                                    //                     <path
                                    //                         fill="none"
                                    //                         d="M0 0h24v24H0z"
                                    //                     ></path>{" "}
                                    //                     <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"></path>{" "}
                                    //                 </g>{" "}
                                    //             </g>
                                    //         </svg>
                                    //     </button>
                                    // )
                                    // Render Sign Up button if authentication data is not available
                                    process.env.GATSBY_IS_MOBILE == "0" ? (
                                        <Button
                                            path="/login"
                                            shape="square2xl"
                                            className="text-white hidden xs:block btn-bg-image"
                                        >
                                            SIGN IN
                                            <StaticImage
                                                className="align-middle ml-3 transition-all group-hover:ml-5"
                                                src="../../data/images/icons/arrrow-icon2.webp"
                                                alt=""
                                            />
                                        </Button>
                                    ) : (
                                        <></>
                                    )}
                                    {!isAuthAvailable &&
                                    process.env.GATSBY_IS_MOBILE == 1 ? (
                                        <>
                                            {/* <button
                                                type="button"
                                                onClick={() =>
                                                    navigate("/login")
                                                }
                                            >
                                                {" "}
                                                <svg
                                                    width="30px"
                                                    height="30px"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#ffffff"
                                                >
                                                    <g
                                                        id="SVGRepo_bgCarrier"
                                                        stroke-width="0"
                                                    ></g>
                                                    <g
                                                        id="SVGRepo_tracerCarrier"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <g>
                                                            {" "}
                                                            <path
                                                                fill="none"
                                                                d="M0 0h24v24H0z"
                                                            ></path>{" "}
                                                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"></path>{" "}
                                                        </g>{" "}
                                                    </g>
                                                </svg>
                                                {/* <svg
                                                    width="50px"
                                                    height="50px"
                                                    viewBox="0 -0.5 25 25"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z"
                                                        fill="#ffffff"
                                                    />
                                                </svg> */}
                                            {/* </button> */}
                                        </>
                                    ) : (
                                        <>
                                            {/* {process.env.GATSBY_IS_MOBILE ==
                                                1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handleLogout();
                                                        navigate("/login");
                                                    }}
                                                >
                                                    <svg
                                                        width="50px"
                                                        height="50px"
                                                        viewBox="0 -0.5 25 25"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z"
                                                            fill="#ffffff"
                                                        />
                                                    </svg>
                                                </button>
                                            )} */}

                                            {/* <button
                                                type="button"
                                                onClick={() =>
                                                    navigate("/login")
                                                }
                                            >
                                                   <svg
                                                    width="30px"
                                                    height="30px"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#ffffff"
                                                >
                                                    <g
                                                        id="SVGRepo_bgCarrier"
                                                        stroke-width="0"
                                                    ></g>
                                                    <g
                                                        id="SVGRepo_tracerCarrier"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <g>
                                                            {" "}
                                                            <path
                                                                fill="none"
                                                                d="M0 0h24v24H0z"
                                                            ></path>{" "}
                                                            <path d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"></path>{" "}
                                                        </g>{" "}
                                                    </g>
                                                </svg>


                                               
                                            </button> */}
                                        </>
                                    )}
                                    {
                                        // process.env.GATSBY_IS_MOBILE == "0" &&
                                        isAuthAvailable &&
                                            process.env.GATSBY_IS_MOBILE ==
                                                "0" && (
                                                <button
                                                    onClick={ofcanvasHandaler}
                                                    onKeyDown={ofcanvasHandaler}
                                                    className="flex flex-col space-y-1.5  lg:hidden"
                                                >
                                                    <span className="line h-0.5 w-6 inline-block bg-white"></span>
                                                    <span className="line h-0.5 w-6 inline-block bg-white"></span>
                                                    <span className="line h-0.5 w-6 inline-block bg-white"></span>
                                                </button>
                                            )
                                    }

                                    <MobileNavMenu
                                        MobilemenuData={data.menu}
                                        ofcanvasOpen={ofcanvasOpen}
                                        ofcanvasHandaler={ofcanvasHandaler}
                                        handleLogout={handleLogout}
                                    />
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            )}

            {/* MODAL POPUP START */}
            <Popup
                // btnType={"submit"}
                open={modal}
                setOpen={setModal}
                modalTitle={"ENTER THE MATCH CODE"}
                body={
                    <>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                joinMatch();
                            }}
                        >
                            <div className="flex flex-col items-center justify-center single-fild mt-6">
                                <input
                                    type="text"
                                    className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                                    placeholder="Enter the Game Invite Code."
                                    style={{
                                        color: "white",
                                        fontSize:"18px",
                                        textAlign:"center"
                                    }}
                                    name="roomCode"
                                    value={roomCode}
                                    onChange={(e) => {
                                        setRoomCode(e.target.value);
                                    }}
                                    required
                                />
                                <Button
                                    // disabled={!roomCode}
                                    type="submit"
                                    // onClick={() => joinMatch()}
                                    className="text-white block btn-bg-image-large mr-3 mt-8"
                                >
                                    JOIN ROOM
                                </Button>
                            </div>
                        </form>
                    </>
                }
            />
            {/* MODAL POPUP END */}
        </>
    );
};

Header.propTypes = {
    data: PropTypes.shape({
        menu: PropTypes.arrayOf(PropTypes.shape({})),
    }),
};

export default Header;

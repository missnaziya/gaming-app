import React, { Fragment, useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../../components/shared/button";
import {
    getClosest,
    getSiblings,
    slideToggle,
    slideUp,
} from "../../../utils/mobile-nav-utils";
import PropTypes from "prop-types";

const MobileNavMenu = ({
    MobilemenuData,
    ofcanvasOpen,
    ofcanvasHandaler,
    handleLogout,
}) => {


   useEffect(() => {
    const handleScroll = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    if (ofcanvasOpen) {
      document.body.classList.add("popup-open");
      handleScroll();
    } else {
      document.body.classList.remove("popup-open");
    }

    return () => {
      document.body.classList.remove("popup-open");
    };
  }, [ofcanvasOpen]);

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [webSubMenuOpen, setWebSubMenuOpen] = useState(false);
    const MobileMenuArr = MobilemenuData;
    // console.warn(MobilemenuData, "MobilemenuData>>>>>>>>>>>");

    const MobileAppMenuArr =
        // MobilemenuData;
        [
            {
                id: "menu-1",
                text: "Home",
                link: "/",
                icon: (
                    <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        // fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        // stroke="#000000"
                        fill={typeof window !== 'undefined' && "/" === window.location.pathname ? "violet" : "#000000"}

                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"
                                // fill="#080341"
                            ></path>{" "}
                        </g>
                    </svg>
                ),
            },
            {
                id: "menu-2",
                text: "Live Games",
                link: "/match",
                icon: (
                    <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <g fill="none" fill-rule="evenodd">
                            <path d="m0 0h32v32h-32z"></path>
                            <path
                                d="m16 3c.5522847 0 1 .44771525 1 1v5h5c5.4292399 0 9.8479317 4.3266708 9.9961582 9.7200952l.0038418.2799048c0 5.4292399-4.3266708 9.8479317-9.7200952 9.9961582l-.2799048.0038418h-12c-5.5228475 0-10-4.4771525-10-10 0-5.4292399 4.32667079-9.84793172 9.72009516-9.9961582l.27990484-.0038418h5v-5c0-.55228475.4477153-1 1-1zm6 8h-12c-4.418278 0-8 3.581722-8 8 0 4.3349143 3.44783777 7.8645429 7.75082067 7.9961932l.24917933.0038068h12c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8zm-12 4c.5522847 0 1 .4477153 1 1v2h2c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1h-2v2c0 .5522847-.4477153 1-1 1-.55228475 0-1-.4477153-1-1v-2h-2c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h2v-2c0-.5522847.44771525-1 1-1zm14.5 5c.8284271 0 1.5.6715729 1.5 1.5s-.6715729 1.5-1.5 1.5-1.5-.6715729-1.5-1.5.6715729-1.5 1.5-1.5zm-2-5c.8284271 0 1.5.6715729 1.5 1.5s-.6715729 1.5-1.5 1.5-1.5-.6715729-1.5-1.5.6715729-1.5 1.5-1.5z"
                                fill={typeof window !== 'undefined' && "/match/" === window.location.pathname ? "violet" : "#000000"}

                                fill-rule="nonzero"
                            ></path>
                        </g>
                    </g>
                </svg>
                
                ),
            },
            // {
            //     id: "menu-3",
            //     text: "About",
            //     link: "",
            //     icon: (
            //         <svg
            //             width="25px"
            //             height="25px"
            //             viewBox="0 0 24 24"
            //             fill="none"
            //             xmlns="http://www.w3.org/2000/svg"
            //         >
            //             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            //             <g
            //                 id="SVGRepo_tracerCarrier"
            //                 stroke-linecap="round"
            //                 stroke-linejoin="round"
            //             ></g>
            //             <g id="SVGRepo_iconCarrier">
            //                 {" "}
            //                 <path
            //                     d="M6 15L12 9L18 15"
            //                     stroke="#000000"
            //                     stroke-width="2"
            //                     stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                 ></path>{" "}
            //             </g>
            //         </svg>
            //     ),
            // },

             {
                id: "menu-3",
                text: "Wallet",
                link: "/wallet",
                icon: (
                    <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6Z"
                        // stroke="#000000"
                        stroke={typeof window !== 'undefined' && "/wallet/" === window.location.pathname ? "violet" : "#000000"}

                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M8 4V8C8 9.10457 8.89543 10 10 10H14C15.1046 10 16 9.10457 16 8V4"
                        // stroke="#000000"
                        stroke={typeof window !== 'undefined' && "/wallet/" === window.location.pathname ? "violet" : "#000000"}

                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                
                ),
            },
            {
                id: "menu-5",
                text: "Me",
                link: "/my-profile",
                icon: (
                    <svg
                        width="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                opacity="0.1"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18.1554 18.5659L18.087 18.4067C17.6996 17.3756 17.0535 16.6988 16.0488 16.2901C15.0618 15.8886 13.7385 15.75 12.0001 15.75C10.275 15.75 8.95912 15.8972 7.97442 16.3031C6.97373 16.7156 6.32558 17.3909 5.93304 18.4043L5.85652 18.5771C4.09876 16.9345 3 14.5956 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 14.5897 19.9062 16.9239 18.1554 18.5659ZM8.75 10C8.75 8.20507 10.2051 6.75 12 6.75C13.7949 6.75 15.25 8.20507 15.25 10C15.25 11.7949 13.7949 13.25 12 13.25C10.2051 13.25 8.75 11.7949 8.75 10Z"

                                
                            ></path>{" "}
                            <path
                                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke={typeof window !== 'undefined' && "/my-profile/" === window.location.pathname ? "violet" : "#000000"}

                                stroke-width="2"
                            ></path>{" "}
                            <path
                                d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                                stroke-width="2"
                                stroke={typeof window !== 'undefined' && "/my-profile/" === window.location.pathname ? "violet" : "#000000"}

                            ></path>{" "}
                            <path
                                d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5"
                                stroke={typeof window !== 'undefined' && "/my-profile/" === window.location.pathname ? "violet" : "#000000"}
                                stroke-width="2"
                                stroke-linecap="round"
                            ></path>{" "}
                        </g>
                    </svg>
                ),
            },
        ];

    const MobileAppSliderMenuArr =
        // MobilemenuData;
        [
            // {
            //     id: "menu-1",
            //     text: "Home",
            //     link: "/",
            // },
            // {
            //     id: "menu-2",
            //     text: "Match",
            //     link: "/match",
            // },


            {
                id: "menu-4",
                text: "Games Played",
                link: "/my-matches",
            },
            // {
            //     id: "menu-5",
            //     text: "Wallet",
            //     link: "/wallet",
            // },

            {
                id: "menu-3",
                text: "About Us",
                link: "/about-us",
            },
            {
                id: "menu-6",
                text: "FAQ's ",
                link: "/faq",
            },
            {
                id: "menu-7",
                text: "Privacy Policy",
                link: "/privacy-policy",
            },
            {
                id: "menu-8",
                text: "Terms & Conditions",
                link: "/term-condition",
            },
        ];

    let isAuthAvailable = false;

    if (typeof window !== "undefined") {
        isAuthAvailable =
            localStorage.getItem("auth") !== null
                ? JSON.parse(localStorage.getItem("auth"))
                : false;
        isAuthAvailable = isAuthAvailable?.isLogin;
    }

    const pages = [
        {
            id: "menu-31",
            text: "About Us",
            link: "/about-us",
        },
        {
            id: "menu-33",
            text: "FAQ's",
            link: "/faq",
        },
    ];

    const privatePages = [
        {
            id: "menu-31",
            text: "About Us",
            link: "/about-us",
        },
        //  {
        //     "id": "menu-39",
        //     "text": "My Profile",
        //     "link": "/my-profile"
        // },
        {
            id: "menu-35",
            text: "My Matches",
            link: "/my-matches",
        },
        {
            id: "menu-33",
            text: "FAQ's",
            link: "/faq",
        },
        {
            id: "menu-34",
            text: "Wallet",
            link: "/wallet",
        },
    ];

    const onClickHandler = (e) => {
        const target = e.currentTarget;
        const parentEl = target.parentElement;
        if (
            parentEl?.classList.contains("menu-expand") ||
            target.classList.contains("menu-expand")
        ) {
            const element = target.classList.contains("icon")
                ? parentEl
                : target;
            const parent = getClosest(element, "li");
            const childNodes = parent.childNodes;
            const parentSiblings = getSiblings(parent);
            parentSiblings.forEach((sibling) => {
                const sibChildNodes = sibling.childNodes;
                sibChildNodes.forEach((child) => {
                    if (child.nodeName === "UL") {
                        slideUp(child, 500);
                    }
                });
            });
            childNodes.forEach((child) => {
                if (child.nodeName === "UL") {
                    slideToggle(child, 500);
                }
            });
        }
    };

    return (
        <>
            {process.env.GATSBY_IS_MOBILE == "0" ? (
               
<>
                <div
               
                    className={`${
                        ofcanvasOpen ? "mobile-menu-open" : ""
                    } fixed invisible top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto   transition-all`}
                >
                    <div
                        className="OffCanvasContent fixed left-0 top-0 z-20 opacity-0  h-full w-full bg-black"
                        onClick={ofcanvasHandaler}
                        onKeyDown={ofcanvasHandaler}
                        role="button"
                        tabIndex={0}
                    ></div>
                    <div
                        className="OffCanvasContent"
                        onClick={ofcanvasHandaler}
                        onKeyDown={ofcanvasHandaler}
                        role="button"
                        tabIndex={0}
                    />
                    <div
                        className="site-mobile-menu transform -translate-x-full 
            transition-all text-black bg-white z-30 
            relative h-full px-8 py-8 w-310 sm:w-96 overflow-x-hidden overflow-y-auto"
                    >
                        <button
                    style={{border:"2px solid red"}}

                            onClick={ofcanvasHandaler}
                            onKeyDown={ofcanvasHandaler}
                            className=" flex justify-end items-center ml-auto"
                        >
                            Close <i className="icofont-close"></i>
                        </button>
                        <ul className="mt-10 mb-10">
                            {MobileMenuArr.map((menu) => {
                                const submenu = menu.submenu;
                                return (
                                    <li
                                        key={`menu-${menu.id}`}
                                        className={`${
                                            !!submenu
                                                ? "has-submenu-dropdown"
                                                : ""
                                        } relative font-medium block pb-3 mb-3 border-b`}
                                        onClick={() =>
                                            menu.text === "Pages"
                                                ? setWebSubMenuOpen(
                                                      !webSubMenuOpen
                                                  )
                                                : null
                                        }
                                    >
                                        <Link
                                            activeClassName="active"
                                            to={menu.link}
                                            className="flex"
                                        >
                                            {menu.text}
                                            {menu.text === "Pages" && (
                                                <svg
                                                    className="ml-auto"
                                                    width="25px"
                                                    height="25px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
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
                                                        <g id="Arrow / Chevron_Down">
                                                            {" "}
                                                            <path
                                                                id="Vector"
                                                                d="M19 9L12 16L5 9"
                                                                stroke="#000000"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>{" "}
                                                        </g>{" "}
                                                    </g>
                                                </svg>
                                            )}
                                        </Link>

                                        {!!submenu && (
                                            <Fragment>
                                                <button
                                                    className="menu-toggle menu-expand absolute right-0 justify-center cursor-pointer bg-transparent"
                                                    onClick={onClickHandler}
                                                    onKeyDown={onClickHandler}
                                                >
                                                    <i className="icofont-rounded-down"></i>
                                                </button>
                                                <ul className="submenu-nav hidden mt-4">
                                                    {submenu.map(
                                                        (submenu, i) => {
                                                            return (
                                                                <li
                                                                    key={`submenu${i}`}
                                                                    className="font-medium block pb-3 mb-3 px-3 border-b last:mb-0 last:border-0 "
                                                                >
                                                                    <Link
                                                                        to={
                                                                            submenu.link
                                                                        }
                                                                    >
                                                                        {
                                                                            submenu.text
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </Fragment>
                                        )}

                                        {menu.text === "Pages" &&
                                            webSubMenuOpen && (
                                                <ul className="pt-2">
                                                    {(isAuthAvailable
                                                        ? privatePages
                                                        : pages
                                                    )?.map((item, i) => (
                                                        <li
                                                            key={`dummy${i}`}
                                                            className="pt-2 mt-2 px-3 border-t"
                                                        >
                                                            <Link
                                                                activeClassName="active    text-fuchsia-500"
                                                                to={item.link}
                                                                className="menu-sub-item text-sm font-medium text-black block py-1 hover:text-primary"
                                                            >
                                                                {item.text}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="action-button text-center">
                            <Button
                                path="/login"
                                shape="square2xl"
                                className="text-white btn-bg-image"
                            >
                                SIGN IN
                                <StaticImage
                                    className="align-middle ml-3"
                                    src="../../../data/images/icons/arrrow-icon2.webp"
                                    alt=""
                                />
                            </Button>
                        </div>
                    </div>
                </div>
        
</>
            ) : (
                <>
                    {isAuthAvailable && (
                        <>
                      
                            <div
                                className={`${
                                    ofcanvasOpen ? "mobile-menu-open" : ""
                                } bg-white fixed invisible top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto opacity-100 transition-all`}
                            >
                                  {/* <div
                                style={{backgroundColor:"red !important" }}
                                  className="absolute"
                        
                        >  */}
                                <div
                                    className="OffCanvasContent fixed left-0 top-0 z-20 opacity-100 invisible h-full w-full bg-black"
                                    onClick={ofcanvasHandaler}
                                    onKeyDown={ofcanvasHandaler}
                                    role="button"
                                    tabIndex={0}
                                ></div>
                                <div
                                    className="OffCanvasContent"
                                    onClick={ofcanvasHandaler}
                                    onKeyDown={ofcanvasHandaler}
                                    role="button"
                                    tabIndex={0}
                                />
                                <div
                                    className="site-mobile-menu transform -translate-x-full 
            transition-all text-black bg-white z-30 
            relative h-full px-8 py-8 w-310 sm:w-96 overflow-x-hidden overflow-y-auto"
                                >
                                    <button
                                        onClick={ofcanvasHandaler}
                                        onKeyDown={ofcanvasHandaler}
                                        className=" flex justify-end items-center ml-auto"
                                    >
                                        Close <i className="icofont-close"></i>
                                    </button>
                                    <ul className="mt-10 mb-10">
                                        {MobileAppSliderMenuArr.map((menu) => {
                                            const submenu = menu.submenu;
                                            return (
                                                <li
                                                    key={`menu-${menu.id}`}
                                                    className={`${
                                                        !!submenu
                                                            ? "has-submenu-dropdown"
                                                            : ""
                                                    } relative font-medium block pb-3 mb-3 border-b`}
                                                >
                                                    <Link
                                                        activeClassName="active    text-fuchsia-500"
                                                        to={menu.link}
                                                        className="flex"
                                                        onClick={
                                                            ofcanvasHandaler
                                                        }
                                                    >
                                                        {menu.text}
                                                        {/* {menu.text ===
                                                            "Pages" && (
                                                            <svg
                                                                className="ml-auto"
                                                                width="25px"
                                                                height="25px"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
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
                                                                    <g id="Arrow / Chevron_Down">
                                                                        {" "}
                                                                        <path
                                                                            id="Vector"
                                                                            d="M19 9L12 16L5 9"
                                                                            stroke="#000000"
                                                                            stroke-width="2"
                                                                            stroke-linecap="round"
                                                                            stroke-linejoin="round"
                                                                        ></path>{" "}
                                                                    </g>{" "}
                                                                </g>
                                                            </svg>
                                                        )} */}
                                                    </Link>

                                                    {!!submenu && (
                                                        <Fragment>
                                                            <button
                                                                className="menu-toggle menu-expand absolute right-0 justify-center cursor-pointer bg-transparent"
                                                                onClick={
                                                                    onClickHandler
                                                                }
                                                                onKeyDown={
                                                                    onClickHandler
                                                                }
                                                            >
                                                                <i className="icofont-rounded-down"></i>
                                                            </button>
                                                            <ul className="submenu-nav hidden mt-4">
                                                                {submenu.map(
                                                                    (
                                                                        submenu,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <li
                                                                                key={`submenu${i}`}
                                                                                className="font-medium block pb-3 mb-3 px-3 border-b last:mb-0 last:border-0 "
                                                                            >
                                                                                <Link
                                                                                    to={
                                                                                        submenu.link
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        submenu.text
                                                                                    }
                                                                                </Link>
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                            </ul>
                                                        </Fragment>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className="action-button text-center">
                                        {isAuthAvailable ? (
                                            <Button
                                                // path="/login"
                                                shape="square2xl"
                                                className="text-white btn-bg-image"
                                                onClick={() => {
                                                    handleLogout();
                                                    navigate("/login");
                                                }}
                                            >
                                                Logout
                                                <StaticImage
                                                    className="align-middle ml-3"
                                                    src="../../../data/images/icons/arrrow-icon2.webp"
                                                    alt=""
                                                />
                                            </Button>
                                        ) : (
                                            <Button
                                                path="/login"
                                                shape="square2xl"
                                                className="text-white btn-bg-image"
                                            >
                                                SIGN IN
                                                <StaticImage
                                                    className="align-middle ml-3"
                                                    src="../../../data/images/icons/arrrow-icon2.webp"
                                                    alt=""
                                                />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            {/* </div> */}
                            </div>
{/* tabs------------------ */}
                            <div className="bottom_links">
                                <ul className="flex items-center justify-between w-full px-3">
                                    {MobileAppMenuArr.map((menu) => {
                                        const submenu = menu.submenu;
                                        return (
                                            <li
                                                key={`menu-${menu.id}`}
                                                className={`${
                                                    !!submenu
                                                        ? "mobile_sub_menu"
                                                        : ""
                                                } relative font-medium block text-black`}
                                                onClick={() =>
                                                    menu.text === "About"
                                                        ? setSubMenuOpen(
                                                              !subMenuOpen
                                                          )
                                                        : null
                                                }
                                            >
                                                {["About"].includes(
                                                    menu.text
                                                ) ? (
                                                    <>
                                                        <Link
                                                            activeClassName="active    text-fuchsia-500"
                                                            className="flex flex-col items-center justify-center text-[12px]"
                                                        >
                                                            <button
                                                                id="dropdownMenubarLink"
                                                                data-dropdown-toggle="dropdownMenubar"
                                                                activeClassName="active    text-fuchsia-500"
                                                                class="flex items-center flex-col justify-center text-[12px] text-[12px]"
                                                            >
                                                                {menu.icon}
                                                                {menu.text}
                                                            </button>
                                                        </Link>

                                                        <div
                                                            id="dropdownMenubar"
                                                            class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                                        >
                                                            <ul className="submenu-nav absolute left-0 z-50 bg-white rounded-lg mb-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mb-4 transition-all duration-500 min-w-200 p-4 border border-gray-100 w-64">
                                                                {(isAuthAvailable
                                                                    ? privatePages
                                                                    : pages
                                                                )?.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => (
                                                                        <li
                                                                            key={`dummy${i}`}
                                                                        >
                                                                            <Link
                                                                                activeClassName="active    text-fuchsia-500"
                                                                                to={
                                                                                    item.link
                                                                                }
                                                                                className="menu-sub-item text-sm font-medium text-black block py-1 hover:text-primary"
                                                                            >
                                                                                {
                                                                                    item.text
                                                                                }
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Link
                                                        activeClassName="active    text-fuchsia-500"
                                                        to={menu.link}
                                                        className="flex flex-col items-center justify-center text-[12px]"
                                                    >
                                                        {menu.icon}
                                                        {menu.text}
                                                    </Link>
                                                )}

                                                {!!submenu && (
                                                    <>
                                                        <button
                                                            className="menu-toggle menu-expand absolute right-0 justify-center cursor-pointer bg-transparent"
                                                            onClick={
                                                                onClickHandler
                                                            }
                                                            onKeyDown={
                                                                onClickHandler
                                                            }
                                                        >
                                                            <i className="icofont-rounded-down"></i>
                                                        </button>
                                                        <ul className="submenu-nav hidden mt-4">
                                                            {submenu.map(
                                                                (
                                                                    submenu,
                                                                    i
                                                                ) => {
                                                                    return (
                                                                        <li
                                                                            key={`submenu${i}`}
                                                                            className="font-medium block pb-3 mb-3 px-3 border-b last:mb-0 last:border-0 "
                                                                        >
                                                                            <Link
                                                                                to={
                                                                                    submenu.link
                                                                                }
                                                                            >
                                                                                {
                                                                                    submenu.text
                                                                                }
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </>
                                                )}

                                                {menu.text === "About" && (
                                                    <ul
                                                        className={
                                                            subMenuOpen
                                                                ? "sub__mob__menu open"
                                                                : "sub__mob__menu"
                                                        }
                                                    >
                                                        {(isAuthAvailable
                                                            ? privatePages
                                                            : pages
                                                        )?.map((item, i) => (
                                                            <li
                                                                key={`dummy${i}`}
                                                                className="px-3"
                                                            >
                                                                <Link
                                                                    to={
                                                                        item.link
                                                                    }
                                                                    className="menu-sub-item text-sm font-medium text-black block py-1 hover:text-primary text-center"
                                                                    activeClassName="active    text-fuchsia-500"
                                                                >
                                                                    {item.text}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

MobileNavMenu.propTypes = {
    MobilemenuData: PropTypes.array,
    ofcanvasOpen: PropTypes.bool,
    ofcanvasHandaler: PropTypes.func,
};

export default MobileNavMenu;

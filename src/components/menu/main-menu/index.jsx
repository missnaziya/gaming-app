import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import KonfehtiService from "../../../constants/konfehti-api";
import { GET_GAMES } from "../../../constants/endpoints";

const MainMenu = ({ allmenuData }) => {
    let isAuthAvailable = false;
    if (typeof window !== "undefined") {
        isAuthAvailable =
            localStorage.getItem("auth") !== null
                ? JSON.parse(localStorage.getItem("auth"))
                : false;
        isAuthAvailable = isAuthAvailable?.isLogin;
    }

    // Define the initial pages array
    const pages = [
        {
            id: "menu-31",
            text: "About Us",
            link: "/about-us",
        },
        {
            id: "menu-33",
            text: "FAQ's Page",
            link: "/faq",
        },
    ];
    const privatePages = [
        {
            id: "menu-31",
            text: "About Us",
            link: "/about-us",
        },
        {
            id: "menu-39",
            text: "My Profile",
            link: "/my-profile",
        },
        {
            id: "menu-35",
            text: "My Matches",
            link: "/my-matches",
        },
        {
            id: "menu-33",
            text: "FAQ's Page",
            link: "/faq",
        },
        {
            id: "menu-34",
            text: "Wallet",
            link: "/wallet",
        },
    ];

    const [data, setData] = useState(null);
    const fetchData = async () => {
        try {
            const response = await KonfehtiService.post(GET_GAMES);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // useEffect(() => {

    //     fetchData();
    // }, []);

    const menuarr = allmenuData;
    console.log(allmenuData);
    return (
        <>
            <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-12">
                {/* {menuarr?.map((menu) => {
                    const submenu = menu.submenu;
                    return (
                        <li
                            key={`menu-${menu.id}`}
                            className={`${
                                !!submenu ? "has-submenu" : ""
                            } group relative pt-4 pb-4 cursor-pointer text-white font-bold z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100`}
                        >
                            <Link
                                activeClassName="active"
                                to={menu.link}
                                className="font-semibold uppercase"
                            >
                                {menu.text}
                            </Link>
                            {!!submenu && (
                                <ul className="submenu-nav absolute left-0 z-50 bg-white rounded-lg mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-4 transition-all duration-500 min-w-200 p-4 border border-gray-100 w-64">
                                    {submenu.map((submenu, i) => {
                                        return (
                                            <li key={`submenu${i}`}>
                                                <Link
                                                    to={submenu.link}
                                                    className="menu-sub-item text-sm font-medium text-black block py-1 hover:text-primary"
                                                >
                                                    {submenu.text}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })} */}

                {/* {
                    "id": "menu-31",
                    "text": "About Us",
                    "link": "/about-us"
                },
                {
                    "id": "menu-39",
                    "text": "My Profile",
                    "link": "/my-profile"
                },

                {
                    "id": "menu-33",
                    "text": "FAQ's Page",
                    "link": "/faq"
                } */}

                {menuarr?.map((menu) => {
                    const submenu = menu.submenu;
                    return (
                        <li
                            key={`menu-${menu.id}`}
                            className={`${
                                !!submenu ? "has-submenu" : ""
                            } group relative pt-4 pb-4 cursor-pointer text-white font-bold z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100`}
                        >
                            {["Pages"].includes(menu.text) ? (
                                <>
                                    <Link
                                        activeClassName="active text-fuchsia-500"
                                        className="font-semibold uppercase"
                                    >
                                        <button
                                            id="dropdownNavbarLink"
                                            data-dropdown-toggle="dropdownNavbar"
                                            activeClassName="active text-fuchsia-500"
                                            class="flex items-center justify-between font-semibold uppercase w-full py-2 px-3"
                                        >
                                            Pages{" "}
                                            <svg
                                                class="w-2.5 h-2.5 ms-2.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </button>
                                    </Link>

                                    <div
                                        id="dropdownNavbar"
                                        class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                    >
                                        <ul className="submenu-nav absolute left-0 z-50 bg-white rounded-lg mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-4 transition-all duration-500 min-w-200 p-4 border border-gray-100 w-64">
                                            {(isAuthAvailable
                                                ? privatePages
                                                : pages
                                            )?.map((item, i) => (
                                                <li key={`dummy${i}`}>
                                                    <Link
                                                        activeClassName="active text-fuchsia-500"
                                                        to={item.link}
                                                        className="menu-sub-item text-sm font-medium text-black block py-1 hover:text-primary"
                                                    >
                                                        {item.text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    activeClassName="active text-fuchsia-500"
                                    to={menu.link}
                                    className="font-semibold uppercase"
                                >
                                    {menu.text}
                                </Link>
                            )}

                            {!!submenu && (
                                <ul className="submenu-nav absolute left-0 z-50 bg-white rounded-lg mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-4 transition-all duration-500 min-w-200 p-4 border border-gray-100 w-64">
                                    {submenu.map((submenuItem, i) => (
                                        <li key={`submenu${i}`}>
                                            <Link
                                                activeClassName="active text-fuchsia-500"
                                                to={submenuItem.link}
                                                className="menu-sub-item text-sm font-medium text-black block py-1 hover:text-primary"
                                            >
                                                {submenuItem.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {/* Hardcoded submenu for the "Pages" menu item */}
                            {menu.text === "Pages" && (
                                <ul className="submenu-nav absolute left-0 z-50 bg-white rounded-lg mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-4 transition-all duration-500 min-w-200 p-4 border border-gray-100 w-64">
                                    {(isAuthAvailable
                                        ? privatePages
                                        : pages
                                    )?.map((item, i) => (
                                        <li key={`dummy${i}`}>
                                            <Link
                                                activeClassName="active text-fuchsia-500"
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

                {/* <li
                    className={` "has-submenu group relative pt-4 pb-4 cursor-pointer text-white font-bold z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100" `}
                >
                    <Link
                        // activeClassName="active"
                        to={"/games"}
                        className="font-semibold uppercase"
                    >
                        Games
                    </Link>

                    {data && (
                        <ul className="submenu-nav absolute left-0 z-50 bg-white rounded-lg mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-4 transition-all duration-500 min-w-200 p-4 border border-gray-100 w-64">
                            {data?.map((submenu, i) => {
                                return (
                                    <li key={`submenu${i}`}>
                                        <Link
                                            // to={submenu.link}
                                            className="menu-sub-item text-sm font-medium text-black block py-1 hover:text-primary"
                                        >
                                            {submenu.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </li> */}
            </ul>

            {/* <ul>
                <li>games</li>
                {data?.map((data1, i) => (
                    <div key={i}>{data1.name}</div>
                ))}
            </ul> */}
        </>
    );
};
MainMenu.propTypes = {
    allmenuData: PropTypes.array,
};
export default MainMenu;

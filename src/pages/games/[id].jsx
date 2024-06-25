import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import SEO from "@components/seo";
import Layout from "@layout";
import { graphql } from "gatsby";
import { normalizedData } from "@utils/functions";
import PageBreadcrumb from "../../components/pagebreadcrumb";
import Swiper, { SwiperSlide } from "@components/shared/swiper";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { DiscussionEmbed } from "disqus-react";
import Button from "../../components/shared/button";
import { toast } from "react-toastify";
import Popup from "../../components/common/Popup";
import { FastField, formik, useFormik } from "formik";
import LoadingScreen from "../../components/common/Loader/LoadingScreen";
import ShareMatchCode from "../../components/share-matchcode";

import { ADD_MATCH, SEND_INVITE_NOTIFICATION } from "../../constants/endpoints";
import KonfehtiService from "../../constants/konfehti-api";
import { showMessage } from "../../utils/toast-message";

const GameDetails = ({ data, location, pageContext }) => {
    const [loading, setLoading] = useState(false);
    const [uId, setUId] = useState("");
    const roomCodeRef = useRef(null);
    const [copyRC, setCopyRC] = useState("");
    const [isShare, setIsShare] = useState(false);
    const [match_code, setMatch_code] = useState("");
    const [match_detail, setMatch_detail] = useState(null);
    const [invitePopup, setInvitePopup] = useState(false);

    useEffect(() => {
        const isAuth = JSON.parse(localStorage.getItem("auth")) || null;
        const w_amount = isAuth?.wallet;

        console.log(isAuth?.user_id, ":::::::::::::::", w_amount);
        setUId(isAuth.user_id);
    }, []);

    //    console.log(isAuth,"isAuth........")

    const [amount, setAmount] = useState(100); // Initial amount set to 0

    const increment = () => {
        if (amount < 900) setAmount(amount + 100);
    };

    const decrement = () => {
        if (amount > 100) setAmount(amount - 100);
    };

    const [showCreateMatch, setShowCreateMatch] = useState(false);

    const gamedata = location?.state?.detail;

    // console.log(gamedata, "gamedataocation...>");
    // console.log(location.state, "location::::");
    // console.log(pageContext, "pageContext::::");
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const content = normalizedData(data?.page.content || []);
    pageContext = {
        ...pageContext,
        breadcrumb: {
            crumbs: pageContext?.breadcrumb?.crumbs.map((item, ind) =>
                ind === 2
                    ? {
                          pathname: `/games/${gamedata?.slug}`,
                          crumbLabel: gamedata?.slug,
                      }
                    : item
            ),
            location: `/games/${gamedata?.slug}`,
        },
    };
    const baseUrl = "https://konfehti.com";

    const disqusShorttname = "mitech-1";
    const disquscConfig = {
        identifier: gamedata?.games?.id || "123",
        title: gamedata?.games?.title || "abc",
        url: baseUrl + "/" + pageContext.slug,
    };

    const createMatch = async () => {
        let isAuthAvailable = false;

        let w_amount = 0;
        if (typeof window !== "undefined") {
            isAuthAvailable =
                localStorage.getItem("auth") !== null
                    ? JSON.parse(localStorage.getItem("auth"))
                    : false;
            isAuthAvailable = isAuthAvailable?.isLogin;
            w_amount = JSON.parse(localStorage.getItem("auth"))?.wallet;
        }

        if (isAuthAvailable) {
            if (w_amount < amount) {
                showMessage(
                    "Insufficient balance!! Please add money to your wallet."
                );

                setTimeout(() => {
                    navigate("/wallet");
                }, 3000);
            } else {
                const gameId = gamedata.id;
                try {
                    const response = await KonfehtiService.post(ADD_MATCH, {
                        game_id: gameId,
                        user_id: uId,
                        entry_amount: amount,
                    });

                    console.log(
                        "Match room created successfully.",
                        response.data
                    );
                    setMatch_detail(response?.data?.response);

                    // Show a success message
                    showMessage("Match room created successfully.");
                    setShowCreateMatch(false);
                    setInvitePopup(true);

                    if (typeof window !== "undefined") {
                        let data =
                            localStorage.getItem("auth") !== undefined
                                ? JSON.parse(localStorage.getItem("auth"))
                                : {};
                        data.wallet = data.wallet - amount;
                        localStorage.setItem("auth", JSON.stringify(data));
                    }
                    // Redirect to the match page after 3 seconds
                    setTimeout(() => {
                        // navigate("/match");
                    }, 3000);
                } catch (error) {
                    console.error("Error creating match:", error.response.data);
                    // Handle error and show error message
                    toast.error(
                        "Error creating match. Please try again later."
                    );
                }
            }
        } else {
            navigate("/login");
        }
    };

    // Function to copy room code to clipboard
    const copyRoomCode = () => {
        // Get the text content of the span element
        const roomCode = roomCodeRef.current.innerText;

        // Create a temporary textarea element
        const textarea = document.createElement("textarea");
        textarea.value = roomCode;

        // Make the textarea hidden
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";

        // Append the textarea to the body
        document.body.appendChild(textarea);

        // Select the text within the textarea
        textarea.select();
        textarea.setSelectionRange(0, 99999); /* For mobile devices */

        // Copy the selected text
        document.execCommand("copy");

        // Remove the textarea from the body
        document.body.removeChild(textarea);
        setCopyRC("copied to clipboard");

        setInterval(() => {
            setCopyRC("");
        }, [5000]);
    };

    // --------------------invite All Friends----------------------
    const inviteAllFriends = async () => {
        // setInvitePopup(false);
        try {
            const result = await KonfehtiService.post(
                `${SEND_INVITE_NOTIFICATION}?match_id=${match_detail?.match_id}`
            );
            // console.log("Res:", result);
            showMessage("Invitation sent successfully");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {/* {loading && <LoadingScreen />} */}
            <Layout
                data={{
                    ...globalContent["menu"],
                    ...globalContent["footer"],
                }}
            >
                <SEO title="Game Details" pathname="/" />
                <PageBreadcrumb
                    pageContext={pageContext}
                    location={location}
                    title="Game Details"
                />
                <div className="games-post-content-wrapper">
                    <div className="container">
                        <div className="grid grid-cols-1">
                            <div className="single-grid">
                                <div className="content-box">
                                    <p className="date text-primary font-bold mb-3">
                                        {/* {data.games.date} */}
                                    </p>
                                    <div className="description mt-6">
                                        <h2 className="font-bold">
                                            {gamedata?.title}{" "}
                                        </h2>
                                    </div>

                                    <p className="leading-8">
                                        {gamedata?.description}
                                    </p>
                                    <Button
                                        path={""}
                                        // btnType={btnType}
                                        onClick={() => {
                                            setShowCreateMatch(true);
                                        }}
                                        className="text-white block btn-bg-image-large mr-3 mt-8"
                                    >
                                        PLAY{" "}
                                        <StaticImage
                                            className="align-middle ml-3 transition-all group-hover:ml-5 "
                                            src="../../data/images/icons/arrrow-icon2.webp"
                                            alt=""
                                        />
                                    </Button>

                                    {/* ---------create match here-------------- */}
                                    <Popup
                                        btnType={"submit"}
                                        open={showCreateMatch}
                                        setOpen={setShowCreateMatch}
                                        modalTitle={"CREATE MATCH"}
                                        body={
                                            <>
                                                <form

                                                // onSubmit={
                                                //     formik.handleSubmit
                                                // }
                                                >
                                                    <div className="single-fild">
                                                        <div className="flex items-center justify-center   w-full">
                                                            <div className="md:mx-7  ">
                                                                <button
                                                                    type="button"
                                                                    style={{
                                                                        fontSize:
                                                                            "45px",
                                                                    }}
                                                                    onClick={() => {
                                                                        decrement();
                                                                    }}
                                                                    className="px-4 md:px-4 py-0 md:py-1  border text-white rounded-full border-2 border-solid border-primary shadow-lg"
                                                                >
                                                                    -
                                                                </button>
                                                            </div>
                                                            <div
                                                                className="p-3 rounded-lg shadow-sm border-purple-300 bg-transparent     lg:p-2    text-base font-bold  border-gray-300 rounded-md md:w-1/4 mx-2 md:mx-8 w-52 text-center"
                                                                style={{
                                                                    fontSize:
                                                                        "30px",
                                                                }}
                                                            >
                                                                $ {amount}
                                                                <br />
                                                                <StaticImage
                                                                    src="../../data/images/coins.png"
                                                                    className="h-8 w-14"
                                                                />
                                                                <h6 className="py-1">
                                                                    {/* Entry amount */}
                                                                </h6>
                                                            </div>

                                                            <div className="md:mx-7">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        increment();
                                                                    }}
                                                                    style={{
                                                                        fontSize:
                                                                            "45px",
                                                                    }}
                                                                    className=" px-3 md:px-3 py-0 md:py-1 border text-white rounded-full border-2 border-solid border-primary shadow-lg"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="flex flex-col  justify-center items-center sm:flex-row mt-8">
                                                    <Button
                                                        path={""}
                                                        // btnType={btnType}
                                                        onClick={() => {
                                                            createMatch();
                                                        }}
                                                        className="text-white block btn-bg-image-large mt-8"
                                                    >
                                                        Create Match Room
                                                    </Button>
                                                </div>
                                            </>
                                        }
                                    />

                                    {/* ---------------invite friends------------------- */}
                                    <Popup
                                        btnType={"submit"}
                                        open={invitePopup}
                                        setOpen={setInvitePopup}
                                        modalTitle={"ROOM CODE"}
                                        body={
                                            <>
                                                <div className="mb-2 text-left">
                                                    Share this room code with
                                                    friends and ask them to
                                                    join.
                                                </div>

                                                <form
                                                // onSubmit={
                                                //     formik.handleSubmit
                                                // }
                                                >
                                                    <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                                        <label
                                                            for="roomCode"
                                                            className="block text-sm font-medium text-white-700 flex"
                                                        >
                                                            <div className="mr-4">
                                                                Room Code
                                                            </div>
                                                            {copyRC && (
                                                                <div className="text-right text-primary bg-gray-800 text-white px-4 py-2 rounded-md absolute z-10 top-12 right-8 mt-4 mr-4 animate-fadeIn">
                                                                    {copyRC} !
                                                                </div>
                                                            )}
                                                        </label>

                                                        <div className="flex items-center justify-between mt-1">
                                                            <span
                                                                ref={
                                                                    roomCodeRef
                                                                }
                                                                className="text-white-900 text-md"
                                                            >
                                                                {
                                                                    match_detail?.match_code
                                                                }
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    copyRoomCode
                                                                }
                                                                className=" bg-purple-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center focus:outline-none focus:shadow-outline"
                                                            >
                                                                <i className="icofont-copy "></i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-center">
                                                        <ShareMatchCode
                                                            open={isShare}
                                                            setOpen={setIsShare}
                                                            matchCode={
                                                                match_detail?.match_code
                                                            }
                                                        />
                                                    </div>
                                                    {/* <div className="single-fild mt-8"></div> */}
                                                    {/* <div className="single-fild mt-8"></div> */}
                                                </form>
                                                <div className="flex flex-col items-center sm:flex-row  mt-4">
                                                    <Button
                                                        path={""}
                                                        // btnType={btnType}
                                                        onClick={() => {
                                                            setIsShare(
                                                                !isShare
                                                            );
                                                        }}
                                                        className="text-white block btn-bg-image-large mr-3 mt-4"
                                                    >
                                                        SHARE
                                                        {/* WITH FRIEND */}
                                                    </Button>

                                                    <Button
                                                        path={""}
                                                        onClick={() => {
                                                            inviteAllFriends();
                                                        }}
                                                        className="text-white block btn-bg-image-large mr-3 mt-4"
                                                    >
                                                        PLAY ONLINE
                                                    </Button>
                                                </div>
                                                <div className="flex  items-center sm:flex-row mt-8">
                                                    <svg
                                                        width="25px"
                                                        height="30px"
                                                        viewBox="0 0 0 24 24"
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
                                                            <path
                                                                d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z"
                                                                stroke="#f2be02"
                                                                stroke-width="2"
                                                            ></path>{" "}
                                                            <path
                                                                d="M12 4V3"
                                                                stroke="#f2be02"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M18 6L19 5"
                                                                stroke="#f2be02"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M20 12H21"
                                                                stroke="#f2be02"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M4 12H3"
                                                                stroke="#f2be02"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M5 5L6 6"
                                                                stroke="#f2be02"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                d="M10 17H14"
                                                                stroke="#f2be02"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>{" "}
                                                            <path
                                                                opacity="0.1"
                                                                d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 13.3613 16.456 14.5955 15.5735 15.4972C15.2297 15.8484 14.9472 16.2663 14.8508 16.7482L14.8004 17H9.19961L9.14923 16.7482C9.05281 16.2663 8.77025 15.8484 8.42651 15.4972C7.54402 14.5955 7 13.3613 7 12Z"
                                                                fill="#f2be02"
                                                            ></path>{" "}
                                                        </g>
                                                    </svg>
                                                    <div
                                                        onClick={() => {
                                                            navigate("/match");
                                                        }}
                                                        className="cursor-pointer text-center items-center "
                                                    >
                                                        Go to
                                                        <span className="text-yellow-200  font-semibold">
                                                            {" "}
                                                            match page{" "}
                                                        </span>
                                                        to view scheduled
                                                        matches.{" "}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    />

                                    <div className="game-all-images my-10">
                                        <Swiper
                                            layout={{
                                                nav: "games-navigation",
                                                dots: "games-dots-style",
                                            }}
                                            navigation={{
                                                nextEl: ".games-slider-button-next",
                                                prevEl: ".games-slider-button-prev",
                                            }}
                                            slidesPerView={1}
                                            spaceBetween={20}
                                        >
                                            {gamedata?.images &&
                                                gamedata?.images?.map(
                                                    (gameThum) => (
                                                        <SwiperSlide
                                                            key={gameThum.alt}
                                                        >
                                                            <img
                                                                className="rounded-lg"
                                                                height={"200px"}
                                                                width={"1200px"}
                                                                src={
                                                                    gameThum.src
                                                                }
                                                                alt="asfdsf"
                                                            />
                                                        </SwiperSlide>
                                                    )
                                                )}
                                        </Swiper>
                                        <div className="z-10 transform pt-12 flex space-x-4">
                                            <div
                                                className="games-slider-button-next swipper-arrow text-white transform w-68 h-55
                                             flex items-center justify-center bg-arrow-shape hover:bg-arrow-hover-shape transition-all bg-cover"
                                            >
                                                <StaticImage
                                                    src="../../data/images/icons/navigation-arrow2.webp"
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className="games-slider-button-prev swipper-arrow text-white 
                                            transform w-68 h-55 flex items-center
                                             justify-center bg-arrow-shape hover:bg-arrow-hover-shape transition-all bg-cover"
                                            >
                                                <StaticImage
                                                    src="../../data/images/icons/navigation-arrow1.webp"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="description mt-6">
                                        <h3 className="font-bold uppercase mb-4">
                                            DESCRIPTION
                                        </h3>
                                        <p className="leading-8">
                                            {gamedata?.content}
                                        </p>
                                    </div>

                                    <div className="content-details">
                                        {gamedata?.quoteText && (
                                            <blockquote className="py-5 mb-5">
                                                <p className="font-bold text-yollow-90 italic text-22base lg:text-28base">
                                                    {gamedata?.quoteText}
                                                </p>
                                            </blockquote>
                                        )}

                                        <div className="additional-information-area bg-secondary-60 px-9 py-9 rounded-2xl mb-9 hidden">
                                            <h3 className="font-bold mb-6">
                                                Additional Information:
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                                                <div className="additional_information_text">
                                                    <h4 className="font-bold mb-5">
                                                        Updated:
                                                    </h4>
                                                    <span>
                                                        {gamedata?.updated ||
                                                            "February 05, 2024"}
                                                    </span>
                                                </div>
                                                <div className="additional_information_text">
                                                    <h4 className="font-bold mb-5">
                                                        SIZE:
                                                    </h4>
                                                    <span>
                                                        {gamedata?.size}
                                                    </span>
                                                </div>
                                                <div className="additional_information_text">
                                                    <h4 className="font-bold mb-5">
                                                        INSTALLS:
                                                    </h4>
                                                    <span>
                                                        {gamedata?.installs}
                                                    </span>
                                                </div>
                                                <div className="additional_information_text">
                                                    <h4 className="font-bold mb-5">
                                                        CURRENT VERSION:
                                                    </h4>
                                                    <span>
                                                        {
                                                            gamedata?.currentVersion
                                                        }
                                                    </span>
                                                </div>
                                                <div className="additional_information_text">
                                                    <h4 className="font-bold mb-5">
                                                        IN-APP PRODUCTS:
                                                    </h4>
                                                    <span>
                                                        {
                                                            gamedata?.inAppProducts
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="mt-14 text-white">
                                        <div className="mb-4">
                                            <h3 className="font-bold">
                                                Comments
                                            </h3>
                                        </div>
                                        <DiscussionEmbed
                                            shortname={disqusShorttname}
                                            config={disquscConfig}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

GameDetails.propTypes = {
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
    query LoginPageQuery {
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
        page(title: { eq: "ProfilePage" }, pageType: { eq: innerpage }) {
            content {
                ...PageContentAll
            }
        }
    }
`;

export default GameDetails;

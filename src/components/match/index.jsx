import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import Video from "@components/shared/video";
import Button from "../shared/button";
import Popup from "../common/Popup";
import { formik, useFormik } from "formik";
import axios from "axios";
import ShareMatchCode from "../share-matchcode";
import KonfehtiService from "../../constants/konfehti-api";
import {
    ADD_MATCH_RESULT,
    ADD_PLAYER,
    SEND_INVITE_NOTIFICATION,
    UPDATE_MATCH,
} from "../../constants/endpoints";
import { showMessage } from "../../utils/toast-message";

// import Button from "../shared/button";
const MatchItem = ({
    isDispute,
    isClaim,
    title,
    registeredTeams,
    date,
    slug,
    player,
    tesmSlug1,
    tesmSlug2,
    video_link,
    teamImage1,
    teamImage2,
    pageDetails,
    setRefresh,
    refresh,
}) => {
    const { playerNumber, status, match_code, entry_amount, match_id } =
        pageDetails;
    console.log(pageDetails, "pageDetails.............");
    console.log(teamImage1, teamImage2, "teamImage1.  teamImage2............");

    // Video Modal Popup
    let video_arr, video_id, video_channel;
    if (video_link) {
        video_arr = video_link.split("=", -1);
        video_id = video_arr[1];
        video_channel = video_link.split(".")[1];
    }

    const [isClaimFiled, setIsClaimFiled] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const [claim_message, setClaim_message] = useState("");
    const [message, setMessage] = useState("");
    const [disputeReason, setDisputeReason] = useState("");
    const [roomCode, setRoomCode] = useState(null);
    const [isShare, setIsShare] = useState(false);
    const [images, setImages] = useState([]);
    const [claimNow, setClaimNow] = useState(false);
    const [disputeNow, setDisputeNow] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [copyRC, setCopyRC] = useState("");
    const roomCodeRef = useRef(null);

    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : null;

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

    // image upoad functions -----------

    const handleImageChange = (e) => {
        if (e.target.files) {
            const selectedFiles = e.target.files;
            const totalImagesCount = images.length + selectedFiles.length;

            // Check if total number of images exceeds 5
            if (totalImagesCount > 5) {
                showMessage("You can only upload up to five images.");
                // Optionally, you can clear the selected files from the input
                // e.target.value = null;
                return;
            }

            const filesArray = Array.from(selectedFiles).map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            });

            Promise.all(filesArray)
                .then((base64Images) => {
                    // Add base64 images to state or perform any further processing
                    console.log(base64Images);
                    setImages((prevImages) => prevImages.concat(base64Images));
                })
                .catch((error) => {
                    console.error("Error converting files to base64:", error);
                    // Handle error if needed
                });
        }
    };

    const renderImages = () => {
        return images.map((image, index) => (
            <div key={index} className="w-16 h-16 relative border rounded">
                <img
                    src={image}
                    alt={`upload-preview ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                />

                <button
                    type="button"
                    className="absolute top-0 right-0 bg-zinc-500 px-2  text-white p-0 rounded-full"
                    onClick={() => removeImage(index)}
                >
                    &times;
                </button>
            </div>
        ));
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    //   -----join with code function
    const joinMatch = (code) => {
        let isAuthAvailable = false;

        let w_amount = 0;
        if (typeof window !== "undefined") {
            isAuthAvailable = JSON.parse(localStorage.getItem("auth"));
            // !== null
            //     ? JSON.parse(localStorage.getItem("auth"))
            //     : false;
            // isAuthAvailable = isAuthAvailable?.isLogin;
            // w_amount = JSON.parse(localStorage.getItem("auth"))?.wallet;
        }
        if (isAuthAvailable) {
            getData(code);
        }
    };

    const getData = async (code) => {
        try {
            const result = await KonfehtiService.post(ADD_PLAYER, {
                match_code: roomCode || code,
                user_id: authData.user_id,
            });
            // console.log("RESULT:", result?.data?.response);
            if (result?.data?.code === 200) {
                showMessage("Match Begin!!");
                if (typeof window !== "undefined") {
                    let data =
                        localStorage.getItem("auth") !== undefined
                            ? JSON.parse(localStorage.getItem("auth"))
                            : {};
                    data.wallet = data.wallet - entry_amount;
                    localStorage.setItem("auth", JSON.stringify(data));
                }
                setRefresh(!refresh);
                var currentURL = window.location.href;

                // Replace the path
                var newPath = `${process.env.GATSBY_WEBSITE_BASE_URL}/match`; // Your new path here

                // Modify the current URL
                var newURL = currentURL.replace(
                    window.location.pathname,
                    newPath
                );

                // Navigate to the new URL
                if (
                    typeof window !== "undefined" &&
                    process.env.GATSBY_IS_MOBILE == "0"
                ) {
                    window.location.href = newURL;
                }

                setRoomCode("");
            }
        } catch (error) {
            console.error("Error:", error);
            setRefresh(!refresh);

            if (error?.response?.data?.message == "Insufficient Funds Fees,") {
                showMessage(
                    "Insufficient balance!! Please add money to your wallet."
                );

                setTimeout(() => {
                    navigate("/wallet");
                }, 3000);
            } else {
                showMessage(error?.response?.data?.message);
            }
        }
    };

    // -----------------handleClaimForm---------------------------------

    const handleClaimForm = async (e, match_id) => {
        e.preventDefault();
        if (images.length < 1) {
            showMessage("Please upload atleast one Screenshot");
            return;
        } else {
            try {
                const result = await KonfehtiService.post(ADD_MATCH_RESULT, {
                    match_id: match_id,
                    user_id: authData.user_id,
                    user_status: "claim",
                    screenshot: [...images],
                    user_remarks: claim_message,
                });
                // console.log("RESULT:", result?.data?.response);
                if (result?.data?.code === 200) {
                    showMessage("Submitted");
                    setClaimNow(false);
                    setRefresh(!refresh);
                }
            } catch (error) {
                console.error("Error:", error);
                if (
                    error?.response?.data?.message == "24 Hours Limit Expired"
                ) {
                    showMessage("Claim Form Time Limit (24 Hours) Expired.");
                    setClaimNow(false);
                    setRefresh(!refresh);
                } else {
                    showMessage(error?.response?.data?.message);
                    setClaimNow(false);
                    setRefresh(!refresh);
                }
            }
        }
    };

    // -----------------handleDisputeForm---------------------------------

    const handleDisputeForm = async (e, match_id) => {
        e.preventDefault();
        if (images.length < 1) {
            showMessage("Please upload atleast one Screenshot");
            return;
        } else {
            try {
                const result = await KonfehtiService.post(ADD_MATCH_RESULT, {
                    match_id: match_id,
                    user_id: authData.user_id,
                    user_status: "disputed",
                    screenshot: [...images],
                    user_remarks: "sdfds",
                });
                // console.log("RESULT:", result?.data?.response);
                if (result?.data?.code === 200) {
                    showMessage("Submitted");
                    setDisputeNow(false);
                    setRefresh(!refresh);
                }
            } catch (error) {
                console.error("Error:", error);
                setDisputeNow(false);
                setRefresh(!refresh);

                if (
                    error?.response?.data?.message == "24 Hours Limit Expired"
                ) {
                    showMessage("Dispute Form Time Limit (24 Hours) Expired.");
                } else {
                    showMessage(error?.response?.data?.message);
                }
            }
        }
    };

    // --------------share otp function-------------

    const shareOtp = () => {};

    const inviteAllFriends = async () => {
        setShowCreateModal(false);
        try {
            const result = await KonfehtiService.post(
                `${SEND_INVITE_NOTIFICATION}?match_id=${pageDetails?.match_id}`
            );
            // console.log("Res:", result);
            showMessage("Invitation sent successfully");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // -----------------cancelMatch------------

    const cancelMatch = async (m_id) => {
        try {
            const result = await KonfehtiService.post(UPDATE_MATCH, {
                match_id: match_id,
                status: "cancelled",
            });
            // console.log("RESULT:", result?.data?.response);
            if (result?.data?.code === 200) {
                showMessage("Your match successfully cancelled");
                setIsCancel(true);
            }
        } catch (error) {
            console.error("Error:", error);
            showMessage(error?.response?.data?.message);
        }
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-4 border-4 border-secondary-90 bg-secondary-100 border-opacity-100 rounded-4xl mb-8 items-center last:mb-0 border-4 border-secondary-90 bg-secondary-100 border-opacity-100 rounded-4xl px-6 py-6 lg:py-10 lg:px-8">
                <div className="col-span-12 md:col-span-3 lg:col-span-4">
                    <div className="lg:inline-block text-center md:text-start">
                        <div className="upcoming_gaming_text text-white grid grid-cols-6 flex justify-center md:justify-start items-center">
                            <p className="text-xs md:text-base col-span-6">
                                {date}
                            </p>

                            <h3 className="font-bold text-base lg:text-35base mb-3 uppercase col-span-6">
                                <Link
                                    to={`/match/${slug}`}
                                    className="hover:text-primary"
                                    replace={true}
                                    state={{ details: pageDetails }}
                                >
                                    {title || "hjsfdjsfb"}
                                </Link>
                            </h3>
                            <p className="text-primary md:mb-8 col-span-6">
                                {registeredTeams}{" "}
                                {registeredTeams > 1 ? "players" : "player"}
                            </p>
                            <span
                                className="font-bold md:mt-3 col-span-6"
                                style={{ fontSize: "20px" }}
                            >
                                <span className="text-yellow-200  font-semibold">
                                    {" "}
                                    WINNING PRIZE{" "}
                                </span>{" "}
                                : ${pageDetails.winning_prize}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-5">
                    <div className="grid grid-cols-12">
                        <div className="col-span-4 md:col-span-5 text-end flex justify-end items-center">
                            {teamImage1?.childImageSharp.gatsbyImageData.images
                                .fallback.src ? (
                                <GatsbyImage
                                    className="object-cover  rounded-full h-[80px] w-[80px] md:h-[120px] md:w-[120px] lg:h-[150px] lg:w-[150px]"
                                    image={getImage(teamImage1)}
                                    alt=""
                                />
                            ) : (
                                <StaticImage
                                    className="object-cover  rounded-full h-[80px] w-[80px] md:h-[120px] md:w-[120px] lg:h-[150px] lg:w-[150px]"
                                    src="../../data/images/others/profile.png"
                                    alt=""
                                />
                            )}
                        </div>
                        <div className="col-span-4 md:col-span-2 text-center flex justify-center items-center">
                            <div className="my-auto mx-2 h-[50px] w-[50px] md:h-[60px] md:w-[60px] lg:h-[70px] lg:w-[70px]">
                                <StaticImage
                                    src="../../data/images/team-logo/game-vs1.webp"
                                    alt=""
                                    className="object-cover "
                                />
                            </div>
                        </div>
                        <div className="col-span-4 md:col-span-5 text-start flex justify-start items-center">
                            {teamImage2 ? (
                                <GatsbyImage
                                    className="object-cover  rounded-full h-[80px] w-[80px] md:h-[120px] md:w-[120px] lg:h-[150px] lg:w-[150px]"
                                    image={getImage(teamImage2)}
                                    alt=""
                                />
                            ) : (
                                <StaticImage
                                    className="object-cover  rounded-full h-[80px] w-[80px] md:h-[120px] md:w-[120px] lg:h-[150px] lg:w-[150px]"
                                    src="../../data/images/question-mark.jpg"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className=" col-span-12 md:col-span-3 lg:col-span-3 upcoming_play_video">
                    <div className="justify-center mb-6 lg:mb-0 text-center upcoming_play_video">
                        {authData?.user_id == pageDetails.Player[0].user_id &&
                        playerNumber == 1 &&
                        authData.isLogin ? (
                            <>
                                {isCancel ? (
                                    <h3>Cancelled</h3>
                                ) : (
                                    <div>
                                        {" "}
                                        <Button
                                            path={""}
                                            // btnType={btnType}
                                            onClick={() => {
                                                if (authData.isLogin) {
                                                    setShowCreateModal(true);
                                                } else {
                                                    navigate("/login");
                                                }
                                            }}
                                            shape="square2xl"
                                            className="text-white btn-bg-image mt-6 m-1"
                                        >
                                            INVITE
                                        </Button>
                                        {authData.isLogin &&
                                            playerNumber == 1 &&
                                            status == "created" && (
                                                <Button
                                                    path={""}
                                                    // btnType={btnType}
                                                    onClick={() => {
                                                        cancelMatch();
                                                    }}
                                                    shape="square2xl"
                                                    className="text-white btn-bg-image mt-6 m-1"
                                                >
                                                    CANCEL
                                                </Button>
                                            )}{" "}
                                    </div>
                                )}

                                <Popup
                                    btnType={"submit"}
                                    open={showCreateModal}
                                    setOpen={setShowCreateModal}
                                    modalTitle={"ROOM CODE"}
                                    body={
                                        <>
                                            <div className="mb-2 text-left">
                                                Share this room code with
                                                friends and ask them to join.
                                            </div>

                                            <form
                                            // onSubmit={
                                            //     formik.handleSubmit
                                            // }
                                            >
                                                <div class="p-4 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
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
                                                            ref={roomCodeRef}
                                                            className="text-white-900 text-md"
                                                        >
                                                            {match_code}
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

                                                <ShareMatchCode
                                                    open={isShare}
                                                    setOpen={setIsShare}
                                                    matchCode={match_code}
                                                />
                                                <div className="single-fild mt-8"></div>
                                                <div className="single-fild mt-8"></div>
                                            </form>
                                            <div className="flex flex-col items-center sm:flex-row mt-8">
                                                <Button
                                                    path={""}
                                                    // btnType={btnType}
                                                    onClick={() => {
                                                        setIsShare(!isShare);
                                                    }}
                                                    className="text-white block btn-bg-image-large mr-3 mt-8"
                                                >
                                                    SHARE
                                                    {/* WITH FRIEND */}
                                                </Button>

                                                <Button
                                                    path={""}
                                                    onClick={() => {
                                                        inviteAllFriends();
                                                    }}
                                                    className="text-white block btn-bg-image-large mr-3 mt-8"
                                                >
                                                    PLAY ONLINE
                                                </Button>
                                            </div>
                                        </>
                                    }
                                />
                            </>
                        ) : authData?.user_id !=
                              pageDetails.Player[0].user_id &&
                          playerNumber == 1 ? (
                            <>
                                <div>
                                    <span
                                        className="font-bold md:mt-3 col-span-6"
                                        style={{ fontSize: "20px" }}
                                    >
                                        <span className="text-yellow-200  font-semibold">
                                            {" "}
                                            JOINING FEE{" "}
                                        </span>{" "}
                                        : ${pageDetails.winning_prize}
                                    </span>
                                </div>
                                <Button
                                    btnType={"button"}
                                    onClick={() => {
                                        if (authData.isLogin) {
                                            setShowModal(true);
                                        } else {
                                            navigate("/login");
                                        }
                                    }}
                                    shape="square2xl"
                                    className="text-white btn-bg-image mt-6"
                                >
                                    JOIN
                                </Button>
                                <Popup
                                    btnType={"submit"}
                                    open={showModal}
                                    setOpen={setShowModal}
                                    modalTitle={"ENTER THE MATCH CODE"}
                                    body={
                                        <>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    joinMatch();
                                                }}
                                            >
                                                <div className="single-fild mt-6">
                                                    <input
                                                        required
                                                        type="text"
                                                        className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                                                        placeholder="Enter the Game Invite Code."
                                                        style={{
                                                            color: "white",
                                                            fontSize: "18px",
                                                            textAlign: "center",
                                                        }}
                                                        name="roomCode"
                                                        value={roomCode}
                                                        onChange={(e) => {
                                                            setRoomCode(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                    <Button
                                                        // disabled={!roomCode}
                                                        // path={""}
                                                        type="submit"
                                                        // onClick={() => joinMatch()}
                                                        className="text-white block btn-bg-image-large  mt-8"
                                                    >
                                                        JOIN ROOM
                                                    </Button>
                                                </div>
                                            </form>
                                        </>
                                    }
                                />
                            </>
                        ) : playerNumber == 2 &&
                          pageDetails.status == "ongoing" &&
                          authData.isLogin &&
                          (pageDetails?.Player[0].user_id == authData.user_id ||
                              pageDetails?.Player[1].user_id ==
                                  authData.user_id) ? (
                            <>
                                <Button
                                    btnType={"button"}
                                    onClick={() => {
                                        if (authData.isLogin) {
                                            setClaimNow(true);
                                        } else {
                                            navigate("/login");
                                        }
                                    }}
                                    shape="square2xl"
                                    className="text-white btn-bg-image mt-6"
                                >
                                    CLAIM NOW
                                </Button>
                                <Popup
                                    btnType={"submit"}
                                    open={claimNow}
                                    setOpen={setClaimNow}
                                    modalTitle={"CLAIM FORM"}
                                    body={
                                        <>
                                            <form
                                                onSubmit={(e) =>
                                                    handleClaimForm(
                                                        e,
                                                        pageDetails?.match_id
                                                    )
                                                }
                                            >
                                                <textarea
                                                    name="userId"
                                                    className={`px-6  py-2 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                                                    placeholder="Enter your message  here..."
                                                    style={{
                                                        color: "white",
                                                        height: "100px", // Customize this value as needed.
                                                    }}
                                                    value={claim_message}
                                                    onChange={(e) =>
                                                        setClaim_message(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <div className=" flex items-center mt-6 justify-center w-full m-auto flex-col">
                                                    <label
                                                        htmlFor="dropzone-file"
                                                        className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-purple-900 dark:bg-transparent"
                                                    >
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            {/* SVG and text here remain the same */}
                                                            <svg
                                                                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 20 16"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                />
                                                            </svg>
                                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span class="font-semibold">
                                                                    Click to
                                                                    upload
                                                                </span>{" "}
                                                                or drag and drop
                                                            </p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                                You can only
                                                                upload up to
                                                                five images.
                                                            </p>
                                                        </div>
                                                        <input
                                                            id="dropzone-file"
                                                            type="file"
                                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                                            multiple
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                        />
                                                    </label>
                                                    <div className="flex flex-wrap mt-4 gap-4 justify-center w-full">
                                                        {renderImages()}
                                                    </div>
                                                </div>
                                                <Button
                                                    // disabled={
                                                    //     claim_message !== "" &&
                                                    //     images.length < 1
                                                    //         ? true
                                                    //         : false
                                                    // }
                                                    type="submit"
                                                    // path={""}
                                                    // onClick={() => {
                                                    //     handleClaimForm(
                                                    //         pageDetails?.match_id
                                                    //     );
                                                    //     // showMwssage(
                                                    //     //     "Your form submitted successfully"
                                                    //     // );
                                                    // }}
                                                    className="text-white block btn-bg-image-large mr-3 mt-8"
                                                    // disabled={images.length < 1}
                                                >
                                                    Submit
                                                </Button>
                                            </form>
                                        </>
                                    }
                                />
                            </>
                        ) : playerNumber == 2 &&
                          pageDetails.status == "pending_approval" &&
                          pageDetails.is_disputed == 0 &&
                          pageDetails?.MatchResult?.user_id !=
                              authData.user_id &&
                          authData.isLogin &&
                          (pageDetails?.Player[0].user_id == authData.user_id ||
                              pageDetails?.Player[1].user_id ==
                                  authData.user_id) ? (
                            <>
                                <Button
                                    btnType={"button"}
                                    onClick={() => {
                                        if (authData.isLogin) {
                                            setDisputeNow(true);
                                        } else {
                                            navigate("/login");
                                        }
                                    }}
                                    shape="square2xl"
                                    className="text-white btn-bg-image mt-6"
                                >
                                    DISPUTE NOW
                                </Button>
                                <Popup
                                    open={disputeNow}
                                    setOpen={setDisputeNow}
                                    modalTitle={"DISPUTE FORM"}
                                    body={
                                        <>
                                            <form
                                                onSubmit={(e) =>
                                                    handleDisputeForm(
                                                        e,
                                                        pageDetails?.match_id
                                                    )
                                                }
                                            >
                                                <textarea
                                                    name="userId"
                                                    className={`px-6  py-2 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                                                    placeholder="Enter your dispute reason here..."
                                                    style={{
                                                        color: "white",
                                                        height: "100px", // Customize this value as needed.
                                                    }}
                                                    value={message}
                                                    onChange={(e) =>
                                                        setMessage(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <div className=" flex items-center mt-6 justify-center w-full m-auto flex-col">
                                                    <label
                                                        htmlFor="dropzone-file"
                                                        className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-purple-900 dark:bg-transparent"
                                                    >
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            {/* SVG and text here remain the same */}
                                                            <svg
                                                                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 20 16"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                />
                                                            </svg>
                                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span class="font-semibold">
                                                                    Click to
                                                                    upload
                                                                </span>{" "}
                                                                or drag and drop
                                                            </p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                                SVG, PNG, JPG or
                                                                GIF (MAX.
                                                                800x400px)
                                                            </p>
                                                        </div>
                                                        <input
                                                            id="dropzone-file"
                                                            type="file"
                                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                                            multiple
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                        />
                                                    </label>
                                                    <div className="flex flex-wrap mt-4 gap-4 justify-center w-full">
                                                        {renderImages()}
                                                    </div>
                                                </div>
                                                <Button
                                                    className="text-white block btn-bg-image-large mr-3 mt-8"
                                                    // disabled={
                                                    //     message !== "" &&
                                                    //     images.length < 1
                                                    //         ? true
                                                    //         : false
                                                    // }
                                                    type="submit"
                                                >
                                                    Submit
                                                </Button>
                                            </form>
                                        </>
                                    }
                                />
                            </>
                        ) : pageDetails.status == "completed" ? (
                            <div>completed</div>
                        ) : authData.isLogin ? (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsClaimFiled(true);
                                    }}
                                    shape="square2xl"
                                    className="text-white btn-bg-image my-4"
                                >
                                    Claim Filed
                                </Button>
                                <h3>Waiting...</h3>
                                <h5>Result declaration is under process.</h5>

                                <Popup
                                    btnType={"submit"}
                                    open={isClaimFiled}
                                    setOpen={setIsClaimFiled}
                                    modalTitle={"CLAIM FILED!"}
                                    body={
                                        <>
                                            <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                                <div class="flex items-center mt-1">
                                                    {/* <!-- Fixed width for step indicator --> */}

                                                    {/* <!-- Content takes the remaining space --> */}
                                                    <span class="flex-grow">
                                                        This match has been
                                                        claimed by player and
                                                        result will declare
                                                        after admin's
                                                        confirmation. you can
                                                        fill dispute form within
                                                        24 hours then admin will
                                                        decide the actual winner
                                                        of this match on the
                                                        behalf of give proofs.
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-center align-center"></div>

                                            <div className="single-fild mt-8"></div>
                                            <div className="single-fild mt-8"></div>
                                            <div className="flex flex-col items-center sm:flex-row mt-8"></div>
                                        </>
                                    }
                                />
                            </>
                        ) : (
                            <Button
                                btnType={"button"}
                                onClick={() => {
                                    if (authData.isLogin) {
                                        setShowModal(true);
                                    } else {
                                        navigate("/login");
                                    }
                                }}
                                shape="square2xl"
                                className="text-white btn-bg-image mt-6"
                            >
                                JOIN
                            </Button>
                        )}
                    </div>
                    <div className="text-center mt-8">
                        {"Created" + " by " + pageDetails?.Player[0].name}
                        {/* {status == "created" ?  "Created" +" by "+ pageDetails?.Player[0].name:
             status == "pending_approval" ? "Result declaration pending.": status } */}
                    </div>
                </div>
            </div>

            <Video
                channel={video_channel}
                videoId={video_id}
                isOpen={isOpen}
                setOpen={setOpen}
            />
        </>
    );
};
MatchItem.propTypes = {
    title: PropTypes.string,
    registeredTeams: PropTypes.string,
    date: PropTypes.string,
    slug: PropTypes.string,
    tesmSlug1: PropTypes.string,
    tesmSlug2: PropTypes.string,
    video_link: PropTypes.string,
    teamImage1: PropTypes.object,
    teamImage2: PropTypes.object,
};
export default MatchItem;

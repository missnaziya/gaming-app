import React, { Fragment, useState } from "react";
import { Link } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import Video from "@components/shared/video";
const MatchHistoryItem = ({
    title,
    registeredTeams,
    date,
    slug,
    tesmSlug1,
    tesmSlug2,
    video_link,
    teamImage1,
    teamImage2,
    pageDetails,
}) => {
    console.log(pageDetails, "match history ");
    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : null;
    // Video Modal Popup
    let video_arr, video_id, video_channel;
    if (video_link) {
        video_arr = video_link.split("=", -1);
        video_id = video_arr[1];
        video_channel = video_link.split(".")[1];
    }
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Fragment>
                <div className="flex flex-col lg:flex-row  mb-8 items-center last:mb-0 border-4 border-secondary-90 bg-secondary-100 border-opacity-100 rounded-4xl px-6 py-8 lg:py-16 lg:px-8">
                    <div className="md:w-2/5 text-center lg:text-left mb-6 lg:mb-0 upcoming_gaming_list">
                        <div className="upcoming_gaming_text text-white">
                            <p>{date}</p>
                            <h3 className="font-bold lg:text-35base mb-3 uppercase">
                                <Link
                                    // to={`/match/${slug}`}
                                    className="hover:text-primary"
                                    replace={true}
                                    state={{ details: pageDetails }}
                                >
                                    {pageDetails.Game.name}
                                </Link>
                            </h3>
                            <span className="text-primary">
                                {registeredTeams} Players
                            </span>
                        </div>
                    </div>
                    {/* <div className="flex-shrink-0 lg:w-52 justify-center mb-6 lg:mb-0 text-center upcoming_play_video">
                    <span
                        className="video_popup w-28 h-28 bg-primary rounded-full flex items-center justify-center mx-auto"
                        role="button"
                        tabIndex="0"
                        onClick={() => setOpen(true)}
                        onKeyPress={(e) => console.log(e)}
                    >
                        <StaticImage
                            src="../../data/images/icons/play-btn2.webp"
                            alt=""
                        />
                    </span>{" "}
                    <span className="text-secondary block mt-4 lg:mt-8">
                        Youtube Stream
                    </span>
                </div> */}

                    <div
                        className="w-50 flex ml-0 md:ml-[100px] flex-row md:flex-row justify-center items-center lg:justify-between  upcoming_gaming_thumb"
                        // style={{ marginLeft: "100px" }}
                    >
                        <Link
                            to={`/bettle-teams/${tesmSlug1}`}
                            className="mx-1.5 "
                            // style={{position:"relative"}}
                        >
                            <div
                                className="flex justify-center"
                                style={{ width: "120px", height: "40px" }}
                            >
                                <StaticImage
                                    className=" object-cover align-middle m-auto"
                                    src="../../data/images/crown.png"
                                    // alt="abc"

                                    style={{
                                        height: "20px",
                                        width: "50px",
                                        // transform: "rotate(-29deg)",
                                        zIndex: 9,
                                        margin: "auto",
                                        alignItems: "center",
                                        // marginTop: "27px",
                                        // marginLeft: "-26px",
                                    }}
                                />
                            </div>
                            <div
                                className="flex justify-center"
                                style={{ width: "120px", height: "40px" }}
                            >
                                <StaticImage
                                    className=" object-cover align-middle m-auto"
                                    src="../../data/images/game-players/player-2.webp"
                                    // alt="abc"

                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        // transform: "rotate(-29deg)",
                                        // zIndex: 9,
                                        margin: "auto",
                                        alignItems: "center",
                                        // marginTop: "27px",
                                        // marginLeft: "-26px",
                                    }}
                                />
                            </div>

                            {/* <img
                                    className="align-middle m-auto "
                                    // src={defautImage}
                                    src={`${process.env.GATSBY_IMAGE_BASE_URL}${pageDetails.Player[pageDetails?.MatchResult?.user_id !== pageDetails?.Player[0].user_id ? 0:1].image_path}`}
                                    alt="winner"
                                    style={{ height: "50px", width: "50px" }}

                                /> */}
                            {/* <StaticImage
                                src=""
                                alt="abc"
                                style={{ height: "150px", width: "150px" }}
                            /> */}

                            <div className="text-center  mt-2.5">
                                {/* <span className="text-primary text-center"> */}
                                <div className="text-center  mt-2.5">
                                    <span className="text-lime-600 font-bold text-[24px] text-center">
                                        Winner
                                    </span>
                                </div>
                                {/* </span> */}
                            </div>
                        </Link>
                        {/* <div className="mx-1.5 " > */}
                        <StaticImage
                            className="object-cover "
                            src="../../data/images/team-logo/game-vs1.webp"
                            alt=""
                            style={{
                                height: "50px",
                                width: "50px",
                                margin: "20px",
                            }}
                        />
                        {/* </div> */}

                        <Link
                            to={`/bettle-teams/${tesmSlug1}`}
                            className="mx-1.5"
                        >
                            <div
                                className="flex justify-center"
                                style={{ width: "120px", height: "40px" }}
                            >
                                {/* <StaticImage
                                    src="../../data/images/crow.png"
                                    // alt="abc"

                                    style={{ height: "50px", width: "100px" }}
                                /> */}
                            </div>

                            {/* <img
                                    className="align-middle m-auto "
                                    // src={defautImage}
                                    src={`${process.env.GATSBY_IMAGE_BASE_URL}${pageDetails.Player[pageDetails?.MatchResult?.user_id === pageDetails?.Player[0].user_id ? 0:1 ].image_path}`}
                                    alt="winner"
                                    style={{ height: "50px", width: "50px" }}

                                /> */}
                            <div
                                className="flex justify-center"
                                style={{ width: "120px", height: "40px" }}
                            >
                                <StaticImage
                                    className="object-cover align-middle m-auto"
                                    src="../../data/images/game-players/player-3.webp"
                                    // alt="abc"

                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        // transform: "rotate(-29deg)",
                                        // zIndex: 9,
                                        margin: "auto",
                                        alignItems: "center",
                                        // marginTop: "27px",
                                        // marginLeft: "-26px",
                                    }}
                                />
                            </div>
                            <div className="text-center  mt-2.5">
                                <span className=" font-bold text-[24px] text-red-800 text-center">
                                    Loser
                                </span>
                            </div>
                        </Link>
                        {/* {teamImage2 ? (
                        <Link
                            to={`/bettle-teams/${tesmSlug2}`}
                            className="mx-1.5"
                        >
                            <GatsbyImage
                                className="md:h-auto"
                                image={
                                    getImage(teamImage2) || getImage(teamImage1)
                                }
                                alt=""
                            />
                        </Link>
                    ) : (
                        <StaticImage
                            src="../../data/images/question-mark.jpg"
                            alt=""
                            style={{ height: "119px", width: "102px" }}
                        />
                    )} */}
                    </div>
                    <span
                        className="font-bold md:mt-3 mt-2 col-span-6"
                        style={{ fontSize: "30px" }}
                    >
                        <span className="text-yellow-100  font-semibold">
                            {" "}
                            Winner got{" "}
                        </span>{" "}
                        :
                        <span className="text-lime-600 font-bold text-[32px] text-center">
                            {" "}
                            ${pageDetails.winning_prize}
                        </span>
                    </span>
                </div>
                <Video
                    channel={video_channel}
                    videoId={video_id}
                    isOpen={isOpen}
                    setOpen={setOpen}
                />
            </Fragment>
        </>
    );
};
MatchHistoryItem.propTypes = {
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
export default MatchHistoryItem;

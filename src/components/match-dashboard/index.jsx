import React, { Fragment, useEffect, useState } from "react";
import { Link } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import Video from "@components/shared/video";
import axios from "axios";
import Button from "../shared/button";
import { getFormattedDate } from "../../utils/functions.js";
import KonfehtiService from "../../constants/konfehti-api";
import { GET_MATCHES } from "../../constants/endpoints";
const MatchDashboard = ({
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
}) => {
    // Video Modal Popup
    let video_arr, video_id, video_channel;
    if (video_link) {
        video_arr = video_link.split("=", -1);
        video_id = video_arr[1];
        video_channel = video_link.split(".")[1];
    }
    const [isOpen, setOpen] = useState(false);
    const [matchCount, setMatchCount] = useState(2);
    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : {};

    const [liveMatchList, setLiveMatchList] = useState(null);
    const getMatches = async () => {
        try {
            const result = await KonfehtiService.post(`${GET_MATCHES}`);
            // console.log("RESULT:", result?.data?.response);
            if (result?.data?.code === 200) {
                console.log(result.data.response, "result>>>>");
                // Filter for ongoing matches
                const ongoingMatches = result.data.response.filter(
                    (match) => match.status === "ongoing"
                );

                // Check if there are any ongoing matches before setting
                if (ongoingMatches.length > 0) {
                    setLiveMatchList(ongoingMatches); // Use the correct function name here
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <>
            <Fragment>
                <div className="container px-4 ">
                    <h1 className="font-bold text-white mb-4 text-center mt-8">
                        {" "}
                        Live Matches{" "}
                    </h1>
                </div>
                <div className="container ">
                    {liveMatchList ? (
                        liveMatchList
                            ?.slice(0, matchCount)
                            .map((match, index) => (
                                <>
                                    <div
                                        key={index}
                                        className="container flex flex-col lg:flex-row lg:justify-between mb-8 items-center last:mb-0 border-4 border-secondary-90 bg-secondary-100 border-opacity-100 rounded-4xl px-6 py-8 lg:py-16 lg:px-8"
                                    >
                                        <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0 upcoming_gaming_list">
                                            <div className="upcoming_gaming_text">
                                                <p>
                                                    {getFormattedDate(
                                                        match.schedule_date
                                                    )}
                                                </p>
                                                <h3 className="font-bold lg:text-35base mb-3 uppercase">
                                                    <Link
                                                        // to={`/match/${match.slug}`}
                                                        className="hover:text-primary"
                                                        // replace={true}
                                                        // state={{ details: match.pageDetails }}
                                                    >
                                                        {match?.Game?.name}
                                                    </Link>
                                                </h3>
                                                <span className="text-primary mb-8">
                                                    {match.Player.length} player
                                                </span>
                                                <div
                                                    style={{
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <span
                                                        className=" font-bold mt-3"
                                                        style={{
                                                            fontSize: "20px",
                                                        }}
                                                    >
                                                        WINNING PRIZE: $
                                                        {match.winning_prize}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col text-center lg:text-left mb-6 lg:mb-0 upcoming_gaming_list statusAnimation">
                                            <div class=" container max-w-[210px]">
                                                <div class="ring"></div>
                                                <div class="ring"></div>
                                                <div class="ring"></div>
                                                <h3>Live</h3>
                                            </div>
                                            <div className=""></div>
                                        </div>
                                        <div className="flex-1 flex flex-row md:flex-row justify-center items-center lg:justify-between lg:max-w-sm upcoming_gaming_thumb">
                                            {/* <Link
                                        to={`/bettle-teams/${match.tesmSlug1}`}
                                        className="mx-1.5"
                                    > */}
                                            {match?.Player[0]?.image_path !=
                                            null ? (
                                                <img
                                                    className="md:h-auto rounded-full object-cover "
                                                    src={`${process.env.GATSBY_IMAGE_BASE_URL}${match.Player[0].image_path}`}
                                                    alt=""
                                                    style={{
                                                        width: "80px",
                                                        height: "80px",
                                                    }}
                                                />
                                            ) : (
                                                <StaticImage
                                                    className="object-cover  rounded-full h-[80px] w-[80px] md:h-[120px] md:w-[120px] lg:h-[150px] lg:w-[150px]"
                                                    src="../../data/images/others/profile.png"
                                                    alt=""
                                                />
                                            )}
                                            {/* <img
                                                className="md:h-auto rounded-full"
                                                src={`${process.env.GATSBY_IMAGE_BASE_URL}${match.Player[0].image_path}`}
                                                alt=""
                                                style={{
                                                    width: "130px",
                                                    height: "130px",
                                                }}
                                            /> */}
                                            {/* </Link> */}
                                            <div className="mx-2 my-2 h-[44px] w-[44px]">
                                                <StaticImage
                                                    className="object-cover "
                                                    src="../../data/images/team-logo/game-vs1.webp"
                                                    alt=""
                                                />
                                            </div>
                                            <img
                                                className="md:h-auto rounded-full object-cover "
                                                src={`${process.env.GATSBY_IMAGE_BASE_URL}${match?.Player[1]?.image_path}`}
                                                alt=""
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                }}
                                            />
                                            {/* {match.teamImage2 ? (
                                        <Link
                                            to={`/bettle-teams/${match.tesmSlug2}`}
                                            className="mx-1.5"
                                        > */}
                                            {/* <GatsbyImage
                                                className="md:h-auto rounded-full"
                                                image={
                                                    getImage(
                                                        match.teamImage2
                                                    ) ||
                                                    getImage(match.Player[0].image_path)
                                                }
                                                alt=""
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                }}
                                            /> */}
                                            {/* </Link>
                                    ) : (
                                        <StaticImage
                                            className="rounded-full"
                                            src="../../data/images/question-mark.jpg"
                                            alt=""
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                            }}
                                        />
                                    )} */}
                                        </div>
                                    </div>
                                </>
                            ))
                    ) : (
                        <div className="container">
                            <h2 className="mt-8 text-center">
                                Ooops!!! No Live match
                            </h2>
                        </div>
                    )}
                    {liveMatchList?.length > 2 &&
                        liveMatchList?.length > matchCount && (
                            <div className="flex justify-center ">
                                <Button
                                    className="text-white btn-bg-image-large"
                                    onClick={() =>
                                        setMatchCount(matchCount + 5)
                                    }
                                >
                                    VIEW MORE
                                    <StaticImage
                                        className="align-middle ml-3 transition-all group-hover:ml-5 rotate-90"
                                        src="../../data/images/icons/navigation-arrow1.webp"
                                        alt=""
                                    />
                                </Button>
                            </div>
                        )}
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
MatchDashboard.propTypes = {
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
export default MatchDashboard;

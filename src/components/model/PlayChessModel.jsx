import React, { useEffect, useState } from "react";
import { LichessServiceLoaderless } from "../../constants/lichess-api";
import {
    CHESS_USER_NAME,
    CREATE_A_CHALLENGE,
    GET_GAMES_OF_A_USER,
    GET_MY_ONGOING_MATCHES,
    OPEN_ENDED_CHALLENGE,
} from "../../constants/endpoints";
import axios from "axios";
import { NdJson } from "json-nd";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { getFormattedDate } from "../../utils/functions";

export default function PlayChessModel({ open, handleClose }) {
    const [active, setActive] = useState("invitationform");
    const [chessInvitationResponse, setChessInvitationResponse] =
        useState(null);
    const [copyLinkButtons, setCopyLinkButtons] = useState({
        black: false,
        blackJoiningLink: "",
        white: false,
        whiteJoiningLink: "",
    });
    const [matches, setMatches] = useState({
        activeMatches: [],
        pastMatches: [],
    });

    const [activeTab, setActiveTab] = useState("active-matches");

    const cancelTokenSource = axios.CancelToken.source();
    LichessServiceLoaderless.defaults.cancelToken = cancelTokenSource.token;

    const sendChessGameInvite = async (e) => {
        e.preventDefault();
        try {
            const formData1 = new FormData(e.target);
            const userName = formData1.get("userName");

            const formData2 = new URLSearchParams();
            formData2.append("rated", false);
            formData2.append("clock.limit", 300);
            formData2.append("clock.increment", 1);
            formData2.append("days", 1);
            formData2.append("color", "random");
            formData2.append("variant", "standard");
            formData2.append(
                "fen",
                "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            );
            formData2.append("keepAliveStream", true);
            formData2.append("rules", "noAbort");

            setActive("pending-invitation");

            const response = await LichessServiceLoaderless.post(
                `${CREATE_A_CHALLENGE}/${userName}`,
                formData2,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            if (response.status === 200) {
                if (response.data) {
                    const parsedData = NdJson.parse(response.data);
                    setChessInvitationResponse((prev) => parsedData);
                    setActive("invitation-accepted");
                }
                e.target.reset();
            }
        } catch (error) {
            setActive("invitationform");
            console.log("Error::", error);
        }
    };

    // Function to cancel the ongoing request
    const cancelSendChessGameInvite = async () => {
        try {
            // cancelTokenSource.cancel("Operation canceled by the user.");
        } catch (error) {
            console.log("Error:::", error);
        }
    };

    const handleJoinMatch = (gameLink) => {
        window.open(gameLink, "__blank");
    };

    const handleCreateOpenChallenge = async (e) => {
        e.preventDefault();
        try {
            const formData1 = new FormData(e.target);
            const gameName = formData1.get("game_name");

            const formData = new URLSearchParams();
            formData.append("rated", false);
            formData.append("clock.limit", 300);
            formData.append("clock.increment", 1);
            formData.append("days", 1);
            formData.append("variant", "standard");
            formData.append(
                "fen",
                "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            );
            formData.append("name", gameName);
            // formData.append("rules", "noAbort");
            // formData.append("users", "Team A, Team B");
            // formData.append("expiresAt", 36000);
            const response = await LichessServiceLoaderless.post(
                OPEN_ENDED_CHALLENGE,
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            if (response.status === 200) {
                setCopyLinkButtons((prev) => ({
                    ...prev,
                    black: true,
                    blackJoiningLink: response?.data?.urlBlack,
                    white: true,
                    whiteJoiningLink: response?.data?.urlWhite,
                }));
                e.target.reset();
            }
        } catch (error) {
            console.log("Error::", error);
        }
    };

    const handleCopy = (content, message) => {
        copy(content);
        toast(message);
    };

    const handleActiveTab = (tab) => {
        setActiveTab((prev) => tab);
    };

    const getActiveMatches = async () => {
        try {
            const response = await LichessServiceLoaderless.get(
                `${GET_MY_ONGOING_MATCHES}`,
                { params: { nb: 100 } }
            );
            if (response.status === 200) {
                const structuredActiveMatches = response?.data?.nowPlaying.map(
                    (match) => ({
                        name: match?.variant?.name,
                        status: match?.status?.name,
                        link: `${process.env.GATSBY_CHESS_APP_BASE_URL}/${match.gameId}`,
                    })
                );
                setMatches((prev) => ({
                    ...prev,
                    activeMatches: structuredActiveMatches,
                }));
            }
        } catch (error) {
            console.log("Error::", error);
        }
    };

    const getPastMatches = async () => {
        try {
            const response = await LichessServiceLoaderless.get(
                `${GET_GAMES_OF_A_USER}/${CHESS_USER_NAME}`,
                {
                    headers: {
                        Accept: "application/x-ndjson",
                    },
                }
            );
            if (response.status === 200) {
                const parsedData = NdJson.parse(response.data);
                const structuredPastMatches = parsedData?.map((match) => ({
                    created: match?.createdAt,
                    status: match?.status,
                    winner: match?.winner
                        ? match?.players[match?.winner]?.user?.name
                        : "No Winner",
                }));
                setMatches((prev) => ({
                    ...prev,
                    pastMatches: structuredPastMatches,
                }));
            }
        } catch (error) {
            console.log("Error::", error);
        }
    };

    useEffect(() => {
        getActiveMatches();
        getPastMatches();
    }, []);

    return (
        <div
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            className={`${
                open ? "fixed" : "hidden"
            } overflow-y-auto overflow-x-hidden top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50`}
        >
            <div className="relative p-4 w-full max-w-md max-h-full border-5 border-danger overflow-y-auto h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {active === "pending-invitation" && false && (
                        <>
                            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                                Waiting for the opponent to join
                            </h4>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 mx-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => cancelSendChessGameInvite}
                            >
                                Cancel
                            </button>
                        </>
                    )}

                    {active === "invitationform" && (
                        <>
                            <div className="flex items-center justify-between p-4 md:p-5 border-b">
                                <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                    Create Challenge
                                </h6>
                                <button
                                    type="button"
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="authentication-modal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                        onClick={() => handleClose(false)}
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {false && (
                                <div className="p-4 md:p-5">
                                    <form
                                        className="space-y-2 border-5 border-gray-50 rounded-sm"
                                        onSubmit={(e) => sendChessGameInvite(e)}
                                    >
                                        <div>
                                            <label
                                                for="username"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Invite a friend
                                            </label>
                                            <input
                                                type="text"
                                                name="userName"
                                                id="username"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="Enter username"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <button
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() =>
                                                    handleClose(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="text-white bg-blue-700 mx-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() =>
                                                    sendChessGameInvite()
                                                }
                                            >
                                                Send Invite
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            <div className="p-4 md:p-5">
                                <form
                                    onSubmit={(e) =>
                                        handleCreateOpenChallenge(e)
                                    }
                                    className="space-y-4 border-5 border-gray-50 rounded-sm"
                                >
                                    <label
                                        for="game_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Create an open challenge
                                    </label>
                                    <input
                                        type="text"
                                        name="gameName"
                                        id="game_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Please mention a challenge name"
                                        required
                                    />
                                    <button
                                        id="open_challenge_button"
                                        type="submit"
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            className="me-1 -ms-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        Create an open challenge
                                    </button>
                                </form>

                                {copyLinkButtons.black &&
                                    copyLinkButtons.white && (
                                        <div className="pt-3">
                                            <button
                                                onClick={() =>
                                                    handleCopy(
                                                        copyLinkButtons?.blackJoiningLink,
                                                        `Link copied, please share it with the team 'Black'`
                                                    )
                                                }
                                                className="text-white bg-black hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark-600 dark:hover:bg-grey-700 dark:focus:ring-grey-800"
                                            >
                                                Black Team
                                            </button>
                                            {/* <button
                                                onClick={() =>
                                                    handleCopy(
                                                        copyLinkButtons?.whiteJoiningLink,
                                                        `Link copied, please share it with the team 'White'`
                                                    )
                                                }
                                                className="mx-1 text-black bg-white mx-2 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                                            >
                                                White Team
                                            </button> */}
                                            <a
                                                href={
                                                    copyLinkButtons?.whiteJoiningLink
                                                }
                                                target="__blank"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                                            >
                                                Join Now
                                            </a>
                                        </div>
                                    )}
                            </div>
                        </>
                    )}

                    {active === "invitation-accepted" && (
                        <>
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                                    {
                                        chessInvitationResponse[0]?.challenge
                                            ?.destUser?.name
                                    }{" "}
                                    has {chessInvitationResponse[1]?.done} your
                                    invitation
                                </h4>
                                {chessInvitationResponse[1]?.done ===
                                "accepted" ? (
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 mx-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() =>
                                            handleJoinMatch(
                                                chessInvitationResponse[0]
                                                    ?.challenge?.url
                                            )
                                        }
                                    >
                                        Click here to join the match
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 mx-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={() =>
                                            setActive("invitationform")
                                        }
                                    >
                                        Invite other
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    <div className="p-4 md:p-5">
                        <div className="mb-2 border-b border-gray-200 dark:border-gray-700 ">
                            <ul
                                className="flex flex-wrap mb-px text-sm font-medium text-center"
                                id="default-styled-tab"
                                data-tabs-toggle="#default-styled-tab-content"
                                data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
                                data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-black-700 dark:hover:text-gray-300"
                                role="tablist"
                            >
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`${
                                            activeTab === "active-matches"
                                                ? "text-white"
                                                : "text-gray-400"
                                        } inline-block p-4 border-b-2 rounded-t-lg`}
                                        role="tab"
                                        onClick={() =>
                                            handleActiveTab("active-matches")
                                        }
                                    >
                                        Active Matches
                                    </button>
                                </li>
                                <li className="me-2" role="presentation">
                                    <button
                                        className={`${
                                            activeTab === "past-matches"
                                                ? "text-white"
                                                : "text-gray-400"
                                        } inline-block p-4 border-b-2 rounded-t-lg`}
                                        role="tab"
                                        onClick={() =>
                                            handleActiveTab("past-matches")
                                        }
                                    >
                                        Past Matches
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div id="default-styled-tab-content">
                            <div
                                className={`${
                                    activeTab === "active-matches"
                                        ? "active"
                                        : "hidden"
                                } tab-pane p-2 rounded-lg bg-gray-50 dark:bg-gray-800`}
                                role="tabpanel"
                            >
                                <p>Active Matches</p>
                                <ActiveMtchesTable
                                    data={matches.activeMatches}
                                />
                            </div>
                            <div
                                className={`${
                                    activeTab === "past-matches"
                                        ? "active"
                                        : "hidden"
                                } tab-pane p-2 rounded-lg bg-gray-50 dark:bg-gray-800`}
                                role="tabpanel"
                            >
                                <p>Past matches</p>
                                <PastMatchesTable data={matches.pastMatches} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PastMatchesTable = ({ data }) => {
    return (
        <div className="relative overflow-x-auto overflow-y-auto max-h-[200px] shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-2 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Winner
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Created
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((match) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-2 py-3">{match.status}</td>
                                <td className="px-2 py-3">{match.winner}</td>
                                <td scope="row" className="px-2 py-3 ">
                                    <p className="text-xs text-gray-900 whitespace-nowrap dark:text-white">
                                        {getFormattedDate(match.created)}
                                    </p>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>No match history available</p>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const ActiveMtchesTable = ({ data }) => {
    return (
        <div className="relative overflow-x-auto overflow-y-auto max-h-[200px] shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-100 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((match) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td
                                    scope="row"
                                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {match.name}{" "}
                                </td>
                                <td className="px-4 py-4">{match.status}</td>
                                <td className="px-4 py-4">
                                    <a
                                        href={match.link}
                                        target="_blank"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Join
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p> No Active matches</p>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// {
//     "challenge": {
//         "id": "ryABrYKn",
//         "url": "https://lichess.org/ryABrYKn",
//         "status": "created",
//         "challenger": {
//             "id": "kuldeep_grepix",
//             "name": "kuldeep_grepix",
//             "rating": 1500,
//             "title": null,
//             "provisional": true,
//             "online": true,
//             "lag": 3
//         },
//         "destUser": {
//             "id": "baijnathgupta",
//             "name": "baijnathgupta",
//             "rating": 1500,
//             "title": null,
//             "provisional": true,
//             "online": true,
//             "lag": 3
//         },
//         "variant": {
//             "key": "standard",
//             "name": "Standard",
//             "short": "Std"
//         },
//         "rated": false,
//         "speed": "blitz",
//         "timeControl": {
//             "type": "clock",
//             "limit": 300,
//             "increment": 1,
//             "show": "5+1"
//         },
//         "color": "random",
//         "finalColor": "black",
//         "perf": {
//             "icon": "",
//             "name": "Blitz"
//         },
//         "direction": "out",
//         "rules": [
//             "noAbort"
//         ]
//     },
//     "socketVersion": 0
// }{
//     "done": "accepted"
// }

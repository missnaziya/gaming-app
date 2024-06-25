import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GameCard from "../../../components/games-card";
import GameCategories from "../../../components/game-categories";
import SearchBox from "../../../components/search-filter";
import CryptoJS from "crypto-js";
import { CHESS_OAUTH } from "../../../constants/endpoints";
import Button from "../../../components/shared/button";
import { StaticImage } from "gatsby-plugin-image";
import ChessAuthConfirmationModel from "../../../components/model/ChessAuthConfirmationModel";
import PlayChessModel from "../../../components/model/PlayChessModel";
import { App, URLOpenListenerEvent } from "@capacitor/app";
import { Link, navigate } from "gatsby";
const GamesArea = ({ data }) => {
    const [filterGames, setFilterGames] = useState(data.items);
    const [chessUserInfo, setChessUserInfo] = useState();
    const [model, setModel] = useState({
        chessAuthConfirmationModel: false,
        openPlayChessModel: false,
    });

    const selectItem = function (e) {
        const selectGame = e.target.value;
        if (selectGame === "all") {
            setFilterGames(data.items);
            return;
        }
        const filteredGames = data.items
            .map((game) => ({
                ...game,
                catSlug: game.categories.map((cat) => cat.slug),
            }))
            .filter((cat) => cat.catSlug.includes(selectGame));
        setFilterGames(filteredGames);
    };

    const categories = data?.items.map((item) => item.categories);

    // -------------------------
    // Search Box Flter
    // -------------------------

    const searchValueTitle = data?.items.map((item) => item.title);
    const searchHelander = function (e) {
        const searchVal = e.target.value;
    };

    const generateRandomString = (length) => {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    };

    const generateCodeChallenge = (codeVerifier) => {
        const sha256 = CryptoJS.SHA256(codeVerifier);
        const base64 = sha256.toString(CryptoJS.enc.Base64);
        const base64Url = base64
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
        return base64Url;
    };

    const codeVerifier =
        "aaaaaaaaabbbbbbbbbbbbbbcccccccccccddddddddd" ||
        generateRandomString(128);
    // const redirect = encodeURIComponent(`http://localhost:8000/games/`);
    let redirect;
    if (process.env.GATSBY_IS_MOBILE === "1") {
        redirect = encodeURIComponent(`com.konfehtigames://games/`);
    } else {
        redirect = encodeURIComponent(`http://localhost:8000/games/`);
    }
    const clientId = "konfehti.com";

    const handleOAuthLogin = async () => {
        try {
            // Generate the code_challenge
            const codeChallenge = generateCodeChallenge(codeVerifier);
            const codeChallengeEncoded = encodeURIComponent(codeChallenge);
            const reponseType = encodeURIComponent("code");
            const method = encodeURIComponent("S256");
            const scope = encodeURIComponent(
                `email:read challenge:write bot:play board:play challenge:read`
            );

            window.location.href = `${process.env.GATSBY_CHESS_APP_BASE_URL}${CHESS_OAUTH}?redirect_uri=${redirect}&&client_id=${clientId}&&code_challenge_method=${method}&&code_challenge=${codeChallengeEncoded}&&response_type=${reponseType}&&scope=${scope}`;
        } catch (error) {
            console.log("Error::", error);
        }
    };

    const handlePlayChess = async () => {
        try {
            let chessToken = localStorage.getItem("chessToken");
            if (chessToken) {
                handleOpenPlayChessModel();
            } else {
                handleOpenOAuthConfirmation();
            }
        } catch (error) {
            console.log("Error::", error);
        }
    };

    // close all models
    const closeAllModels = () => {
        setModel((prev) => ({
            ...prev,
            chessAuthConfirmationModel: false,
            openPlayChessModel: false,
        }));
    };

    // open play chess model
    const handleOpenPlayChessModel = async () => {
        setModel((prev) => ({
            ...prev,
            openPlayChessModel: true,
        }));
    };

    // close play chess model
    const handleClosePlayChessModel = (response) => {
        closeAllModels();
    };

    // open auth confirmation model
    const handleOpenOAuthConfirmation = () => {
        setModel((prev) => ({
            ...prev,
            chessAuthConfirmationModel: true,
        }));
    };

    // close auth confirmation model
    const handleCloseOAuthConfirmationModel = (response) => {
        closeAllModels();
        if (response) {
            handleOAuthLogin();
        }
    };

    useEffect(() => {
        if (process.env.GATSBY_IS_MOBILE === "1") {
            App.addListener("appUrlOpen", (data) => {
                let ff = data.url.replace(
                    "com.konfehtigames://games/",
                    "capacitor://localhost/games/"
                );
                let ff1 = data.url.replace(
                    "com.konfehtigames://games/",
                    "/games"
                );
                console.log("App opened with URL:", data);
                console.log("App opened with URL:", ff1);
                navigate("/wallet");
                setTimeout(() => {
                    navigate(ff1);
                }, 800);
            });
        }
    }, []);

    return (
        <>
            {model.openPlayChessModel && (
                <PlayChessModel
                    open={model.openPlayChessModel}
                    handleClose={handleClosePlayChessModel}
                />
            )}
            {model.chessAuthConfirmationModel && (
                <ChessAuthConfirmationModel
                    open={model.chessAuthConfirmationModel}
                    handleClose={handleCloseOAuthConfirmationModel}
                />
            )}
            <section className="games-section  md:pt-24 pb-16 md:pb-28">
                <div className="container">
                    {/* filter row */}
                    <div className="hidden filter-wrap bg-secondary-70 rounded-2xl px-5 py-7 mb-10">
                        <div className="flex justify-between">
                            <div className="category-filter">
                                <GameCategories
                                    categories={categories}
                                    selectItem={selectItem}
                                />
                            </div>
                            {/* <div className="search-filter ">
                        
                            <SearchBox
                                // searchValueTitle={searchValueTitle}
                                searchHelander={searchHelander}
                            />
                        </div> */}
                        </div>
                    </div>
                    <Button
                        path={""}
                        // btnType={btnType}
                        onClick={() => {
                            handlePlayChess();
                        }}
                        className="text-white block btn-bg-image-large mr-3 mt-8"
                    >
                        Play Chess{" "}
                        <StaticImage
                            className="align-middle ml-3 transition-all group-hover:ml-5 "
                            src="../../data/images/icons/arrrow-icon2.webp"
                            alt=""
                        />
                    </Button>
                    <div className="flex flex-wrap -mx-3">
                        {filterGames &&
                            filterGames.map((item, i) => (
                                <div
                                    className="w-full md:w-1/2 lg:w-1/2 px-4"
                                    key={item.id}
                                >
                                    <GameCard
                                        // gamedata={data[0]}
                                        gamedata={data.items[i]}
                                        date={item?.date}
                                        slug={item?.slug}
                                        image={item.gameThum.src}
                                        alt={item?.gameThum?.alt}
                                        buttons={item?.buttons}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

GamesArea.propTypes = {
    data: PropTypes.shape({
        section_title: PropTypes.shape({
            heading: PropTypes.string,
        }),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            })
        ),
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            })
        ),
    }),
};
export default GamesArea;

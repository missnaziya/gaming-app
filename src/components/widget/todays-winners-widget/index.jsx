import React, { Fragment, useEffect, useState } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import axios from "axios";
import KonfehtiService from "../../../constants/konfehti-api";
import { GET_GAMES } from "../../../constants/endpoints";

const FooterWinnerWidget = ({ infoData }) => {
    const [gamedata, setGamedata] = useState();
    const fetchData = async () => {
        try {
            // setLoading(true);
            const responseData = await KonfehtiService.post(GET_GAMES);
            setGamedata(responseData.data.response);
            // setDynamicData(responseData.data.response)
            // setNewGameData(newArray)
        } catch (error) {
            console.error("Error in API request:", error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    //     <img
    //     className="md:h-auto  rounded-full"
    //     // image={getImage(teamImage1) || getImage(teamImage2)}
    //     src={`${process.env.GATSBY_IMAGE_BASE_URL}${authData?.image}`}
    //     alt=""
    //     style={{
    //         width: "150px",
    //         height: "150px",
    //         // marginTop: "10px",
    //     }}
    // />
    return (
        <Fragment>
            <h3 className="uppercase font-bold mb-8 lg:mb-14">
                {infoData?.title}
            </h3>
            <div className="flex">
                <div className="footer_winners_thumb grid gap-2 grid-cols-3">
                    {gamedata &&
                        gamedata?.slice(0, 6)?.map((item, i) => (
                            <Link
                                to="/games"
                                key={i}
                                className="w-73 h-73 p-1 inline-blockp-1 border-2 text-center border-solid border-secondary-80 rounded-2xl"
                            >
                                <img
                                    className="w-full rounded-lg"
                                    // image={getImage(teamImage1) || getImage(teamImage2)}
                                    src={`${process.env.GATSBY_IMAGE_BASE_URL}${item?.image_path}`}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Link>
                        ))}
                </div>
            </div>
        </Fragment>
    );
};
FooterWinnerWidget.propTypes = {
    infoData: PropTypes.shape({
        images: PropTypes.arrayOf(
            PropTypes.shape({
                src: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.shape({}),
                ]).isRequired,
                alt: PropTypes.string,
            })
        ),
        title: PropTypes.string,
    }),
};
export default FooterWinnerWidget;

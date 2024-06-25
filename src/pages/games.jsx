import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import PageBreadcrumb from "../components/pagebreadcrumb";
import { graphql } from "gatsby";
import { normalizedData } from "@utils/functions";
import FunfactArea from "../container/home/funfact";
import GamesArea from "../container/games-page/popular-game";
import RegisterForm from "../components/forms/register-form";
import AddGameForm from "../container/games-page/popular-game/add-game";
import SectionTitle from "../components/title";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/common/Loader/LoadingScreen";
import KonfehtiService from "../constants/konfehti-api";
import LichessService, {
    LichessServiceTokenless,
} from "../constants/lichess-api";
import { useLocation } from "@reach/router";
import { GET_GAMES, GET_CHESS_ACCESS_TOKEN } from "../constants/endpoints";

const GamesPage = ({ data, location, pageContext }) => {
    // const [dynamicData,setDynamicData]  = useState()
    const [loading, setLoading] = useState(false);
    const [newGameData, setNewGameData] = useState([]);
    const url = useLocation();
    const queryParams = new URLSearchParams(url.search);
    const code = queryParams.get("code");

    const getGames = async () => {
        try {
            setLoading(true);

            const responseData = await KonfehtiService.post(GET_GAMES, {});

            const newArray = responseData.data.response.map((data) => {
                return {
                    id: data.game_id || "", // Provide default value if game_id is missing
                    slug: data.slug,
                    title: data.name,
                    description: data.description,
                    gameThum: {
                        alt: data?.alt || "", // Provide default value if alt is missing
                        src: {
                            childImageSharp: {
                                gatsbyImageData: {
                                    backgroundColor: "#180838",
                                    height: 330,
                                    layout: "constrained",
                                    width: 570,
                                    images: {
                                        fallback: {
                                            src: data?.gameThum?.src || "",
                                            srcSet: "",
                                            sizes: "(min-width: 570px) 570px, 100vw",
                                        },
                                        sources: [],
                                    },
                                },
                            },
                        },
                    },
                    buttons: [
                        {
                            color: null,
                            content: "Game Details",
                            id: data.game_id || "", // Provide default value if game_id is missing
                            path: null,
                            shape: null,
                            size: "lg",
                        },
                    ],
                    categories: [
                        {
                            title: data.categories?.title || "",
                            slug: data.categories?.slug || "",
                        },
                    ],
                    content: data.content,
                    currentVersion: data.current_version,
                    // date: dynamicData.date,
                    images: data.images.map((image) => ({
                        alt: image.alt,
                        src: image.src,
                    })),
                    inAppProducts: data.in_app_products,
                    installs: data.installs,
                    quoteText: data.quoteText,
                    size: data.size,
                    // updated: dynamicData.updated
                };
            });

            setNewGameData(newArray);
            setLoading(false);
            // navigate("/login");
        } catch (error) {
            console.error("Error in API request:", error.message);
            // setLoading(false);
            // toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const content = normalizedData(data?.page.content || []);
    //     const dynamicDatas = {
    //         alt: "Dynamic Alt Text",
    //         gameThum: "/static/882deebd68c46fe1b369bc537cc2baea/a3622/popular-game-thumb5.webp",
    //         categoryTitle: "Dynamic Category",
    //         categorySlug: "dynamic-category",
    //         content: "Dynamic content text",
    //         currentVersion: "1.2.3",
    //         date: "2024-02-15 10:30:00",
    //         images: [
    //             {
    //                 alt: "Dynamic Image Alt 1",
    //                 src: "/dynamic-path/to/image1.webp"
    //             },
    //             {
    //                 alt: "Dynamic Image Alt 2",
    //                 src: "/dynamic-path/to/image2.webp"
    //             },
    //             {
    //                 alt: "Dynamic Image Alt 3",
    //                 src: "/dynamic-path/to/image3.webp"
    //             }
    //         ],
    //         inAppProducts: "$1.99 - $19.99",
    //         installs: "1,000,000+",
    //         quoteText: "Dynamic quote text",
    //         size: "150MB",
    //         updated: "2024-02-15"
    //     };
    //    const newGameDatae = dynamicData?.map(data => ({

    //         // id: "26d97a70-dc69-5d3e-8902-3d5484000658",
    //         id:data.game_id,
    //         slug: "alien-space-five-star",
    //         title: "Alien Space Five Star",
    //         gameThum: {
    //             alt: data?.alt,
    //             src: {
    //                 childImageSharp: {
    //                     gatsbyImageData: {
    //                         backgroundColor: "#180838",
    //                         height: 330,
    //                         layout: "constrained",
    //                         width: 570,
    //                         images: {
    //                             fallback: {
    //                                 src:data?.gameThum?.src || "",
    //                                 // src: dynamicData?.gameThum?.src,
    //                                 // src:"https://2023.stitchmyapp.com/konfehti-game-app/ver5.1/webservices/images/originals/3/PmAA1pHktelEnCujj.jpg",
    //                                 srcSet: "",
    //                                 sizes: "(min-width: 570px) 570px, 100vw",
    //                             },
    //                             sources: [],
    //                         },
    //                     },
    //                 },
    //             },
    //             // src: dynamicData.gameThumbSrc
    //         },
    //         buttons: [
    //             {
    //                 color: null,
    //                 content: "Game Details",
    //                 id: data.game_id,
    //                 path: null,
    //                 shape: null,
    //                 size: "lg",
    //             },
    //         ],
    //         categories: [
    //             { title: data.categories.title, slug: data.categories.slug }
    //         ],
    //         // content: dynamicData.content,
    //         // currentVersion: dynamicData.currentVersion,
    //         // date: dynamicData.date,
    //         // images: dynamicData.images.map(image => ({
    //         //     alt: image.alt,
    //         //     src: image.src
    //         // })),
    //         // inAppProducts: dynamicData.inAppProducts,
    //         // installs: dynamicData.installs,
    //         // quoteText: dynamicData.quoteText,
    //         // size: dynamicData.size,
    //         // updated: dynamicData.updated
    //     }));
    //     const newGameDatas = {
    //         id: "26d97a70-dc69-5d3e-8902-3d5484000658",
    //         slug: "alien-space-five-star",
    //         title: "Alien Space Five Star",
    //         gameThum: {
    //             alt: dynamicData?.alt,
    //             src: {
    //                 childImageSharp: {
    //                     gatsbyImageData: {
    //                         backgroundColor: "#180838",
    //                         height: 330,
    //                         layout: "constrained",
    //                         width: 570,
    //                         images: {
    //                             fallback: {
    //                                 src:dynamicData?.gameThum?.src || "",
    //                                 // src: dynamicData?.gameThum?.src,
    //                                 // src:"https://2023.stitchmyapp.com/konfehti-game-app/ver5.1/webservices/images/originals/3/PmAA1pHktelEnCujj.jpg",
    //                                 srcSet: "",
    //                                 sizes: "(min-width: 570px) 570px, 100vw",
    //                             },
    //                             sources: [],
    //                         },
    //                     },
    //                 },
    //             },
    //             // src: dynamicData.gameThumbSrc
    //         },
    //         buttons: [
    //             {
    //                 color: null,
    //                 content: "Game Details",
    //                 id: "1",
    //                 path: null,
    //                 shape: null,
    //                 size: "lg",
    //             },
    //         ],
    //         categories: [
    //             // { title: dynamicData.categoryTitle, slug: dynamicData.categorySlug }
    //         ],
    //         // content: dynamicData.content,
    //         // currentVersion: dynamicData.currentVersion,
    //         // date: dynamicData.date,
    //         // images: dynamicData.images.map(image => ({
    //         //     alt: image.alt,
    //         //     src: image.src
    //         // })),
    //         // inAppProducts: dynamicData.inAppProducts,
    //         // installs: dynamicData.installs,
    //         // quoteText: dynamicData.quoteText,
    //         // size: dynamicData.size,
    //         // updated: dynamicData.updated
    //     };

    // console.log(newGameData, "newGameData.........");
    const gamedata = newGameData;
    const gamedatas = [
        {
            id: "26d97a70-dc69-5d3e-8902-3d5484000658",
            slug: "alien-space-five-star",
            title: "Alien Space Five Star",
            gameThum: {
                alt: "Anonymous",
                src: {
                    childImageSharp: {
                        gatsbyImageData: {
                            backgroundColor: "#180838",
                            height: 330,
                            layout: "constrained",
                            width: 570,
                            images: {
                                fallback: {
                                    src: "/static/882deebd68c46fe1b369bc537cc2baea/a3622/popular-game-thumb5.webp",
                                    srcSet: "/static/882deebd68c46fe1b369bc537cc2baea/0c23d/popular-game-thumb5.webp 143w,\n/static/882deebd68c46fe1b369bc537cc2baea/c1a5e/popular-game-thumb5.webp 285w,\n/static/882deebd68c46fe1b369bc537cc2baea/a3622/popular-game-thumb5.webp 570w",
                                    sizes: "(min-width: 570px) 570px, 100vw",
                                },
                                sources: [],
                            },
                        },
                    },
                },
            },
            buttons: [
                {
                    color: null,
                    content: "Game Details",
                    id: "1",
                    path: null,
                    shape: null,
                    size: "lg",
                },
            ],
            categories: [
                { title: "Drawing", slug: "drawing" },

                { title: "Alien Space", slug: "alien-space" },
            ],
            content: [
                // [
                {
                    section: "game-details-per-one",
                    id: "game-details-per-one",
                    headings: null,
                    items: [
                        {
                            id: "game-details-1",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                        {
                            id: "game-details-2",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                    ],
                },
                {
                    section: "game-details-per-two",
                    id: "game-details-per-two",
                    headings: [{ content: "DESCRIPTION:" }],
                    items: [
                        {
                            id: "game-details-1",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                        {
                            id: "game-details-2",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                    ],
                },
                {
                    section: "game-details-per-three",
                    id: "game-details-per-three",
                    headings: [{ content: "FEATURES:" }],
                    items: [
                        {
                            id: "game-details-1",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                        {
                            id: "game-details-2",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                    ],
                },
                {
                    section: "game-details-per-whats-new",
                    id: "game-details-per-whats-new",
                    headings: [{ content: "WHAT’S NEW!" }],
                    items: [
                        {
                            id: "game-details-1",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                    ],
                },
                {
                    section: "game-details-per-04",
                    id: "game-details-per-04",
                    headings: null,
                    items: [
                        {
                            id: "game-details-1",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ldus PageMaker including versions of Lorem Ipsum.",
                        },
                        {
                            id: "game-details-2",
                            desc: "Lorem Ipsum is simply dummy text of the printing a…ktop publishing software like including versions.",
                        },
                    ],
                },
                //   ];
                // {
                //     id: "game-details-per-one",
                //     headings: null,
                //     items: [
                //         {
                //             id: "game-details-1",
                //             desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                //         },
                //         {
                //             id: "game-details-2",
                //             desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                //         },
                //     ],
                // },
                // {
                //     / Object containing content data /
                // },
                // {
                //     / Object containing content data /
                // },
                // {
                //     / Object containing content data /
                // },
                // {
                //     / Object containing content data /
                // },
            ],
            currentVersion: "03.00.28.00.00",
            date: "2021-01-02 13:01:00",
            images: [
                {
                    // / Object containing slider image 1 data /

                    alt: "Games Details",
                    src: {
                        childImageSharp: {
                            gatsbyImageData: {
                                backgroundColor: "#282828",
                                height: 540,
                                layout: "constrained",
                                width: 1170,
                                images: {
                                    fallback: {
                                        src: "/static/b160641ae55b008a0e48a74273dfc14a/0a8d7/game-details-thumb.webp",
                                        srcSet: "/static/b160641ae55b008a0e48a74273dfc14a/10675/gam…8a74273dfc14a/0a8d7/game-details-thumb.webp 1170w",
                                        sizes: "(min-width: 1170px) 1170px, 100vw",
                                    },
                                    sources: [],
                                },
                            },
                        },
                    },
                },
                {
                    // / Object containing slider image 2 data /
                },
                {
                    // / Object containing slider image 3 data /
                },
            ],
            inAppProducts: "$0.85 - $985.00",
            installs: "80,000,000+",
            quoteText:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the 1500 printer took galley of type scrambled it to make a type specimen book.",
            size: "99MB",
            updated: "2023-01-02",
        },
    ];

    const codeVerifier = "aaaaaaaaabbbbbbbbbbbbbbcccccccccccddddddddd";
    const redirect = `http://localhost:8000/games/`;
    const clientId = "konfehti.com";

    const getAccessToken = async (code) => {
        try {
            const formData = new URLSearchParams();
            formData.append("grant_type", "authorization_code");
            formData.append("code", code);
            formData.append("code_verifier", codeVerifier);
            formData.append("redirect_uri", redirect);
            formData.append("client_id", clientId);

            const response = await LichessServiceTokenless.post(
                GET_CHESS_ACCESS_TOKEN,
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            if (response.status === 200) {
                console.log("ACCESS TOKEN :::", response.data);
                localStorage.setItem("chessToken", response.data.access_token);
            }
        } catch (error) {
            console.log("Error::", error);
        }
    };

    useEffect(() => {
        console.log("code", code);
        if (code) {
            getAccessToken(code);
        }
    }, []);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <Layout
                    data={{
                        ...globalContent["menu"],
                        ...globalContent["footer"],
                    }}
                >
                    <SEO title="Games Page" pathname="/" />
                    <PageBreadcrumb
                        pageContext={pageContext}
                        location={location}
                        title="ALL KONFEHTI GAME"
                    />
                    {/* <section className="register-section">
                    <div className="container">
                        <div className="col-4 w-1/2 mx-auto items-center">
                            <div className="form-warp">
                                {data?.section_title && (
                                    <SectionTitle
                                        heading={"sdnvfhjsv"}
                                        {...data.section_title}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </section> */}

                    <GamesArea
                        data={{ items: gamedata }}
                        // data={{
                        //     items: data.allGames.nodes,
                        // }}
                    />
                    {/* <FunfactArea data={content["funfact-section"]} /> */}
                </Layout>
            )}
        </>
    );
};

GamesPage.propTypes = {
    location: PropTypes.object,
    pageContext: PropTypes.object,
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        page: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        allGames: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};

export const query = graphql`
    query gamesPageQuery {
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
        page(title: { eq: "home" }, pageType: { eq: homepage }) {
            content {
                ...PageContentAll
            }
        }
        allGames(sort: { date: DESC }) {
            nodes {
                ...Games
            }
        }
    }
`;

export default GamesPage;

import React, { useEffect, useState } from "react";
// import MatchItem from "../../../components/match";
// import SectionTitle from "../../../components/title";
import SectionTitle from "../../components/title";
import MatchItem from "../../components/match";
import MatchHistoryItem from "../../components/match-history";
import { getFormattedDate } from "../../utils/functions.js";
import KonfehtiService from "../../constants/konfehti-api";
import { GET_MATCHES } from "../../constants/endpoints";

const MatchHistory = () => {
    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : null;
    const [matchData, setMatchData] = useState([]);
    const getData = async () => {
        try {
            const result = await KonfehtiService.post(GET_MATCHES);
            // console.log("RESULT:", result?.data?.response);
            if (result?.data?.code === 200) {
                setMatchData(
                    result?.data?.response?.map((item, ind) => ({
                        ...item,
                        id: item?.match_id || ind,
                        date: getFormattedDate(item?.schedule_date),
                        title: item?.name,
                        teamNubmber: item?.playerNumber,
                        winningPrize: item?.winning_prize,
                        registeredTeams: item?.playerNumber,
                        liveStreaming: {
                            id: item?.liveStreaming?.live_streaming_id,
                            link: item?.liveStreaming?.link,
                            headings: [
                                {
                                    content: item?.liveStreaming?.name,
                                    level: "h3",
                                },
                            ],
                            images: [
                                {
                                    alt: item?.liveStreaming?.images?.alt,
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#281878",
                                                images: {
                                                    fallback: {
                                                        src: item?.liveStreaming
                                                            ?.images?.src,
                                                        srcSet: item
                                                            ?.liveStreaming
                                                            ?.images?.src,
                                                        sizes: "(min-width: 1170px) 1170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 1170,
                                                height: 540,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        teams:
                            item?.Player?.map((team) => ({
                                id: team?.user_id,
                                name: team?.name,
                                logo: {
                                    alt: team?.images?.alt,
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#080808",
                                                images: {
                                                    fallback: {
                                                        src: team?.images?.src,
                                                        srcSet: team?.images
                                                            ?.src,
                                                        sizes: "(min-width: 102px) 102px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 102,
                                                height: 119,
                                            },
                                        },
                                    },
                                },
                                slug: team?.name,
                                teamPlayer: item?.Player?.map((tp) => ({
                                    id: tp?.user_id,
                                    name: tp?.name,
                                    images: [
                                        {
                                            alt: tp?.images?.alt,
                                            src: {
                                                childImageSharp: {
                                                    gatsbyImageData: {
                                                        layout: "constrained",
                                                        backgroundColor:
                                                            "#584878",
                                                        images: {
                                                            fallback: {
                                                                src: tp?.images
                                                                    ?.src,
                                                                srcSet: tp
                                                                    ?.images
                                                                    ?.src,
                                                                sizes: "(min-width: 170px) 170px, 100vw",
                                                            },
                                                            sources: [],
                                                        },
                                                        width: 170,
                                                        height: 170,
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                })),
                                socials: [],
                            })) || [],
                    }))
                );
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const dummyData = [
        {
            id: "3e29e95a-d6a0-5829-8a2a-684190e7b711",
            date: "20 February, 2024, 06:01:00 AM",
            title: "New SPRING GAME 2024",
            slug: "new-spring-game-2024",
            playerNumber: "02",
            teamNubmber: "02",
            winningPrize: "200",
            registeredTeams: "02",
            liveStreaming: {
                id: "watch-live-1",
                link: "https://www.youtube.com/watch?v=eS9Qm4AOOBY",
                headings: [
                    {
                        content: "Watch Live Streaming",
                        level: "h3",
                    },
                ],
                images: [
                    {
                        alt: "LIVE STREAMING",
                        src: {
                            childImageSharp: {
                                gatsbyImageData: {
                                    layout: "constrained",
                                    backgroundColor: "#281878",
                                    images: {
                                        fallback: {
                                            src: "/static/40259a30cb4b2bf6d1b9877053fa1183/0a8d7/gaming-bg1.webp",
                                            srcSet: "/static/40259a30cb4b2bf6d1b9877053fa1183/10675/gaming-bg1.webp 293w,\n/static/40259a30cb4b2bf6d1b9877053fa1183/95f3d/gaming-bg1.webp 585w,\n/static/40259a30cb4b2bf6d1b9877053fa1183/0a8d7/gaming-bg1.webp 1170w",
                                            sizes: "(min-width: 1170px) 1170px, 100vw",
                                        },
                                        sources: [],
                                    },
                                    width: 1170,
                                    height: 540,
                                },
                            },
                        },
                    },
                ],
            },
            teams: [
                {
                    id: "7995517c-86cd-5bf8-9be0-06c1d49868d4",
                    name: "Anonymous",
                    logo: {
                        alt: "Anonymous",
                        src: {
                            childImageSharp: {
                                gatsbyImageData: {
                                    layout: "constrained",
                                    backgroundColor: "#080808",
                                    images: {
                                        fallback: {
                                            src: "/static/b6308d196419bd419eac36db3d85ccbe/be1f5/upcoming-game-thumb3.webp",
                                            srcSet: "/static/b6308d196419bd419eac36db3d85ccbe/91ef8/upcoming-game-thumb3.webp 26w,\n/static/b6308d196419bd419eac36db3d85ccbe/ab05b/upcoming-game-thumb3.webp 51w,\n/static/b6308d196419bd419eac36db3d85ccbe/be1f5/upcoming-game-thumb3.webp 102w",
                                            sizes: "(min-width: 102px) 102px, 100vw",
                                        },
                                        sources: [],
                                    },
                                    width: 102,
                                    height: 119,
                                },
                            },
                        },
                    },
                    slug: "anonymous",
                    teamPlayer: [
                        {
                            id: "player-01",
                            name: "Raju Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#584878",
                                                images: {
                                                    fallback: {
                                                        src: "/static/b64af85f7b08b16209462e1d0bf0af4e/5376c/players1.webp",
                                                        srcSet: "/static/b64af85f7b08b16209462e1d0bf0af4e/f4afd/players1.webp 43w,\n/static/b64af85f7b08b16209462e1d0bf0af4e/8f0cc/players1.webp 85w,\n/static/b64af85f7b08b16209462e1d0bf0af4e/5376c/players1.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-02",
                            name: "Moler",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#483858",
                                                images: {
                                                    fallback: {
                                                        src: "/static/cc8c19afb51ba281836e561b735e4e51/5376c/players2.webp",
                                                        srcSet: "/static/cc8c19afb51ba281836e561b735e4e51/f4afd/players2.webp 43w,\n/static/cc8c19afb51ba281836e561b735e4e51/8f0cc/players2.webp 85w,\n/static/cc8c19afb51ba281836e561b735e4e51/5376c/players2.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-03",
                            name: "Butler",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#181828",
                                                images: {
                                                    fallback: {
                                                        src: "/static/8c84e43ff07e6e9112f0d2ed857c92c8/5376c/players3.webp",
                                                        srcSet: "/static/8c84e43ff07e6e9112f0d2ed857c92c8/f4afd/players3.webp 43w,\n/static/8c84e43ff07e6e9112f0d2ed857c92c8/8f0cc/players3.webp 85w,\n/static/8c84e43ff07e6e9112f0d2ed857c92c8/5376c/players3.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-04",
                            name: "Morch Bork",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#d88838",
                                                images: {
                                                    fallback: {
                                                        src: "/static/23dd208cdc3982a6e2061f77af3da3ba/5376c/players4.webp",
                                                        srcSet: "/static/23dd208cdc3982a6e2061f77af3da3ba/f4afd/players4.webp 43w,\n/static/23dd208cdc3982a6e2061f77af3da3ba/8f0cc/players4.webp 85w,\n/static/23dd208cdc3982a6e2061f77af3da3ba/5376c/players4.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-05",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#080808",
                                                images: {
                                                    fallback: {
                                                        src: "/static/4b4d53731dee43afacae43a78187c5ce/5376c/players5.webp",
                                                        srcSet: "/static/4b4d53731dee43afacae43a78187c5ce/f4afd/players5.webp 43w,\n/static/4b4d53731dee43afacae43a78187c5ce/8f0cc/players5.webp 85w,\n/static/4b4d53731dee43afacae43a78187c5ce/5376c/players5.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-06",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#282828",
                                                images: {
                                                    fallback: {
                                                        src: "/static/287b9581c048a81c331b063affceaefd/5376c/players6.webp",
                                                        srcSet: "/static/287b9581c048a81c331b063affceaefd/f4afd/players6.webp 43w,\n/static/287b9581c048a81c331b063affceaefd/8f0cc/players6.webp 85w,\n/static/287b9581c048a81c331b063affceaefd/5376c/players6.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-07",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#181828",
                                                images: {
                                                    fallback: {
                                                        src: "/static/8c84e43ff07e6e9112f0d2ed857c92c8/5376c/players3.webp",
                                                        srcSet: "/static/8c84e43ff07e6e9112f0d2ed857c92c8/f4afd/players3.webp 43w,\n/static/8c84e43ff07e6e9112f0d2ed857c92c8/8f0cc/players3.webp 85w,\n/static/8c84e43ff07e6e9112f0d2ed857c92c8/5376c/players3.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    socials: [
                        {
                            id: 1,
                            title: "facebook",
                            link: "https://www.facebook.com",
                            icon: "icofont-facebook",
                        },
                        {
                            id: 2,
                            title: "dribbble",
                            link: "https://dribbble.com",
                            icon: "icofont-dribbble",
                        },
                        {
                            id: 3,
                            title: "youtube",
                            link: "https://www.youtube.com",
                            icon: "icofont-youtube-play",
                        },
                        {
                            id: 4,
                            title: "twitter",
                            link: "https://www.twitter.com",
                            icon: "icofont-twitter",
                        },
                    ],
                },
                {
                    id: "593c6f2b-deb7-5563-b494-86a1cae8d5b5",
                    name: "Panda",
                    logo: {
                        alt: "Panda",
                        src: {
                            childImageSharp: {
                                gatsbyImageData: {
                                    layout: "constrained",
                                    backgroundColor: "#080808",
                                    images: {
                                        fallback: {
                                            src: "/static/8a70da1cc61053ce3247477282967551/22d06/upcoming-game-thumb1.webp",
                                            srcSet: "/static/8a70da1cc61053ce3247477282967551/47bc5/upcoming-game-thumb1.webp 24w,\n/static/8a70da1cc61053ce3247477282967551/065d6/upcoming-game-thumb1.webp 49w,\n/static/8a70da1cc61053ce3247477282967551/22d06/upcoming-game-thumb1.webp 97w",
                                            sizes: "(min-width: 97px) 97px, 100vw",
                                        },
                                        sources: [],
                                    },
                                    width: 97,
                                    height: 119,
                                },
                            },
                        },
                    },
                    slug: "panda",
                    teamPlayer: [
                        {
                            id: "player-01",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#483858",
                                                images: {
                                                    fallback: {
                                                        src: "/static/cc8c19afb51ba281836e561b735e4e51/5376c/players2.webp",
                                                        srcSet: "/static/cc8c19afb51ba281836e561b735e4e51/f4afd/players2.webp 43w,\n/static/cc8c19afb51ba281836e561b735e4e51/8f0cc/players2.webp 85w,\n/static/cc8c19afb51ba281836e561b735e4e51/5376c/players2.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-02",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#d88838",
                                                images: {
                                                    fallback: {
                                                        src: "/static/23dd208cdc3982a6e2061f77af3da3ba/5376c/players4.webp",
                                                        srcSet: "/static/23dd208cdc3982a6e2061f77af3da3ba/f4afd/players4.webp 43w,\n/static/23dd208cdc3982a6e2061f77af3da3ba/8f0cc/players4.webp 85w,\n/static/23dd208cdc3982a6e2061f77af3da3ba/5376c/players4.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-03",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#080808",
                                                images: {
                                                    fallback: {
                                                        src: "/static/4b4d53731dee43afacae43a78187c5ce/5376c/players5.webp",
                                                        srcSet: "/static/4b4d53731dee43afacae43a78187c5ce/f4afd/players5.webp 43w,\n/static/4b4d53731dee43afacae43a78187c5ce/8f0cc/players5.webp 85w,\n/static/4b4d53731dee43afacae43a78187c5ce/5376c/players5.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-04",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#d88838",
                                                images: {
                                                    fallback: {
                                                        src: "/static/23dd208cdc3982a6e2061f77af3da3ba/5376c/players4.webp",
                                                        srcSet: "/static/23dd208cdc3982a6e2061f77af3da3ba/f4afd/players4.webp 43w,\n/static/23dd208cdc3982a6e2061f77af3da3ba/8f0cc/players4.webp 85w,\n/static/23dd208cdc3982a6e2061f77af3da3ba/5376c/players4.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-05",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#080808",
                                                images: {
                                                    fallback: {
                                                        src: "/static/4b4d53731dee43afacae43a78187c5ce/5376c/players5.webp",
                                                        srcSet: "/static/4b4d53731dee43afacae43a78187c5ce/f4afd/players5.webp 43w,\n/static/4b4d53731dee43afacae43a78187c5ce/8f0cc/players5.webp 85w,\n/static/4b4d53731dee43afacae43a78187c5ce/5376c/players5.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-06",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#282828",
                                                images: {
                                                    fallback: {
                                                        src: "/static/287b9581c048a81c331b063affceaefd/5376c/players6.webp",
                                                        srcSet: "/static/287b9581c048a81c331b063affceaefd/f4afd/players6.webp 43w,\n/static/287b9581c048a81c331b063affceaefd/8f0cc/players6.webp 85w,\n/static/287b9581c048a81c331b063affceaefd/5376c/players6.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            id: "player-07",
                            name: "Mark Jone",
                            images: [
                                {
                                    alt: "Panda",
                                    src: {
                                        childImageSharp: {
                                            gatsbyImageData: {
                                                layout: "constrained",
                                                backgroundColor: "#181828",
                                                images: {
                                                    fallback: {
                                                        src: "/static/8c84e43ff07e6e9112f0d2ed857c92c8/5376c/players3.webp",
                                                        srcSet: "/static/8c84e43ff07e6e9112f0d2ed857c92c8/f4afd/players3.webp 43w,\n/static/8c84e43ff07e6e9112f0d2ed857c92c8/8f0cc/players3.webp 85w,\n/static/8c84e43ff07e6e9112f0d2ed857c92c8/5376c/players3.webp 170w",
                                                        sizes: "(min-width: 170px) 170px, 100vw",
                                                    },
                                                    sources: [],
                                                },
                                                width: 170,
                                                height: 170,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    socials: [
                        {
                            id: 1,
                            title: "facebook",
                            link: "https://www.facebook.com",
                            icon: "icofont-facebook",
                        },
                        {
                            id: 2,
                            title: "dribbble",
                            link: "https://dribbble.com",
                            icon: "icofont-dribbble",
                        },
                        {
                            id: 3,
                            title: "youtube",
                            link: "https://www.youtube.com",
                            icon: "icofont-youtube-play",
                        },
                        {
                            id: 4,
                            title: "twitter",
                            link: "https://www.twitter.com",
                            icon: "icofont-twitter",
                        },
                    ],
                },
            ],
            quoteText:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the 1500 printer took galley of type scrambled it to make a type specimen book.",
            content: [
                {
                    id: "game-details-per-one",
                    section: "game-details-per-one",
                    items: [
                        {
                            id: "game-details-1",
                            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        },
                        {
                            id: "game-details-2",
                            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        },
                    ],
                },
                {
                    id: "game-details-per-two",
                    section: "game-details-per-two",
                    items: [
                        {
                            id: "game-details-1",
                            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        },
                        {
                            id: "game-details-2",
                            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        },
                    ],
                },
            ],
        },
    ];
    return matchData && matchData?.length > 0 ? (
        <section className="upcoming-gaming-section pb-16 md:pb-24">
            <div className="container">
                {/* <div className="section-title mb-15">
                    <SectionTitle heading="Match History" />
                </div> */}
                {matchData &&
                    matchData?.length &&
                    matchData
                        ?.filter(
                            (item) =>
                                item.registeredTeams == 2 &&
                                (item.Player[0].user_id == authData.user_id ||
                                    item.Player[1].user_id == authData.user_id)
                        )
                        ?.map((item) => (
                            <MatchHistoryItem
                                key={item?.id}
                                title={item?.title}
                                registeredTeams={item?.registeredTeams}
                                date={item?.date}
                                slug={item?.slug}
                                video_link={item?.liveStreaming?.link}
                                teamImage1={item?.teams[0]?.logo?.src}
                                teamImage2={item?.teams[1]?.logo?.src}
                                tesmSlug1={item?.teams[0]?.slug}
                                tesmSlug2={item?.teams[1]?.slug}
                                pageDetails={item}
                            />
                        ))}
                {(!matchData ||
                    matchData.filter(
                        (item) =>
                            item.registeredTeams === 2 &&
                            (item.Player[0].user_id === authData.user_id ||
                                item.Player[1].user_id === authData.user_id)
                    ).length === 0) && (
                    <div className="section-title mb-15">
                        <h3 className="text-center">
                            Oops!! No History Available.
                        </h3>
                    </div>
                )}
            </div>
        </section>
    ) : null;
};

export default MatchHistory;

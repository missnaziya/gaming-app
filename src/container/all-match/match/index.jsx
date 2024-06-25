import React, { useEffect, useState } from "react";
import MatchItem from "../../../components/match";
import SectionTitle from "../../../components/title";
import Popup from "../../../components/common/Popup";
import Button from "../../../components/shared/button";
import { getFormattedDate } from "../../../utils/functions.js";
import KonfehtiService from "../../../constants/konfehti-api";
import { GET_MATCHES } from "../../../constants/endpoints";

const MatchHistory = () => {
    const [matchData, setMatchData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isInstruction, setIsInstruction] = useState(false);

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
    }, [refresh]);

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
                <div className="section-title">
                    {/* <SectionTitle heading="Match List" /> */}
                </div>

                {/* -------------need hep popup=------------------    */}

                <div
                    className="flex justify-end cursor-pointer"
                    onClick={() => {
                        setIsInstruction(true);
                    }}
                >
                    <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
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
                    <span className="p-1"> Need help ?</span>
                </div>
                <Popup
                    btnType={"submit"}
                    open={isInstruction}
                    setOpen={setIsInstruction}
                    modalTitle={"HOW TO PLAY!"}
                    body={
                        <>
                            <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                <div class="flex items-center mt-1">
                                    {/* <!-- Fixed width for step indicator --> */}
                                    <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                        Step 1
                                    </div>
                                    {/* <!-- Content takes the remaining space --> */}
                                    <span class="flex-grow">
                                        Join match or invite friend to play.
                                    </span>
                                </div>
                            </div>

                            <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                <div class="flex items-center mt-1">
                                    {/* <!-- Fixed width for step indicator --> */}
                                    <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                        Step 2
                                    </div>
                                    {/* <!-- Content takes the remaining space --> */}
                                    <span class="flex-grow">
                                        Fill claim form to win the match.
                                    </span>
                                </div>
                            </div>

                            <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                <div class="flex items-center mt-1">
                                    {/* <!-- Fixed width for step indicator --> */}
                                    <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                        Step 3
                                    </div>
                                    {/* <!-- Content takes the remaining space --> */}
                                    <span class="flex-grow">
                                        Fill dispute form if not satisfied with
                                        result.
                                    </span>
                                </div>
                            </div>

                            <div class="p-3 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                <div class="flex items-center mt-1">
                                    {/* <!-- Fixed width for step indicator --> */}
                                    <div class="text-yellow-200  font-semibold w-16 flex-shrink-0">
                                        Step 4
                                    </div>
                                    {/* <!-- Content takes the remaining space --> */}
                                    <span class="flex-grow">
                                        Get winning prize within 24 hours
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
                {matchData &&
                    matchData?.length &&
                    matchData
                        ?.filter((item) => item.status !== "cancelled")
                        .map((item) => (
                            <MatchItem
                                key={item?.id}
                                title={item?.Game.name}
                                registeredTeams={item?.registeredTeams}
                                date={item?.date}
                                slug={item?.slug}
                                player={item?.player}
                                video_link={item?.liveStreaming?.link}
                                teamImage1={item?.teams[0]?.logo?.src}
                                teamImage2={item?.teams[1]?.logo?.src}
                                tesmSlug1={item?.teams[0]?.slug}
                                tesmSlug2={item?.teams[1]?.slug}
                                pageDetails={item}
                                setRefresh={setRefresh}
                                refresh={refresh}
                            />
                        ))}
            </div>
        </section>
    ) : null;
};

export default MatchHistory;

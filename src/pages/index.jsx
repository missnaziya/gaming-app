import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import HeroArea from "../container/home/hero";
import WelcomeFeaturesArea from "../container/home/welcome-features";
import WatchLiveStremingArea from "../container/home/watch-live-streaming";
import MatchArea from "../container/home/match";
import PopulerGamesArea from "../container/home/popular-game";
import TestimonialArea from "../container/home/testimonial";
import LatestBlogArea from "../container/home/latest-blog";
import { graphql, navigate } from "gatsby";
import { normalizedData } from "@utils/functions";
import FunfactArea from "../container/home/funfact";
import MatchDashboard from "../components/match-dashboard";
import Dashboard from "../components/dashboard";
import PageBreadcrumb from "../components/pagebreadcrumb";

const IndexPage = ({ data, pageContext, location }) => {
    // const isAuthAvailable = null;

    // isAuthAvailable = typeof window !== "undefined"
    //     ? JSON.parse(localStorage.getItem("auth"))?.isLogin
    //         ? JSON.parse(localStorage.getItem("auth"))
    //         : {}
    //     : {};

    useEffect(() => {
        let isAuthAvailable = false;
        if (typeof window !== "undefined") {
            isAuthAvailable =
                localStorage.getItem("auth") !== null
                    ? JSON.parse(localStorage.getItem("auth"))
                    : false;
            isAuthAvailable = isAuthAvailable?.isLogin;
        }
        if (process.env.GATSBY_IS_MOBILE == "1" && !isAuthAvailable) {
            navigate("/login");
        }
    }, []);
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const content = normalizedData(data?.page?.content || []);
    return (
        <Layout
            data={{
                ...globalContent["menu"],
                ...globalContent["footer"],
            }}
        >
            <SEO title="Home" pathname="/" />
            {process.env.GATSBY_IS_MOBILE == "0" ? (
                <HeroArea data={content["hero-section"]} />
            ) : (
                <>
                    <PageBreadcrumb
                        pageContext={pageContext}
                        location={location}
                        title="Dashboard"
                    />
                    <Dashboard />
                </>
            )}
            <MatchDashboard />
            <WelcomeFeaturesArea data={content["welcome-section"]} />

            {/* <WatchLiveStremingArea data={{ items: data.allMatch.nodes }} /> */}
            {/* <MatchArea
                data={{
                    ...content["upcoming-match"],
                    items: data.allMatch.nodes,
                }}
            /> */}
            {/* <FunfactArea data={content["funfact-section"]} /> */}
            {/* <PopulerGamesArea
                data={{
                    ...content["populer-games-section"],
                    items: data.allGames.nodes,
                }}
            /> */}
            {/* <TestimonialArea data={content["testimonial-section"]} /> */}
            {/* <LatestBlogArea
                data={{
                    ...content["latest-section"],
                    items: data.latestPosts.nodes,
                }}
            /> */}
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        page: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        allMatch: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        allGames: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        latestPosts: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};

export const query = graphql`
    query homePageQuery {
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
        allMatch(sort: { date: DESC }, limit: 3) {
            nodes {
                ...Matchs
            }
        }
        allGames(sort: { date: DESC }, limit: 4) {
            nodes {
                ...Games
            }
        }
        latestPosts: allArticle(limit: 4, sort: { postedAt: { date: DESC } }) {
            nodes {
                ...Articles
                image {
                    alt
                    src {
                        childImageSharp {
                            gatsbyImageData(
                                height: 200
                                width: 200
                                quality: 100
                            )
                        }
                    }
                }
            }
        }
    }
`;

export default IndexPage;

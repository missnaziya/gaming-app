import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import PageBreadcrumb from "../components/pagebreadcrumb";
import MatchArea from "../container/all-match/match";
import { graphql } from "gatsby";
import { normalizedData } from "@utils/functions";
import FunfactArea from "../container/home/funfact";
import ComingSoon from "../components/common/coming-soon";
import axios from "axios";
import { toast } from "react-toastify";
import { navigate } from "gatsby";
import KonfehtiService from "../constants/konfehti-api";
import { ADD_PLAYER } from "../constants/endpoints";
import { showMessage } from "../utils/toast-message";

const MatchPage = ({ data, location, pageContext }) => {
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const content = normalizedData(data?.page.content || []);

    const authData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("auth"))?.isLogin
                ? JSON.parse(localStorage.getItem("auth"))
                : {}
            : {};
    const extractRMCCode = () => {
        if (typeof window !== "undefined") {
            // Assuming you want to extract the code from the current window's URL
            const queryString = window.location.search;

            // The URLSearchParams interface defines utility methods to work with the query string of a URL
            const urlParams = new URLSearchParams(queryString);

            // Get the value of the 'rmc' parameter
            const rmcCode = urlParams.get("rmc");

            return rmcCode;
        }
        return "";
    };

    const removeRMCCodeFromURL = () => {
        if (typeof window !== "undefined") {
            // Extract the current page's URL excluding the domain
            const pathName = window.location.pathname;
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            // Remove the 'rmc' parameter
            urlParams.delete("rmc");

            // Construct the new URL without the 'rmc' parameter
            const newUrl = `${pathName}?${urlParams.toString()}`;

            // Use history.replaceState to update the URL without reloading the page
            window.history.replaceState({}, "", newUrl);
        }
    };

    // Example usage of the extractRMCCode function
    let rmcCode = extractRMCCode();
    useEffect(() => {
        console.log("RMC Code:", rmcCode);
        if (rmcCode) {
            joinMatch(rmcCode);
            removeRMCCodeFromURL();

            rmcCode = null;
        }
        // Here, you can do whatever you need with the rmcCode
    }, []);

    const joinMatch = (code) => {
        let isAuthAvailable = false;

        let w_amount = 0;
        if (typeof window !== "undefined") {
            isAuthAvailable =
                localStorage.getItem("auth") !== null
                    ? JSON.parse(localStorage.getItem("auth"))
                    : false;
            isAuthAvailable = isAuthAvailable?.isLogin;
            w_amount = JSON.parse(localStorage.getItem("auth"))?.wallet;
        }
        if (isAuthAvailable) {
            getData(code);
        } else {
            navigate("/login");
        }
    };

    const getData = async (code) => {
        try {
            // const apiUrl = `playerapi/addplayer`;

            const result = await KonfehtiService.post(ADD_PLAYER, {
                match_code: code,
                user_id: authData.user_id,
            });
            // console.log("RESULT:", result?.data?.response);
            if (result?.data?.code === 200) {
                showMessage("Match Begin!!");
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response.data.message == "Insufficient Funds Fees,") {
                showMessage(
                    "Insufficient balance!! Please add money to your wallet."
                );

                setTimeout(() => {
                    navigate("/wallet");
                }, 3000);
            } else {
                showMessage(error.response.data.message);
            }
        }
    };
    return (
        <Layout
            data={{
                ...globalContent["menu"],
                ...globalContent["footer"],
            }}
        >
            <SEO title="Match Page" pathname="/" />
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Match"
            />
            {/* <ComingSoon /> */}
            <MatchArea />
            {/* <FunfactArea
                className=" -mt-10"
                data={content["funfact-section"]}
            /> */}
        </Layout>
    );
};

MatchPage.propTypes = {
    location: PropTypes.object,
    pageContext: PropTypes.object,
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
    }),
};

export const query = graphql`
    query matchPageQuery {
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
        page(title: { eq: "matchPage" }, pageType: { eq: innerpage }) {
            content {
                ...PageContentAll
            }
        }
        allMatch(sort: { date: DESC }) {
            nodes {
                ...Matchs
            }
        }
    }
`;

export default MatchPage;

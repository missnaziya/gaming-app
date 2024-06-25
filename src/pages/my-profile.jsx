import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import SEO from "@components/seo";
import Layout from "@layout";
import { graphql } from "gatsby";
import { normalizedData } from "@utils/functions";
import PageBreadcrumb from "../components/pagebreadcrumb";
import Profile from "../container/profile";

const MyProfilePage = ({ data, location, pageContext }) => {
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const content = normalizedData(data?.page.content || []);

    // Check if authentication is not available
    if (typeof window !== "undefined") {
        if (!JSON.parse(localStorage.getItem("auth"))?.isLogin) {
            // Navigate to the home page
            navigate("/");
            return null; // Prevent further rendering
        }
    }

    return (
        <Layout
            data={{
                ...globalContent["menu"],
                ...globalContent["footer"],
            }}
        >
            <SEO title="Profile Page" pathname="/" />
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Profile"
            />

            {/* <  data={content["login-section"]} /> */}
            <Profile data={content["profile-section"]} />
        </Layout>
    );
};

MyProfilePage.propTypes = {
    location: PropTypes.object,
    pageContext: PropTypes.object,
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        page: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
    }),
};

export const query = graphql`
    query LoginPageQuery {
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
        page(title: { eq: "ProfilePage" }, pageType: { eq: innerpage }) {
            content {
                ...PageContentAll
            }
        }
    }
`;

export default MyProfilePage;

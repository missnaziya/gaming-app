import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import { graphql, navigate } from "gatsby";
import { normalizedData } from "@utils/functions";
import MyNotifications from "../components/notification";
import PageBreadcrumb from "../components/pagebreadcrumb";



const Notifications = ({ data, location, pageContext }) => {
   
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    return (
        <Layout
            data={{
                ...globalContent["menu"],
                ...globalContent["footer"],
            }}
        >
            <SEO title="Wallet Page" pathname="/" />
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Notifications"
            />
            <div className="match-post-content-wrapper">
                <div className="container">
                 <MyNotifications />
                </div>
            </div>
        </Layout>
    );
};

Notifications.propTypes = {
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
    query contactUsPageQuery {
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
        page(title: { eq: "contactUsPage" }, pageType: { eq: innerpage }) {
            content {
                ...PageContentAll
            }
        }
    }
`;

export default Notifications;

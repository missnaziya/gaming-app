import React, { Fragment } from "react";
import PropTypes from "prop-types";
import GamingUpdateArea from "./gaming-update-widget";
import FooterInfoWidget from "@components/widget/footer-info-widget";
import FooterContactInfoWidget from "@components/widget/footer-contact-info-widget";
import FooterWinnerWidget from "@components/widget/todays-winners-widget";
import FooterMemuList from "@components/widget/contact-menu-widget";
import { navigate } from "gatsby";

const Footer = ({ data, connectNowcard }) => {
    const showConnectNowCard =
        connectNowcard === undefined ? true : connectNowcard;
    return (
        <Fragment>
            {showConnectNowCard && <GamingUpdateArea />}
            {process.env.GATSBY_IS_MOBILE == "0" && (
                <footer>
                    <div className="py-16 md:py-24">
                        <div className="container">
                            <div className="grid gap-8 md:gap-6 lg:gap-6 xxl:gap-16 grid-cols-1 sm:grid-cols-12">
                                <div className="footer_widget_list sm:col-span-6 lg:col-span-4 lg:mr-12">
                                    <FooterInfoWidget
                                        infoData={data?.footer?.[0]}
                                    />
                                </div>
                                <div className="footer_widget_list sm:col-span-6 lg:col-span-3">
                                    <FooterContactInfoWidget
                                        infoData={data?.footer?.[1]}
                                    />
                                </div>
                                <div className="footer_widget_list sm:col-span-6 lg:col-span-3">
                                    <FooterWinnerWidget
                                        infoData={data?.footer?.[2]}
                                    />
                                </div>
                                <div className="footer_widget_list sm:col-span-6 lg:col-span-2">
                                    <FooterMemuList
                                        infoData={data?.footer?.[3]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom bg-secondary-70">
                        <div className="container">
                            <div className=" flex flex-col md:flex-row md:justify-between items-center py-6">
                                <div className="">
                                    &copy; {new Date().getFullYear()} KONFEHTTI{" "}
                                    <i className="icofont-heart"></i> the
                                    <a
                                        className="hover:text-primary"
                                        // href="https://test.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {" "}
                                        gaming world
                                    </a>
                                </div>
                                <div className="footer-copyright-right">
                                    <div className="flex">
                                        <a
                                            onClick={() => {
                                                if (
                                                    typeof window !==
                                                    "undefined"
                                                ) {
                                                    navigate("/term-condition");
                                                }
                                            }}
                                            // href="/term-condition"
                                            className="text-white hover:text-primary cursor-pointer"
                                        >
                                            Terms &amp; Condition{" "}
                                        </a>
                                        <span className="mx-3"> || </span>
                                        <a
                                            // href="/privacy-policy"
                                            onClick={() => {
                                                if (
                                                    typeof window !==
                                                    "undefined"
                                                ) {
                                                    navigate("/privacy-policy");
                                                }
                                            }}
                                            className="text-white hover:text-primary cursor-pointer"
                                        >
                                            Privacy Policy{" "}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </Fragment>
    );
};
Footer.propTypes = {
    data: PropTypes.shape({
        footer: PropTypes.arrayOf(
            PropTypes.shape({
                link: PropTypes.string,
                title: PropTypes.string,
            })
        ),
    }),
};
export default Footer;

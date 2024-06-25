import React, { useState } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import { graphql, Link } from "gatsby";
import { normalizedData } from "@utils/functions";
import PageBreadcrumb from "../../components/pagebreadcrumb";
import Button from "../../components/shared/button";
import { DiscussionEmbed } from "disqus-react";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import LiveStreaming from "../../components/live-streaming";
import ContentText from "../../components/content-text";
import Swiper, { SwiperSlide } from "@components/shared/swiper";
import Popup from "../../components/common/Popup";
import { Formik, useFormik } from "formik";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/common/Loader/LoadingScreen";
import { showMessage } from "../../utils/toast-message";

const MatchDetails = ({ data, location, pageContext }) => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            userId: "", // Initial value for selected user id
        },
        // Form validation schema
        validate: (values) => {
            const errors = {};
            if (!values.userId) {
                errors.userId = "Please select a user";
            }
            return errors;
        },
        // Form submission logic goes here
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });

    // Define users array
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
        // Add more users as needed
    ];

    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const pageDetail = location?.state?.details;
    // console.log("matchDetailsID:",location);
    pageContext = {
        ...pageContext,
        breadcrumb: {
            crumbs: pageContext?.breadcrumb?.crumbs.map((item, ind) =>
                ind === 2
                    ? {
                          pathname: `/match/${pageDetail?.slug}`,
                          crumbLabel: pageDetail?.slug,
                      }
                    : item
            ),
            location: `/match/${pageDetail?.slug}`,
        },
    };
    // console.log("----pageContext:::", pageContext);
    // console.log("----pageDetail:::", pageDetail);
    // const content = normalizedData(pageDetail?.content || []);
    // Base Url
    const baseUrl = "https://bonx.com";
    // Disqus Comments add
    const disqusShorttname = "mitech-1";
    const disquscConfig = {
        identifier: pageDetail?.id,
        title: pageDetail?.title,
        url: baseUrl + "/" + pageContext.slug,
    };

    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    return (
        <>
            {loading && <LoadingScreen />}

            <Layout
                data={{
                    ...globalContent["menu"],
                    ...globalContent["footer"],
                }}
            >
                <SEO title="Match Details" pathname="/" />
                <PageBreadcrumb
                    pageContext={pageContext}
                    location={location}
                    title="Match Details"
                />
                <div className="match-post-content-wrapper">
                    <div className="container">
                        <div className="grid grid-cols-1">
                            <div className="single-grid">
                                <div className="this-match-teams mb-10">
                                    <div className="px-10 py-8 space-x-8 rounded-3xl flex justify-center items-center lg:justify-between lg:max-w-sm m-auto border-4 border-secondary-90">
                                        <div className="mx-1.5">
                                            <Link
                                                to={`/bettle-teams/${pageDetail?.teams[0]?.slug}`}
                                            >
                                                <GatsbyImage
                                                    className="md:h-auto"
                                                    image={getImage(
                                                        pageDetail?.teams[0]
                                                            ?.logo.src
                                                    )}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="mx-3.5">
                                            <StaticImage
                                                src="../../data/images/team-logo/game-vs1.webp"
                                                alt=""
                                            />
                                        </div>
                                        <div className="mx-1.5">
                                            {pageDetail?.teams[1]?.logo?.src ? (
                                                <Link
                                                    to={`/bettle-teams/${pageDetail?.teams[1]?.slug}`}
                                                >
                                                    <GatsbyImage
                                                        className="md:h-auto"
                                                        image={getImage(
                                                            pageDetail?.teams[1]
                                                                ?.logo?.src
                                                        )}
                                                        alt=""
                                                    />
                                                </Link>
                                            ) : (
                                                <StaticImage
                                                    src="../../data/images/question-mark.jpg"
                                                    alt=""
                                                    style={{
                                                        height: "119px",
                                                        width: "102px",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="live-stream-box">
                                    <LiveStreaming
                                        title={
                                            pageDetail?.liveStreaming
                                                ?.headings[0]?.content
                                        }
                                        image={
                                            pageDetail?.liveStreaming?.images[0]
                                                ?.src
                                        }
                                        video_link={
                                            pageDetail?.liveStreaming?.link
                                        }
                                    />
                                </div>

                                <div className="match_details_counterup flex flex-col sm:flex-row justify-between items-center py-12 mb-12 border-b-2 border-secondary-80 ">
                                    <div className="match_counterup_inner flex items-center">
                                        <div className="match_counterup_list mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                                            <span className="text-primary font-bold">
                                                PLAYER:
                                            </span>
                                            <h2 className="counterup font-bold mt-3">
                                                {pageDetail?.playerNumber}
                                            </h2>
                                            <span className="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"></span>
                                        </div>
                                        <div className="match_counterup_list mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                                            <span className="text-primary font-bold">
                                                TEAM:
                                            </span>
                                            <h2 className="font-bold mt-3">
                                                {pageDetail?.teamNubmber}
                                            </h2>
                                            <span className="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"></span>
                                        </div>
                                        <div className="match_counterup_list pt-4">
                                            <span className="text-primary font-bold">
                                                WINNING PRIZE:
                                            </span>
                                            <h2 className="font-bold mt-3">
                                                {"$"}
                                                {pageDetail?.winningPrize}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="join_now_btn mt-10 sm:top-0">
                                        <Button
                                            path={""}
                                            // btnType={btnType}
                                            onClick={
                                                () => setShowCreateModal(true)
                                                //   ()=>{showMessage("Invitation sent successfully")}
                                            }
                                            className="text-white block btn-bg-image-large mr-3"
                                        >
                                            CREATE
                                        </Button>
                                        {pageDetail?.teams[1] ? (
                                            <Button
                                                path={""}
                                                // btnType={btnType}
                                                onClick={
                                                    () => setShowModal(true)
                                                    //   ()=>{showMessage("Invitation sent successfully")}
                                                }
                                                className="text-white block btn-bg-image-large"
                                            >
                                                JOIN
                                            </Button>
                                        ) : (
                                            <Button
                                                // btnType={btnType}
                                                onClick={
                                                    // () => setShowModal(true)
                                                    () => {
                                                        showMessage(
                                                            "Invitation sent successfully"
                                                        );
                                                    }
                                                }
                                                className="text-white block btn-bg-image-large"
                                            >
                                                INVITE +
                                            </Button>
                                        )}

                                        {/* Create BTN popup */}
                                        <Popup
                                            btnType={"submit"}
                                            open={showCreateModal}
                                            setOpen={setShowCreateModal}
                                            modalTitle={"ROOM CREATED"}
                                            body={
                                                <>
                                                    <form
                                                        onSubmit={
                                                            formik.handleSubmit
                                                        }
                                                    >
                                                        <div class="p-4 rounded-lg shadow-sm shadow-purple-300 bg-transparent">
                                                            <label
                                                                for="roomCode"
                                                                class="block text-sm font-medium text-white-700"
                                                            >
                                                                Room Code
                                                            </label>
                                                            <div class="flex items-center justify-between mt-1">
                                                                <span
                                                                    id="roomCode"
                                                                    class="text-white-900 text-md"
                                                                >
                                                                    ABE12345
                                                                </span>
                                                                <button
                                                                    class="ml-4 bg-purple-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center focus:outline-none focus:shadow-outline"
                                                                    onclick="copyRoomCode()"
                                                                >
                                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-full mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm-3 6a3 3 0 100 6 3 3 0 000-6zm6-3a3 3 0 11-6 0 3 3 0 016 0zm-6 3a3 3 0 100 6 3 3 0 000-6zm6-3a3 3 0 11-6 0 3 3 0 016 0zm-6 3a3 3 0 100 6 3 3 0 000-6z" />
            </svg> */}
                                                                    <i className="icofont-copy"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="single-fild mt-8"></div>
                                                        <div className="single-fild mt-8"></div>
                                                    </form>
                                                    <div className="flex flex-col items-center sm:flex-row mt-8">
                                                        <Button
                                                            path={""}
                                                            // btnType={btnType}
                                                            onClick={
                                                                () =>
                                                                    setShowCreateModal(
                                                                        true
                                                                    )
                                                                //   ()=>{showMessage("Invitation sent successfully")}
                                                            }
                                                            className="text-white block btn-bg-image-large mr-3 mt-8"
                                                        >
                                                            INVITE A FRIEND
                                                        </Button>

                                                        <Button
                                                            path={""}
                                                            // btnType={btnType}
                                                            onClick={
                                                                // () =>
                                                                //     setShowCreateModal(
                                                                //         true
                                                                //     )
                                                                () => {
                                                                    showMessage(
                                                                        "Invitation sent successfully"
                                                                    );
                                                                }
                                                            }
                                                            className="text-white block btn-bg-image-large mr-3 mt-8"
                                                        >
                                                            INVITE RANDOM
                                                        </Button>
                                                    </div>
                                                </>
                                            }
                                            // closeBtnTitle={{
                                            //     title: "",
                                            //     click: () => console.log("HI"),
                                            // }}
                                        />
                                        {/* CREATE BTN  POPUP END */}

                                        {/*  JOIN BTN MODAL POPUP START */}
                                        <Popup
                                            btnType={"submit"}
                                            open={showModal}
                                            setOpen={setShowModal}
                                            modalTitle={"Enter Private code"}
                                            body={
                                                <>
                                                    <form
                                                        onSubmit={
                                                            formik.handleSubmit
                                                        }
                                                    >
                                                        <div className="single-fild mt-6">
                                                            <input
                                                                type="text"
                                                                name="userId"
                                                                className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                                                                value={
                                                                    formik
                                                                        .values
                                                                        .userId
                                                                }
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                                onBlur={
                                                                    formik.handleBlur
                                                                }
                                                                placeholder="Enter Private code here"
                                                                style={{
                                                                    color: "white",
                                                                }} // Set the color to white
                                                            />

                                                            {/* <select
                name="userId" // Assuming you'll store selected user's id
                className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ color: "white" }} // Set the color to white
            >
                <option value="" disabled>
                    Select User
                </option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select> */}
                                                            <div className="error">
                                                                {formik.errors
                                                                    .userId &&
                                                                    formik
                                                                        .touched
                                                                        .userId &&
                                                                    formik
                                                                        .errors
                                                                        .userId}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </>
                                            }
                                            closeBtnTitle={{
                                                title: "Join Room",
                                                click: () => console.log("HI"),
                                            }}
                                        />

                                        {/* <Popup
                                     btnType={"submit"}
                                        open={showModal} 
                                        setOpen={setShowModal} 
                                        modalTitle={"Invite Friend"} 
                                        body={<>
                                            <form onSubmit={formik.handleSubmit}>
                                            <div className="single-fild mt-6">
            <select
                name="userId" // Assuming you'll store selected user's id
                className={`px-6 h-14  border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none`}
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ color: "white" }} // Set the color to white
            >
                <option value="" disabled>
                    Select User
                </option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <div className="error">
                {formik.errors.userId &&
                    formik.touched.userId &&
                    formik.errors.userId}
            </div>
        </div>
                                               </form>
                                        </>}
                                        closeBtnTitle={{ title: "Invite", click: ()=>(console.log("HI")) }}
                                          /> */}
                                        {/* MODAL POPUP END */}
                                    </div>
                                </div>

                                <div className="content-box">
                                    <p className="date text-primary font-bold mb-3">
                                        {pageDetail?.date}
                                    </p>
                                    <h2 className="font-bold">
                                        {pageDetail?.title}{" "}
                                    </h2>

                                    <div className="content-details">
                                        {/* <ContentText data={content} /> */}

                                        {pageDetail?.content && (
                                            <div className="description mt-6">
                                                <p className="leading-8">
                                                    {pageDetail?.content}
                                                </p>
                                            </div>
                                        )}

                                        {pageDetail?.quoteText && (
                                            <blockquote className="py-5 mb-5">
                                                <p className="font-bold text-yollow-90 italic text-22base lg:text-28base">
                                                    {pageDetail?.quoteText}
                                                </p>
                                            </blockquote>
                                        )}

                                        {/* <ContentText data={content} /> */}
                                        {/* {pageDetail?.content && (
                                        <div className="description mt-6">
                                            <p className="leading-8">
                                                {pageDetail?.content}
                                            </p>
                                        </div>
                                    )} */}
                                    </div>

                                    <div className="team-player">
                                        <div className="teams-players-one mt-15">
                                            {pageDetail?.teams[0] && (
                                                <h5 className="text-primary uppercase font-bold">
                                                    TEAM - 01
                                                </h5>
                                            )}

                                            {pageDetail?.teams[0] && (
                                                <h3 className="font-bold uppercase lg:text-xl">
                                                    {pageDetail?.teams[0]?.name}{" "}
                                                    PLAYERS
                                                </h3>
                                            )}

                                            {pageDetail?.teams &&
                                                pageDetail?.teams[0] &&
                                                pageDetail?.teams[0]
                                                    ?.teamPlayer && (
                                                    <Swiper
                                                        layout={{
                                                            nav: "team-players-navigation",
                                                            dots: "team-players-dots-style",
                                                        }}
                                                        navigation={{
                                                            nextEl: ".team-players-slider-button-next",
                                                            prevEl: ".team-players-slider-button-prev",
                                                        }}
                                                        slidesPerView={2}
                                                        spaceBetween={20}
                                                        breakpoints={{
                                                            320: {
                                                                slidesPerView: 3,
                                                            },
                                                            480: {
                                                                slidesPerView: 4,
                                                            },
                                                            768: {
                                                                slidesPerView: 5,
                                                            },
                                                            992: {
                                                                slidesPerView: 6,
                                                            },
                                                        }}
                                                    >
                                                        {pageDetail?.teams &&
                                                            pageDetail?.teams[0]?.teamPlayer?.map(
                                                                (
                                                                    teamplayer
                                                                ) => (
                                                                    <SwiperSlide
                                                                        key={
                                                                            teamplayer.id
                                                                        }
                                                                    >
                                                                        <div className="players-list mt-5">
                                                                            <GatsbyImage
                                                                                image={getImage(
                                                                                    teamplayer
                                                                                        .images[0]
                                                                                        .src
                                                                                )}
                                                                                alt={
                                                                                    teamplayer
                                                                                        .images[0]
                                                                                        .alt
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </SwiperSlide>
                                                                )
                                                            )}
                                                    </Swiper>
                                                )}
                                        </div>

                                        <div className="teams-players-two mt-15">
                                            {pageDetail?.teams[1] && (
                                                <h5 className="text-primary uppercase font-bold">
                                                    TEAM - 02
                                                </h5>
                                            )}

                                            {pageDetail?.teams &&
                                                pageDetail?.teams[1] && (
                                                    <h3 className="font-bold uppercase lg:text-xl">
                                                        {
                                                            pageDetail?.teams[1]
                                                                ?.name
                                                        }{" "}
                                                        PLAYERS
                                                    </h3>
                                                )}

                                            {pageDetail?.teams &&
                                                pageDetail?.teams[1] &&
                                                pageDetail?.teams[1]
                                                    ?.teamPlayer && (
                                                    <Swiper
                                                        layout={{
                                                            nav: "team-players-navigation",
                                                            dots: "team-players-dots-style",
                                                        }}
                                                        navigation={{
                                                            nextEl: ".team-players-slider-button-next",
                                                            prevEl: ".team-players-slider-button-prev",
                                                        }}
                                                        slidesPerView={2}
                                                        spaceBetween={20}
                                                        breakpoints={{
                                                            320: {
                                                                slidesPerView: 3,
                                                            },
                                                            480: {
                                                                slidesPerView: 4,
                                                            },
                                                            768: {
                                                                slidesPerView: 5,
                                                            },
                                                            992: {
                                                                slidesPerView: 6,
                                                            },
                                                        }}
                                                    >
                                                        {pageDetail?.teams &&
                                                            pageDetail?.teams[1]?.teamPlayer?.map(
                                                                (
                                                                    teamplayer
                                                                ) => (
                                                                    <SwiperSlide
                                                                        key={
                                                                            teamplayer?.id
                                                                        }
                                                                    >
                                                                        <div className="players-list mt-5">
                                                                            <GatsbyImage
                                                                                image={getImage(
                                                                                    teamplayer
                                                                                        ?.images[0]
                                                                                        ?.src
                                                                                )}
                                                                                alt={
                                                                                    teamplayer
                                                                                        ?.images[0]
                                                                                        ?.alt
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </SwiperSlide>
                                                                )
                                                            )}
                                                    </Swiper>
                                                )}
                                        </div>
                                        <div className="teams-description mt-15">
                                            {/* <ContentText data={content} /> */}
                                            {/* {pageDetail?.content && (
                                            <div className="description mt-6">
                                                <p className="leading-8">
                                                    {pageDetail?.content}
                                                </p>
                                            </div>
                                        )} */}
                                        </div>
                                    </div>
                                    {false && (
                                        <div className="mt-14 text-white">
                                            <div className="mb-4">
                                                <h3 className="font-bold">
                                                    Comments
                                                </h3>
                                            </div>
                                            <DiscussionEmbed
                                                shortname={disqusShorttname}
                                                config={disquscConfig}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

MatchDetails.propTypes = {
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

export default MatchDetails;

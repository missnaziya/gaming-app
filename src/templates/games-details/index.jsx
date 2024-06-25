import React from "react";
import PropTypes from "prop-types";
import Layout from "@layout";
import SEO from "@components/seo";
import PageBreadcrumb from "@components/pagebreadcrumb";
import Swiper, { SwiperSlide } from "@components/shared/swiper";
import { graphql } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import { normalizedData } from "@utils/functions";
import ContentText from "../../components/content-text";
import { DiscussionEmbed } from "disqus-react";
const GamesDetails = ({ data ,location, pageContext }) => {
// const gamedata = location.state.detail
//     const mydata = {
//         "allGeneral": {
//             "nodes": [
//                 {
//                     "section": "xmenu",
//                     "id": "35669d38-be41-5ff7-801d-27a81594f590",
//                     "menu": [
//                         {
//                             "id": "menu-1",
//                             "link": "/",
//                             "text": "Home",
//                             "megamenu": null,
//                             "submenu": null
//                         },
//                         {
//                             "id": "menu-2",
//                             "link": "/match",
//                             "text": "Match",
//                             "megamenu": null,
//                             "submenu": null
//                         },
//                         {
//                             "id": "menu-3",
//                             "link": "/faq",
//                             "text": "Pages",
//                             "megamenu": null,
//                             "submenu": [
//                                 {
//                                     "id": "menu-31",
//                                     "link": "/about-us",
//                                     "text": "About Us Page"
//                                 },
//                                 {
//                                     "id": "menu-33",
//                                     "link": "/faq",
//                                     "text": "FAQ's Page"
//                                 },
//                                 {
//                                     "id": "menu-34",
//                                     "link": "/players",
//                                     "text": "Game players"
//                                 },
//                                 {
//                                     "id": "menu-35",
//                                     "link": "/404",
//                                     "text": "404 not found!"
//                                 },
//                                 {
//                                     "id": "menu-36",
//                                     "link": "/login",
//                                     "text": "Login Page"
//                                 },
//                                 {
//                                     "id": "menu-37",
//                                     "link": "/register",
//                                     "text": "Register Page"
//                                 },
//                                 {
//                                     "id": "menu-38",
//                                     "link": "/bettle-teams",
//                                     "text": "Bettle team Page"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "menu-4",
//                             "link": "/blog-grid-without-sidebar",
//                             "text": "blog",
//                             "megamenu": null,
//                             "submenu": [
//                                 {
//                                     "id": "menu-41",
//                                     "link": "/blog-without-sidebar",
//                                     "text": "Blog Without Sidebar Page"
//                                 },
//                                 {
//                                     "id": "menu-42",
//                                     "link": "/blog-left-sidebar",
//                                     "text": "Blog Left Sidebar Page"
//                                 },
//                                 {
//                                     "id": "menu-43",
//                                     "link": "/blog-right-sidebar",
//                                     "text": "Blog Right Sidebar Page"
//                                 },
//                                 {
//                                     "id": "menu-44",
//                                     "link": "/blog-grid-left-sidebar",
//                                     "text": "Blog Grid Left Sidebar Page"
//                                 },
//                                 {
//                                     "id": "menu-45",
//                                     "link": "/blog-grid-without-sidebar",
//                                     "text": "Blog Grid Without Sidebar"
//                                 },
//                                 {
//                                     "id": "menu-46",
//                                     "link": "/blog-grid-left-sidebar",
//                                     "text": "Blog Grid Left Sidebar"
//                                 },
//                                 {
//                                     "id": "menu-47",
//                                     "link": "/blog-grid-right-sidebar",
//                                     "text": "Blog Grid Right Sidebar"
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "menu-5",
//                             "link": "/contact-us",
//                             "text": "Contact",
//                             "megamenu": null,
//                             "submenu": null
//                         }
//                     ],
//                     "footer": null
//                 },
//                 {
//                     "section": "footer",
//                     "id": "4315067f-bfbf-5477-8f89-b340edb0b00f",
//                     "menu": null,
//                     "footer": [
//                         {
//                             "id": "footer-1",
//                             "icon": null,
//                             "link": null,
//                             "text": "It long estabhed fact that reader will ditracted the readable content looking using readable.",
//                             "title": null,
//                             "contact_info": null,
//                             "list": null,
//                             "socials": [
//                                 {
//                                     "id": "1",
//                                     "icon": "icofont-facebook",
//                                     "link": "https://www.facebook.com",
//                                     "title": "facebook"
//                                 },
//                                 {
//                                     "id": "2",
//                                     "icon": "icofont-dribbble",
//                                     "link": "https://dribbble.com",
//                                     "title": "dribbble"
//                                 },
//                                 {
//                                     "id": "3",
//                                     "icon": "icofont-youtube-play",
//                                     "link": "https://www.youtube.com",
//                                     "title": "youtube"
//                                 },
//                                 {
//                                     "id": "4",
//                                     "icon": "icofont-twitter",
//                                     "link": "https://www.twitter.com",
//                                     "title": "twitter"
//                                 }
//                             ],
//                             "images": null
//                         },
//                         {
//                             "id": "footer-2",
//                             "icon": null,
//                             "link": null,
//                             "text": null,
//                             "title": "CONTACT",
//                             "contact_info": [
//                                 {
//                                     "id": "contact_info-21",
//                                     "text": "136 Harding Ave Wheeling, West Virginia",
//                                     "title": "Location"
//                                 },
//                                 {
//                                     "id": "contact_info-22",
//                                     "text": "00 (62) 632 867 4497",
//                                     "title": "Phone"
//                                 }
//                             ],
//                             "list": null,
//                             "socials": null,
//                             "images": null
//                         },
//                         {
//                             "id": "footer-3",
//                             "icon": null,
//                             "link": null,
//                             "text": null,
//                             "title": "Information",
//                             "contact_info": null,
//                             "list": null,
//                             "socials": null,
//                             "images": [
//                                 {
//                                     "alt": "GAME TOURNAMENTS",
//                                     "src": {
//                                         "childImageSharp": {
//                                             "gatsbyImageData": {
//                                                 "layout": "constrained",
//                                                 "backgroundColor": "#080808",
//                                                 "images": {
//                                                     "fallback": {
//                                                         "src": "/static/8a70da1cc61053ce3247477282967551/2f873/upcoming-game-thumb1.webp",
//                                                         "srcSet": "/static/8a70da1cc61053ce3247477282967551/be195/upcoming-game-thumb1.webp 24w,\n/static/8a70da1cc61053ce3247477282967551/a5523/upcoming-game-thumb1.webp 49w,\n/static/8a70da1cc61053ce3247477282967551/2f873/upcoming-game-thumb1.webp 97w",
//                                                         "sizes": "(min-width: 97px) 97px, 100vw"
//                                                     },
//                                                     "sources": []
//                                                 },
//                                                 "width": 97,
//                                                 "height": 119
//                                             }
//                                         }
//                                     }
//                                 },
//                                 {
//                                     "alt": "LIVE STREAMING",
//                                     "src": {
//                                         "childImageSharp": {
//                                             "gatsbyImageData": {
//                                                 "layout": "constrained",
//                                                 "backgroundColor": "#080808",
//                                                 "images": {
//                                                     "fallback": {
//                                                         "src": "/static/371d99f93252437e28ee990e6cd87a81/53638/upcoming-game-thumb2.webp",
//                                                         "srcSet": "/static/371d99f93252437e28ee990e6cd87a81/06130/upcoming-game-thumb2.webp 23w,\n/static/371d99f93252437e28ee990e6cd87a81/84710/upcoming-game-thumb2.webp 47w,\n/static/371d99f93252437e28ee990e6cd87a81/53638/upcoming-game-thumb2.webp 93w",
//                                                         "sizes": "(min-width: 93px) 93px, 100vw"
//                                                     },
//                                                     "sources": []
//                                                 },
//                                                 "width": 93,
//                                                 "height": 120
//                                             }
//                                         }
//                                     }
//                                 },
//                                 {
//                                     "alt": "GAME TOURNAMENTS",
//                                     "src": {
//                                         "childImageSharp": {
//                                             "gatsbyImageData": {
//                                                 "layout": "constrained",
//                                                 "backgroundColor": "#080808",
//                                                 "images": {
//                                                     "fallback": {
//                                                         "src": "/static/b6308d196419bd419eac36db3d85ccbe/75d30/upcoming-game-thumb3.webp",
//                                                         "srcSet": "/static/b6308d196419bd419eac36db3d85ccbe/29629/upcoming-game-thumb3.webp 26w,\n/static/b6308d196419bd419eac36db3d85ccbe/b5cd5/upcoming-game-thumb3.webp 51w,\n/static/b6308d196419bd419eac36db3d85ccbe/75d30/upcoming-game-thumb3.webp 102w",
//                                                         "sizes": "(min-width: 102px) 102px, 100vw"
//                                                     },
//                                                     "sources": []
//                                                 },
//                                                 "width": 102,
//                                                 "height": 119
//                                             }
//                                         }
//                                     }
//                                 },
//                                 {
//                                     "alt": "LIVE STREAMING",
//                                     "src": {
//                                         "childImageSharp": {
//                                             "gatsbyImageData": {
//                                                 "layout": "constrained",
//                                                 "backgroundColor": "#080808",
//                                                 "images": {
//                                                     "fallback": {
//                                                         "src": "/static/49cdab37cfd501af0f38f6a6cb977d49/deae7/upcoming-game-thumb4.webp",
//                                                         "srcSet": "/static/49cdab37cfd501af0f38f6a6cb977d49/ec2b3/upcoming-game-thumb4.webp 26w,\n/static/49cdab37cfd501af0f38f6a6cb977d49/ded63/upcoming-game-thumb4.webp 53w,\n/static/49cdab37cfd501af0f38f6a6cb977d49/deae7/upcoming-game-thumb4.webp 105w",
//                                                         "sizes": "(min-width: 105px) 105px, 100vw"
//                                                     },
//                                                     "sources": []
//                                                 },
//                                                 "width": 105,
//                                                 "height": 119
//                                             }
//                                         }
//                                     }
//                                 },
//                                 {
//                                     "alt": "GAME TOURNAMENTS",
//                                     "src": {
//                                         "childImageSharp": {
//                                             "gatsbyImageData": {
//                                                 "layout": "constrained",
//                                                 "backgroundColor": "#080808",
//                                                 "images": {
//                                                     "fallback": {
//                                                         "src": "/static/11c3d0d921957d485f13d5083c5b12c0/bafff/upcoming-game-thumb5.webp",
//                                                         "srcSet": "/static/11c3d0d921957d485f13d5083c5b12c0/2b147/upcoming-game-thumb5.webp 30w,\n/static/11c3d0d921957d485f13d5083c5b12c0/857ac/upcoming-game-thumb5.webp 59w,\n/static/11c3d0d921957d485f13d5083c5b12c0/bafff/upcoming-game-thumb5.webp 118w",
//                                                         "sizes": "(min-width: 118px) 118px, 100vw"
//                                                     },
//                                                     "sources": []
//                                                 },
//                                                 "width": 118,
//                                                 "height": 119
//                                             }
//                                         }
//                                     }
//                                 },
//                                 {
//                                     "alt": "LIVE STREAMING",
//                                     "src": {
//                                         "childImageSharp": {
//                                             "gatsbyImageData": {
//                                                 "layout": "constrained",
//                                                 "backgroundColor": "#080808",
//                                                 "images": {
//                                                     "fallback": {
//                                                         "src": "/static/66a226cec3bc11e1a03453e6551ad755/2aa13/upcoming-game-thumb6.webp",
//                                                         "srcSet": "/static/66a226cec3bc11e1a03453e6551ad755/54490/upcoming-game-thumb6.webp 25w,\n/static/66a226cec3bc11e1a03453e6551ad755/47c5a/upcoming-game-thumb6.webp 50w,\n/static/66a226cec3bc11e1a03453e6551ad755/2aa13/upcoming-game-thumb6.webp 100w",
//                                                         "sizes": "(min-width: 100px) 100px, 100vw"
//                                                     },
//                                                     "sources": []
//                                                 },
//                                                 "width": 100,
//                                                 "height": 119
//                                             }
//                                         }
//                                     }
//                                 }
//                             ]
//                         },
//                         {
//                             "id": "footer-4",
//                             "icon": null,
//                             "link": null,
//                             "text": null,
//                             "title": "Follow Us",
//                             "contact_info": null,
//                             "list": [
//                                 {
//                                     "id": "footer-follow-01",
//                                     "link": "https://facebook.com",
//                                     "text": "Facebook",
//                                     "icon": null
//                                 },
//                                 {
//                                     "id": "footer-follow-02",
//                                     "link": "https://twitter.com",
//                                     "text": "Twitter",
//                                     "icon": null
//                                 },
//                                 {
//                                     "id": "footer-follow-03",
//                                     "link": "https://linkedin.com",
//                                     "text": "Linkedin",
//                                     "icon": null
//                                 },
//                                 {
//                                     "id": "footer-follow-04",
//                                     "link": "https://instagram.com",
//                                     "text": "Instagram",
//                                     "icon": null
//                                 }
//                             ],
//                             "socials": null,
//                             "images": null
//                         }
//                     ]
//                 },
//                 {
//                     "section": "menu",
//                     "id": "7888cf05-3527-5e8e-a20a-ec75b498d6e4",
//                     "menu": [
//                         {
//                             "id": "menu-1",
//                             "link": "/",
//                             "text": "Home",
//                             "megamenu": null,
//                             "submenu": null
//                         },
//                         {
//                             "id": "menu-2",
//                             "link": "/match",
//                             "text": "Match",
//                             "megamenu": null,
//                             "submenu": null
//                         },
//                         {
//                             "id": "menu-3",
//                             "link": "",
//                             "text": "Pages",
//                             "megamenu": null,
//                             "submenu": null
//                         },
//                         {
//                             "id": "menu-5",
//                             "link": "/contact-us",
//                             "text": "Contact",
//                             "megamenu": null,
//                             "submenu": null
//                         }
//                     ],
//                     "footer": null
//                 }
//             ]
//         },
//         "games": 
//         gamedata
//         // {
//         //     "id": "caad4ca4-4ba9-51c5-8a13-64a1c42ca46c",
//         //     "slug": "alien-space-saven-star",
//         //     "title": "Alien Space Saven Star",
//         //     "gameThum": {
//         //         "alt": "Anonymous",
//         //         "src": {
//         //             "childImageSharp": {
//         //                 "gatsbyImageData": {
//         //                     "layout": "constrained",
//         //                     "backgroundColor": "#081838",
//         //                     "images": {
//         //                         "fallback": {
//         //                             "src": "/static/d8361c905e8aa92432541d1272f2e399/a3622/popular-game-thumb6.webp",
//         //                             "srcSet": "/static/d8361c905e8aa92432541d1272f2e399/0c23d/popular-game-thumb6.webp 143w,\n/static/d8361c905e8aa92432541d1272f2e399/c1a5e/popular-game-thumb6.webp 285w,\n/static/d8361c905e8aa92432541d1272f2e399/a3622/popular-game-thumb6.webp 570w",
//         //                             "sizes": "(min-width: 570px) 570px, 100vw"
//         //                         },
//         //                         "sources": []
//         //                     },
//         //                     "width": 570,
//         //                     "height": 330
//         //                 }
//         //             }
//         //         }
//         //     },
//         //     "buttons": [
//         //         {
//         //             "color": null,
//         //             "shape": null,
//         //             "path": null,
//         //             "id": "1",
//         //             "content": "Game Details",
//         //             "size": "lg"
//         //         }
//         //     ],
//         //     "categories": [
//         //         {
//         //             "title": "Hunter Sniper",
//         //             "slug": "hunter-sniper"
//         //         },
//         //         {
//         //             "title": "Collage",
//         //             "slug": "collage"
//         //         }
//         //     ],
//         //     "date": "2021-01-02 13:01:00",
//         //     "updated": "2021-01-02",
//         //     "size": "98MB",
//         //     "installs": "80,000,000+",
//         //     "currentVersion": "03.00.28.00.00",
//         //     "inAppProducts": "$0.85 - $985.00",
//         //     "quoteText": "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the 1500 printer took galley of type scrambled it to make a type specimen book.",
//         //     "images": [
//         //         {
//         //             "alt": "Games Details",
//         //             "src": {
//         //                 "childImageSharp": {
//         //                     "gatsbyImageData": {
//         //                         "layout": "constrained",
//         //                         "backgroundColor": "#282828",
//         //                         "images": {
//         //                             "fallback": {
//         //                                 "src": "/static/b160641ae55b008a0e48a74273dfc14a/0a8d7/game-details-thumb.webp",
//         //                                 "srcSet": "/static/b160641ae55b008a0e48a74273dfc14a/10675/game-details-thumb.webp 293w,\n/static/b160641ae55b008a0e48a74273dfc14a/95f3d/game-details-thumb.webp 585w,\n/static/b160641ae55b008a0e48a74273dfc14a/0a8d7/game-details-thumb.webp 1170w",
//         //                                 "sizes": "(min-width: 1170px) 1170px, 100vw"
//         //                             },
//         //                             "sources": []
//         //                         },
//         //                         "width": 1170,
//         //                         "height": 540
//         //                     }
//         //                 }
//         //             }
//         //         },
//         //         {
//         //             "alt": "Games Details",
//         //             "src": {
//         //                 "childImageSharp": {
//         //                     "gatsbyImageData": {
//         //                         "layout": "constrained",
//         //                         "backgroundColor": "#282828",
//         //                         "images": {
//         //                             "fallback": {
//         //                                 "src": "/static/b160641ae55b008a0e48a74273dfc14a/0a8d7/game-details-thumb.webp",
//         //                                 "srcSet": "/static/b160641ae55b008a0e48a74273dfc14a/10675/game-details-thumb.webp 293w,\n/static/b160641ae55b008a0e48a74273dfc14a/95f3d/game-details-thumb.webp 585w,\n/static/b160641ae55b008a0e48a74273dfc14a/0a8d7/game-details-thumb.webp 1170w",
//         //                                 "sizes": "(min-width: 1170px) 1170px, 100vw"
//         //                             },
//         //                             "sources": []
//         //                         },
//         //                         "width": 1170,
//         //                         "height": 540
//         //                     }
//         //                 }
//         //             }
//         //         },
//         //         {
//         //             "alt": "Games Details",
//         //             "src": {
//         //                 "childImageSharp": {
//         //                     "gatsbyImageData": {
//         //                         "layout": "constrained",
//         //                         "backgroundColor": "#282828",
//         //                         "images": {
//         //                             "fallback": {
//         //                                 "src": "/static/b160641ae55b008a0e48a74273dfc14a/0a8d7/game-details-thumb.webp",
//         //                                 "srcSet": "/static/b160641ae55b008a0e48a74273dfc14a/10675/game-details-thumb.webp 293w,\n/static/b160641ae55b008a0e48a74273dfc14a/95f3d/game-details-thumb.webp 585w,\n/static/b160641ae55b008a0e48a74273dfc14a/0a8d7/game-details-thumb.webp 1170w",
//         //                                 "sizes": "(min-width: 1170px) 1170px, 100vw"
//         //                             },
//         //                             "sources": []
//         //                         },
//         //                         "width": 1170,
//         //                         "height": 540
//         //                     }
//         //                 }
//         //             }
//         //         }
//         //     ],
//         //     "content": [
//         //         {
//         //             "id": "game-details-per-one",
//         //             "section": "game-details-per-one",
//         //             "headings": null,
//         //             "items": [
//         //                 {
//         //                     "id": "game-details-1",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 },
//         //                 {
//         //                     "id": "game-details-2",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 }
//         //             ]
//         //         },
//         //         {
//         //             "id": "game-details-per-two",
//         //             "section": "game-details-per-two",
//         //             "headings": [
//         //                 {
//         //                     "content": "DESCRIPTION:"
//         //                 }
//         //             ],
//         //             "items": [
//         //                 {
//         //                     "id": "game-details-1",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 },
//         //                 {
//         //                     "id": "game-details-2",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 }
//         //             ]
//         //         },
//         //         {
//         //             "id": "game-details-per-three",
//         //             "section": "game-details-per-three",
//         //             "headings": [
//         //                 {
//         //                     "content": "FEATURES:"
//         //                 }
//         //             ],
//         //             "items": [
//         //                 {
//         //                     "id": "game-details-1",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 },
//         //                 {
//         //                     "id": "game-details-2",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 }
//         //             ]
//         //         },
//         //         {
//         //             "id": "game-details-per-whats-new",
//         //             "section": "game-details-per-whats-new",
//         //             "headings": [
//         //                 {
//         //                     "content": "WHAT’S NEW!"
//         //                 }
//         //             ],
//         //             "items": [
//         //                 {
//         //                     "id": "game-details-1",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 }
//         //             ]
//         //         },
//         //         {
//         //             "id": "game-details-per-04",
//         //             "section": "game-details-per-04",
//         //             "headings": null,
//         //             "items": [
//         //                 {
//         //                     "id": "game-details-1",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//         //                 },
//         //                 {
//         //                     "id": "game-details-2",
//         //                     "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro recently with desktop publishing software like including versions."
//         //                 }
//         //             ]
//         //         }
//         //     ]
//         // }
//     }
//     console.log(gamedata,"gamedata::::game-detais")

    // console.log(mydata,"mydata::::game-detais")
    // console.log(data,"data::::game-detais")
    // console.log(location.state,"location::::")
    // console.log(pageContext,"pageContext::::")



    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const content = normalizedData(data?.games?.content || []);

    // const globalContent = normalizedData(mydata?.allGeneral?.nodes  || []);
    // const content = normalizedData(mydata?.games?.content || []);

    // Base Url
    const baseUrl = "https://bonx.com";
    // Disqus Comments add
    const disqusShorttname = "mitech-1";
    const disquscConfig = {
        identifier: data?.games?.id  || "123",
        title: data?.games?.title || "abc",
        url: baseUrl + "/" + pageContext.slug,
    };
    return (
        <Layout
            data={{
                ...globalContent["menu"],
                ...globalContent["footer"],
            }}
        >
            <SEO title="Games Details" pathname="/" />
            <PageBreadcrumb
                pageContext={pageContext}
                location={location}
                title="Games Details"
            />
            <div className="games-post-content-wrapper">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="single-grid">
                            <div className="content-box">
                                <p className="date text-primary font-bold mb-3">
                                    {data.games.date}
                                </p>
                                <h2 className="font-bold">
                                    {data.games.title}{" "}
                                </h2>

                                <div className="content-details">
                                    <ContentText
                                        data={content["game-details-per-one"]}
                                    />
                                    <div className="game-all-images my-10">
                                        <Swiper
                                            layout={{
                                                nav: "games-navigation",
                                                dots: "games-dots-style",
                                            }}
                                            navigation={{
                                                nextEl: ".games-slider-button-next",
                                                prevEl: ".games-slider-button-prev",
                                            }}
                                            slidesPerView={1}
                                            spaceBetween={20}
                                        >
                                            {data?.games?.images &&
                                                data?.games?.images?.map(
                                                    (gameThum) => (
                                                        <SwiperSlide
                                                            key={gameThum.alt}
                                                        >
                                                            <GatsbyImage
                                                                image={getImage(
                                                                    gameThum.src
                                                                )}
                                                                alt={
                                                                    gameThum.alt
                                                                }
                                                            />
                                                        </SwiperSlide>
                                                    )
                                                )}
                                        </Swiper>
                                        <div className="z-10 transform pt-12 flex space-x-4">
                                            <div
                                                className="games-slider-button-next swipper-arrow text-white transform w-68 h-55
                                             flex items-center justify-center bg-arrow-shape hover:bg-arrow-hover-shape transition-all bg-cover"
                                            >
                                                <StaticImage
                                                    src="../../data/images/icons/navigation-arrow2.webp"
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className="games-slider-button-prev swipper-arrow text-white 
                                            transform w-68 h-55 flex items-center
                                             justify-center bg-arrow-shape hover:bg-arrow-hover-shape transition-all bg-cover"
                                            >
                                                <StaticImage
                                                    src="../../data/images/icons/navigation-arrow1.webp"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <ContentText
                                        data={content["game-details-per-two"]}
                                    />
                                    <ContentText
                                        data={content["game-details-per-three"]}
                                    />

                                    <ContentText
                                        data={
                                            content[
                                                "game-details-per-whats-new"
                                            ]
                                        }
                                    />

                                    {data?.games?.quoteText && (
                                        <blockquote className="py-5 mb-5">
                                            <p className="font-bold text-yollow-90 italic text-22base lg:text-28base">
                                                {data?.games?.quoteText}
                                            </p>
                                        </blockquote>
                                    )}

                                    <div className="additional-information-area bg-secondary-60 px-9 py-9 rounded-2xl mb-9">
                                        <h3 className="font-bold mb-6">
                                            Additional Information:
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                                            <div className="additional_information_text">
                                                <h4 className="font-bold mb-5">
                                                    Updated:
                                                </h4>
                                                <span>
                                                    {data?.games?.updated}
                                                </span>
                                            </div>
                                            <div className="additional_information_text">
                                                <h4 className="font-bold mb-5">
                                                    SIZE:
                                                </h4>
                                                <span>{data?.games?.size}</span>
                                            </div>
                                            <div className="additional_information_text">
                                                <h4 className="font-bold mb-5">
                                                    INSTALLS:
                                                </h4>
                                                <span>
                                                    {data?.games?.installs}
                                                </span>
                                            </div>
                                            <div className="additional_information_text">
                                                <h4 className="font-bold mb-5">
                                                    CURRENT VERSION:
                                                </h4>
                                                <span>
                                                    {
                                                        data?.games
                                                            ?.currentVersion
                                                    }
                                                </span>
                                            </div>
                                            <div className="additional_information_text">
                                                <h4 className="font-bold mb-5">
                                                    IN-APP PRODUCTS:
                                                </h4>
                                                <span>
                                                    {data?.games?.inAppProducts}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <ContentText
                                        data={content["game-details-per-04"]}
                                    />
                                </div>

                                <div className="mt-14 text-white">
                                    <div className="mb-4">
                                        <h3 className="font-bold">Comments</h3>
                                    </div>
                                    <DiscussionEmbed
                                        shortname={disqusShorttname}
                                        config={disquscConfig}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

GamesDetails.propTypes = {
    // gamedata:PropTypes.object,
    location: PropTypes.object,
    pageContext: PropTypes.object,
    data: PropTypes.shape({
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        games: PropTypes.shape({
            quoteText: PropTypes.string,
            images: PropTypes.arrayOf(
                PropTypes.shape({
                    src: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.shape({}),
                    ]).isRequired,
                    alt: PropTypes.string,
                })
            ),
            updated: PropTypes.string,
            size: PropTypes.string,
            updated: PropTypes.string,
            installs: PropTypes.string,
            currentVersion: PropTypes.string,
            inAppProducts: PropTypes.string,
            id: PropTypes.string,
            title: PropTypes.string,
            date: PropTypes.string,
            author: PropTypes.string,
            content: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]),
                })
            ),
        }),
    }),
};

export const postQuery = graphql`
    query gamesDetailsBySlug($slug: String!) {
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
        games(slug: { eq: $slug }) {
            ...Games
        }
    }
`;
export default GamesDetails;

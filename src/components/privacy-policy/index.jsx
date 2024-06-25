import React, { useState } from "react";
import Video from "@components/shared/video";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
// import AboutUsInto from "../../../components/about-into";

const PrivacyPolicy = ({ data }) => {
    // Video Modal Popup
    let video_arr, video_id, video_channel;
    if (data?.link) {
        video_arr = data?.link.split("=", -1);
        video_id = video_arr[1];
        video_channel = data?.link.split(".")[1];
    }
    const [isOpen, setOpen] = useState(false);
    return (
        <section className="about-us-our-studio-section pb-16">
            <div className="container">
            <h3 className="font-bold mb-5 text-primary uppercase pl-24 relative after:absolute content-after after:bg-primary after:w-16  after:h-1 after:z-0  after:top-1/2  after:left-0  after:transform  after:-translate-y-2/4  after:transition  after:opacity-100">
            Checkout Our Company Privacy Policy
                </h3>
                <div className="about_desc mb-8">

      


1.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
2.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
3.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
4.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
5.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
6.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
7.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
8.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
9.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
10.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when an unknown printer took a galley of type and scirambled it to make a type specimen book. It has survived only five centuries, but also the leap into electronic typesetting. <br/><br/>
      
      

            </div>
                <div className="grid gap-8 lg:grid-cols-4 items-center">
                    <div className="col-span-2">
                   
                    </div>
                    <div className="col-span-2">
                        {/* <AboutUsInto aboutusInto={data} /> */}
                    </div>
                    {/* <Video
                        channel={video_channel}
                        videoId={video_id}
                        isOpen={isOpen}
                        setOpen={setOpen}
                    /> */}
                </div>
            </div>
        </section>
    );
};
PrivacyPolicy.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(
            PropTypes.shape({
                level: PropTypes.string,
                content: PropTypes.string,
            })
        ),
        link: PropTypes.string,
        texts: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string,
            })
        ),
        images: PropTypes.arrayOf(
            PropTypes.shape({
                src: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.shape({}),
                ]).isRequired,
                alt: PropTypes.string,
            })
        ),
    }),
};
export default PrivacyPolicy;

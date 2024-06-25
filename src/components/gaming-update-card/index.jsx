import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Button from "../shared/button";

const GamingUpdateCard = () => {
    return (
        <div className="gaming-update-card relative mt-16 md:mt-28 ">
            <div className=" gaming_update_text z-10 relative py-10 px-8 md:py-24 md:px-24 flex justify-between items-center flex-col lg:flex-row">
                {/* <h2 className="uppercase font-bold text-center md:text-left"> */}
                <h3 className="uppercase font-bold text-center md:text-left text-base md:text-lg">
                    Connect with us <br />
                    for gamING update.
                </h3>
                <div className="gaming_update_btn mt-8 lg:mt-0 z-0">
                    <Button path="/contact-us" size="lg">
                        CONNECT NOW
                        <StaticImage
                            className="align-middle ml-3 transition-all group-hover:ml-5"
                            src="../../data/images/icons/arrrow-icon.webp"
                            alt=""
                        />
                    </Button>
                </div>
            </div>
            <span className="absolute  md:h-full top-0">
                <StaticImage
                    className="rounded-5xl relative h-52 p-24 md:h-full"
                    src="../../data/images/others/gaming-update.webp"
                    alt=""
                />
            </span>
        </div>
    );
};
export default GamingUpdateCard;

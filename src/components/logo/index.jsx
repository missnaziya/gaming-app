import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Logo = (width) => {
    return (
        <Link
            onClick={() => {
                if (process.env.GATSBY_IS_MOBILE == "0") {
                    navigate("/");
                }
            }}
            className="block"
        >
            <StaticImage
                src="../../data/images/logo.webp"
                className={`${
                    process.env.GATSBY_IS_MOBILE == "1"
                        ? "logo-size-small"
                        : "logo-size-large"
                }`}
                //  style={{ width: "100px", height: "100px" }}
                alt="Konfehti"
            />
        </Link>
    );
};
export default Logo;

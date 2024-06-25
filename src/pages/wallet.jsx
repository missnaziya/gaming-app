import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SEO from "@components/seo";
import Layout from "@layout";
import { graphql, navigate } from "gatsby";
import { normalizedData } from "@utils/functions";
import PageBreadcrumb from "../components/pagebreadcrumb";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../components/shared/button";
import Popup from "../components/common/Popup";
import StripePayment from "../components/StripePayment";
import axios from "axios";
import { toast } from "react-toastify";
import { getFormattedDate } from "../utils/functions.js";
import { showMessage } from "../utils/toast-message";
import {
    ADD_TRANS_WITHOUT_TRIP,
    GET_TRANSACTIONS,
} from "../constants/endpoints";
import KonfehtiService from "../constants/konfehti-api";
import TransactionHistoryTable from "../components/transaction-history/index.jsx";

const WalletPage = ({ data, location, pageContext }) => {
    console.log(process.env.GATSBY_IS_PAYMENT, "process.env.GATSBY_IS_PAYMENT");
    useEffect(() => {
        getData();
    }, []);
    const globalContent = normalizedData(data?.allGeneral?.nodes || []);
    const [showModal, setShowModal] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [toggleStripePayment, setToggleStripePayment] = useState(false); // Initial amount set to 0
    const [amount, setAmount] = useState(1); // Initial amount set to 0
    const [error, setError] = useState({ show: false, message: "" });

    const addBalance = async () => {
        try {
            if (Number(amount) >= 1 && Number(amount) <= 1000) {
                const auth = JSON.parse(localStorage.getItem("auth"));
                const user_id = auth?.user_id || 0;
                const rider_amt = amount;
                const r_curr = "INR";
                const curr_multiplier = 1;
                const total_amt = amount;

                const res = await KonfehtiService.post(
                    `${ADD_TRANS_WITHOUT_TRIP}?player_id=${user_id}&rider_amt=${rider_amt}&r_curr=${r_curr}&curr_multiplier=${curr_multiplier}&total_amt=${total_amt}`
                );

                console.log("Add Wallet Balance RES:", res);

                if (typeof window !== "undefined") {
                    let data =
                        localStorage.getItem("auth") !== undefined
                            ? JSON.parse(localStorage.getItem("auth"))
                            : {};
                    data.wallet = res.data.response.r_cur_bal;
                    localStorage.setItem("auth", JSON.stringify(data));
                }
                setShowModal(false);
                showMessage("Amount successfully credited to your account");
                getData();

                setTimeout(() => {
                    // window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (window !== undefined) {
            if (
                localStorage.getItem("isPaymentSuccess") !== null &&
                localStorage.getItem("isPaymentSuccess") !== undefined &&
                localStorage.getItem("isPaymentSuccess") !== "" &&
                localStorage.getItem("isPaymentSuccess") === "success"
            ) {
                const addBalance = async () => {
                    try {
                        const auth = JSON.parse(localStorage.getItem("auth"));
                        const user_id = auth?.user_id || 0;
                        const rider_amt = amount;
                        const r_curr = "INR";
                        const curr_multiplier = 1;
                        const total_amt = amount;

                        const res = await KonfehtiService.post(
                            `${ADD_TRANS_WITHOUT_TRIP}?player_id=${user_id}&rider_amt=${rider_amt}&r_curr=${r_curr}&curr_multiplier=${curr_multiplier}&total_amt=${total_amt}`
                        );
                        console.log("Add Wallet Balance RES:", res);
                        if (res) {
                            localStorage.removeItem("isPaymentSuccess");
                        }
                    } catch (error) {
                        console.error("Error:", error);
                    }
                };
                addBalance();
            }
        }
    }, []);

    // Check if authentication is not available
    if (typeof window !== "undefined") {
        if (!JSON.parse(localStorage.getItem("auth"))?.isLogin) {
            // Navigate to the home page
            navigate("/");
            return null; // Prevent further rendering
        }
    }

    const resetError = () => {
        setError((error) => ({ show: false, message: "" }));
    };

    const increment = () => {
        if (amount < 1000) {
            setAmount(Number(amount) + 1);
            resetError();
        }
        if (amount < 1 || amount == 1000 || amount > 1000) {
            setError((error) => ({
                show: true,
                message: "Amount should be between $1 to $1000",
            }));
        }
    };

    const decrement = () => {
        if (amount > 1) {
            setAmount(Number(amount) - 1);
            resetError();
        } else {
            setError((error) => ({
                show: true,
                message: "Amount should be between $1 to $1000",
            }));
        }
        if (amount == 1 || amount > 1000) {
            setError((error) => ({
                show: true,
                message: "Amount should be between $1 to $1000",
            }));
        }
    };

    const handleAmountChange = (value) => {
        // Convert the input value to a string to check its length
        const stringValue = value.toString();

        // Check if the input value exceeds 4 digits
        if (stringValue.length > 4) {
            // Optionally, you can update the error state to notify the user
            setError({
                show: true,
                message: "Please enter an amount no more than 4 digits",
            });
            return; // Exit the function without updating the amount
        }

        // Proceed with the original logic for value range validation
        if (Number(value) < 1 || Number(value) > 1000) {
            setAmount(value);
            setError({
                show: true,
                message: " Amount should be between $1 to $1000",
            });
        } else {
            setAmount(value);
            resetError(); // Assuming resetError() clears the error state
        }
    };

    const setCustomAmount = (value) => {
        if (Number(value) <= 1000 && Number(value) >= 1) {
            setAmount(Number(value));
            resetError();
        } else {
            setError((error) => ({
                show: true,
                message: "Amount should be between $1 to $1000",
            }));
        }
    };
    // get transaction data
    const getData = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const user_id = auth?.user_id || 0;
            const playerId = "1";
            const res = await KonfehtiService.post(
                `${GET_TRANSACTIONS}?player_id=${user_id}`
            );
            console.log("RES::", res?.data?.response);
            setTransactionData(res?.data?.response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    let walletMoney = 0;
    if (typeof window !== "undefined") {
        walletMoney = JSON.parse(localStorage.getItem("auth"))?.wallet;
    }

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
                title="Wallet"
            />
            <div className="match-post-content-wrapper">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="single-grid">
                            <div className="flex flex-col sm:flex-row justify-between items-center py-2 mb-2 border-b-2 border-secondary-80 ">
                                <div className="flex items-center w-full">
                                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                                        <div className="m-2 flex justify-between w-full ">
                                            <h3 className="pt-2 md:pt-0  font-bold text-base lg:text-35base uppercase">
                                                Your Balance :
                                            </h3>
                                            <h3 className="font-bold text-[24px] lg:text-35base uppercase mr-5">
                                                <span className="text-green">
                                                    $
                                                </span>
                                                <span>{walletMoney}</span>
                                            </h3>
                                        </div>
                                        <div className="m-2 flex justify-end ">
                                            <Button
                                                onClick={() => {
                                                    setAmount(1);
                                                    setError({
                                                        show: false,
                                                        message: "",
                                                    });
                                                    setShowModal(true);
                                                }}
                                                shape="square2xl"
                                                className="text-white btn-bg-image"
                                            >
                                                ADD MONEY
                                            </Button>
                                            {/* MODAL POPUP START */}
                                            <Popup
                                                open={showModal}
                                                setOpen={setShowModal}
                                                modalTitle={
                                                    "Add money to wallet"
                                                }
                                                body={
                                                    <>
                                                        <div className="p-4 rounded-xl">
                                                            {!toggleStripePayment && (
                                                                <div className="single-fild">
                                                                    <div className="flex items-center justify-center w-full">
                                                                        <div className="md:mx-7">
                                                                            <button
                                                                                type="button"
                                                                                style={{
                                                                                    fontSize:
                                                                                        "45px",
                                                                                }}
                                                                                onClick={
                                                                                    decrement
                                                                                }
                                                                                className="px-4 md:px-4 py-0 md:py-1 border text-white rounded-full border-2 border-solid border-primary shadow-lg"
                                                                            >
                                                                                -
                                                                            </button>
                                                                        </div>
                                                                        <div
                                                                            className="p-3 text-center rounded-lg shadow-sm border-purple-300 bg-transparent lg:p-2 text-base font-bold border-gray-300 rounded-md md:w-1/4 mx-2 md:mx-8 w-52 relative"
                                                                            style={{
                                                                                fontSize:
                                                                                    "30px",
                                                                            }}
                                                                        >
                                                                            {/* <div className="border text-center "> */}

                                                                            <span className="absolute py-2  bg-transparent">
                                                                                $
                                                                            </span>
                                                                            <input
                                                                                className="  py-2 w-28 bg-transparent text-center "
                                                                                value={
                                                                                    amount
                                                                                }
                                                                                type="number"
                                                                                min={
                                                                                    0
                                                                                } // Set the minimum allowed value
                                                                                max={
                                                                                    999
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleAmountChange(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                onBlur={(
                                                                                    e
                                                                                ) =>
                                                                                    setCustomAmount(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                            {/* </div> */}
                                                                            <br />
                                                                            <StaticImage
                                                                                src="../data/images/coins.png"
                                                                                className="h-auto w-auto"
                                                                            />
                                                                            <h6 className="py-1">
                                                                                {/* Entry amount */}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="md:mx-7">
                                                                            <button
                                                                                type="button"
                                                                                onClick={
                                                                                    increment
                                                                                }
                                                                                style={{
                                                                                    fontSize:
                                                                                        "45px",
                                                                                }}
                                                                                className="px-3 md:px-3 py-0 md:py-1 border text-white rounded-full border-2 border-solid border-primary shadow-lg"
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {toggleStripePayment && (
                                                                <StripePayment
                                                                    payAmount={
                                                                        amount
                                                                    }
                                                                    setToggleStripePayment={
                                                                        setToggleStripePayment
                                                                    }
                                                                />
                                                            )}
                                                            {error.show && (
                                                                <div className="text-center text-xs text-red-600 sm:text-sm">
                                                                    <h4>
                                                                        {
                                                                            error.message
                                                                        }
                                                                    </h4>
                                                                </div>
                                                            )}
                                                            <div className="flex justify-center align-center mt-8">
                                                                {!toggleStripePayment && (
                                                                    <Button
                                                                        shape="square2xl"
                                                                        className="text-white btn-bg-image mt-8"
                                                                        onClick={() => {
                                                                            if (
                                                                                process
                                                                                    .env
                                                                                    .GATSBY_IS_PAYMENT ===
                                                                                "true"
                                                                            ) {
                                                                                setToggleStripePayment(
                                                                                    !toggleStripePayment
                                                                                );
                                                                            } else {
                                                                                addBalance();
                                                                            }
                                                                        }}
                                                                    >
                                                                        ADD
                                                                        AMOUNT
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                // closeBtnTitle={{ title: "ADD MONEY", click: ()=>(console.log("HI")) }}
                                            />
                                            {/* MODAL POPUP END */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {process.env.GATSBY_IS_MOBILE == "1" ? (
                                <>
                                    <TransactionHistoryTable
                                        transactions={transactionData}
                                    />
                                </>
                            ) : (
                                <div className="flex flex-col sm:flex-row justify-between items-center">
                                    <div className="flex items-center w-full">
                                        <div className="relative pt-4 flex flex-col w-full">
                                            <h3 className="font-bold lg:text-35base uppercase w-100">
                                                Transactions History
                                            </h3>
                                            <div className="relative overflow-x-auto flex mt-12">
                                                <table className="w-full text-sm text-left rtl:text-right text-white bg-secondary-10 border-4 border-secondary-90">
                                                    <thead className="text-xs uppercase">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-5"
                                                            >
                                                                #
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-5"
                                                            >
                                                                Game / Match /
                                                                Recharge
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-5"
                                                            >
                                                                Date
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-5"
                                                            >
                                                                Invoice /
                                                                Transaction ID
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-5"
                                                            >
                                                                Amount
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-5"
                                                            >
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {transactionData &&
                                                            transactionData?.map(
                                                                (item, ind) => {
                                                                    return (
                                                                        <tr
                                                                            className="border-t-2 border-secondary-90"
                                                                            key={
                                                                                ind
                                                                            }
                                                                        >
                                                                            <td
                                                                                scope="row"
                                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white"
                                                                            >
                                                                                {ind +
                                                                                    1}
                                                                            </td>
                                                                            <td className="px-6 py-4">
                                                                                {item?.trans_type ===
                                                                                "Recharge"
                                                                                    ? "Wallet Recharge"
                                                                                    : item?.trans_type}
                                                                            </td>
                                                                            <td className="px-6 py-4">
                                                                                {getFormattedDate(
                                                                                    item?.trans_date
                                                                                )}
                                                                            </td>
                                                                            <td className="px-6 py-4">
                                                                                {
                                                                                    item?.transaction_id
                                                                                }
                                                                            </td>
                                                                            <td className="px-6 py-4">
                                                                                <span className="text-green mr-1">
                                                                                    $
                                                                                </span>
                                                                                {
                                                                                    item?.total_amt
                                                                                }
                                                                            </td>
                                                                            <td
                                                                                className={`px-6 py-4 ${
                                                                                    item?.trans_type ===
                                                                                    "Recharge"
                                                                                        ? "text-green"
                                                                                        : item?.trans_type ===
                                                                                          "Transfer"
                                                                                        ? "text-yellow-500"
                                                                                        : "text-red-500"
                                                                                }`}
                                                                            >
                                                                                {item?.trans_type ===
                                                                                "Recharge"
                                                                                    ? "Recharged"
                                                                                    : item?.trans_type ===
                                                                                      "Transfer"
                                                                                    ? "Transfered"
                                                                                    : "Received"}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

WalletPage.propTypes = {
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

export default WalletPage;

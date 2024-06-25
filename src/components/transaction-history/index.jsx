import React from "react";
import { getFormattedDate } from "../../utils/functions";

const TransactionHistoryTable = ({ transactions }) => {
    console.log(transactions, "transaction>>>>");
    return (
        <div className="">
            <h2 className="lg:text-lg text-md font-semibold mb-4">
                Transaction History
            </h2>
            <div className="space-y-3">
                {transactions?.map((transaction) => (
                    <div
                        key={transaction.transaction_id}
                        className="flex justify-between items-center p-3 border-2 border-secondary-90 shadow rounded-lg"
                    >
                        <div>
                            <p className="mb-1">
                                Transaction ID: #{transaction.transaction_id}
                            </p>
                            <p className="text-sm text-white">
                                {getFormattedDate(transaction?.trans_date)}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-green">
                                {transaction.trans_desc}
                            </p>
                            <p>
                                <span className="text-green mr-1">$</span>
                                {transaction?.total_amt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistoryTable;

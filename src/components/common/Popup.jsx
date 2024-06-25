import React, { useEffect } from "react";
import Button from "../shared/button";

const Popup = ({ open, setOpen, modalTitle, body, closeBtnTitle, btnType }) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add("popup-open");
        } else {
            document.body.classList.remove("popup-open");
        }

        return () => {
            document.body.classList.remove("popup-open");
        };
    }, [open]);

    return open ? (
        <div className="px-4 flex bg-[color:rgba(0,0,0,0.5)] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
                className="fixed left-0 top-0 z-20 opacity-0 h-full w-full bg-black"
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
                tabIndex={0}
            ></div>
            <div className="relative w-full my-6 mx-auto max-w-[550px] z-30">
                <div className="bg-[color:#090029] rounded-md border-2 border-solid border-primary shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                    <div className="flex justify-end">
                        <button
                            className="m-2 flex items-center justify-center w-8 h-8 rounded-full  text-black  focus:outline-none"
                            onClick={() => setOpen(false)}
                        >
                            <svg
                                fill="#ffffff"
                                width="30px"
                                height="30px"
                                viewBox="0 0 32 32"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <title>cancel</title>{" "}
                                    <path d="M16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM21.961 12.209c0.244-0.244 0.244-0.641 0-0.885l-1.328-1.327c-0.244-0.244-0.641-0.244-0.885 0l-3.761 3.761-3.761-3.761c-0.244-0.244-0.641-0.244-0.885 0l-1.328 1.327c-0.244 0.244-0.244 0.641 0 0.885l3.762 3.762-3.762 3.76c-0.244 0.244-0.244 0.641 0 0.885l1.328 1.328c0.244 0.244 0.641 0.244 0.885 0l3.761-3.762 3.761 3.762c0.244 0.244 0.641 0.244 0.885 0l1.328-1.328c0.244-0.244 0.244-0.641 0-0.885l-3.762-3.76 3.762-3.762z"></path>{" "}
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-start justify-between  ">
                        <h2 className="  mx-4 font-bold text-center w-full text-[26px] md:text-[32px]">
                            {modalTitle}
                        </h2>
                    </div>
                    <div className="relative p-7 flex-auto">{body}</div>
                    {closeBtnTitle && (
                        <div className="flex items-center justify-center p-7">
                            <Button
                                type={btnType}
                                onClick={() => {
                                    // setOpen(false);
                                    closeBtnTitle.click();
                                }}
                                className="text-white block btn-bg-image-large"
                            >
                                {closeBtnTitle.title}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default Popup;

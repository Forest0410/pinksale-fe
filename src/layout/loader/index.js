import React from "react";

const Loader = () => {
    return (
        <div className="loader" style={{ display: "none" }}>
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24px"
                height="30px"
                viewBox="0 0 24 30"
                style={{ display: "none" }}
            >
                <rect x="0" y="0" width="4" height="10" fill="#333">
                    <animatetransform
                        attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0"
                        dur="0.6s"
                        repeatCount="indefinite"
                    ></animatetransform>
                </rect>
                <rect x="10" y="0" width="4" height="10" fill="#333">
                    <animatetransform
                        attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.2s"
                        dur="0.6s"
                        repeatCount="indefinite"
                    ></animatetransform>
                </rect>
                <rect x="20" y="0" width="4" height="10" fill="#333">
                    <animatetransform
                        attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.4s"
                        dur="0.6s"
                        repeatCount="indefinite"
                    ></animatetransform>
                </rect>
            </svg>
        </div>
    );
};

export default Loader;

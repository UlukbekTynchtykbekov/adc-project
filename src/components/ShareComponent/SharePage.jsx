import React from 'react';
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, TelegramShareButton} from "react-share";
import "./share.scss"

const SharePage = ({activeButton, setActiveButton}) => {

    const url = window.location.href;

    return (
        <div className="social">
            <ul className={activeButton ? "social__list active" : "social__list"}>
                <li className="social__item" onClick={() => setActiveButton(false)}>
                    <FacebookShareButton url={url}>
                        <div className="social__icons">
                            <span className="social__icon facebook">
                            <svg className="social__img facebook__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
                                <path className="social__path facebook__path"
                                      d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
                                      fillRule="evenodd"/>
                            </svg>
                        </span>
                            <span className="social__title facebook__title">
                            Facebook
                        </span>
                        </div>
                    </FacebookShareButton>
                </li>
                <li className="social__item" onClick={() => setActiveButton(false)}>
                    <LinkedinShareButton url={url}>
                        <div className="social__icons">
                            <span className="social__icon linkedin">
                            <svg className="social__img linkedin__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
                                <path className="social__path linkedin__path"
                                      d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"/>
                            </svg>
                        </span>
                            <span className="social__title linkedin__title">
                            Linkedin
                        </span>
                        </div>
                    </LinkedinShareButton>
                </li>
                <li className="social__item" onClick={() => setActiveButton(false)}>
                    <TwitterShareButton url={url}>
                        <div className="social__icons">
                        <span className="social__icon twitter">
                            <svg className="social__img twitter__img"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50"><path className="social__path twitter-path"
                                d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"/>
                            </svg>
                        </span>
                        <span className="social__title twitter__title">
                            Twitter
                        </span>
                        </div>
                    </TwitterShareButton>
                </li>
                <li className="social__item" onClick={() => setActiveButton(false)}>
                    <TelegramShareButton url={url}>
                        <div className="social__icons">
                        <span className="social__icon telegram">
                            <svg className="social__img telegram__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                                <path className="social__path telegram__path" d="M12.001 22C6.47813 22 2.00098 17.5228 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22ZM8.89113 13.1708L8.90378 13.1628C9.48351 15.0767 9.77337 16.0337 9.77337 16.0337C9.88564 16.3442 10.04 16.3996 10.2273 16.3743C10.4145 16.3489 10.5139 16.2476 10.6361 16.1297C10.6361 16.1297 11.0324 15.7472 11.825 14.9823L14.3759 16.8698C14.8407 17.1266 15.1763 16.9941 15.2917 16.4377L16.9495 8.61641C17.1325 7.88842 16.8115 7.59644 16.247 7.82754L6.51397 11.5871C5.84996 11.854 5.85317 12.2255 6.39308 12.3911L8.89113 13.1708Z" fill="#000">

                            </path>
                            </svg>
                        </span>
                        <span className="social__title telegram__title">
                            Telegram
                        </span>
                        </div>
                    </TelegramShareButton>
                </li>
            </ul>
        </div>
    );
};

export default SharePage;
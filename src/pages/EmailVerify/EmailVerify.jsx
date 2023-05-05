import React, {useEffect, useState} from 'react';
import correct from "../../static/img/icon-correct-24.png"
import "./email-verify.scss"
import {Link, useParams} from "react-router-dom";
import {useTokenData} from "../../CustomHooks/useUsersData";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false)
    const param = useParams()

    const {data, isLoading} = useTokenData(param)

    useEffect(() => {
        if (data?.data){
            setValidUrl(true)
        }else{
            setValidUrl(false)
        }
    }, [data])

    if (isLoading){
        return <div>Loading....</div>
    }
    return (
        <section className="verification">
            <div className="container">
                <div className="verification__wrapper">
                    {
                        validUrl ? <div className="verification__intro">
                            <img className="verification__img" src={correct} alt=""/>
                            <div className="verification__info">
                                <h2 className="verification__title">Email Verification</h2>
                                <p className="verification__subtitle">Your email was verified. You can continue using the application</p>
                            </div>
                            <Link to="/login">
                                <button className="button verification__btn">
                                    Log In
                                </button>
                            </Link>
                        </div> : <div className="verification__intro">
                            <div className="verification__info">
                                <h1 className="verification__title">404 Not Found</h1>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default EmailVerify;
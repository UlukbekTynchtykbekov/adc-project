import React, {useEffect, useState} from 'react';
import correct from "../../static/img/icon-correct-24.png"
import {Link, useParams} from "react-router-dom";
import {useTokenData} from "../../CustomHooks/useUsersData";
import Error from "../../components/ErrorComponent/Error";
import Loader from "../../components/Loader/Loader";
import "../../styles/email-verify.scss"

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false)
    const param = useParams()

    const {data, isLoading, isError} = useTokenData(param)

    useEffect(() => {
        if (data?.data){
            setValidUrl(true)
        }else{
            setValidUrl(false)
        }
    }, [data])

    if (isLoading){
        return <Loader/>
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
                                <Error page="Invalid Link" changeColor={true} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default EmailVerify;
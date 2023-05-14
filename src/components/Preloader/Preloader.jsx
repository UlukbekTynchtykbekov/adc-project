import React, {useEffect} from 'react';
import { preLoaderAnim } from "../../animations";
import "./preloader.scss"

const Preloader = () => {
    useEffect(() => {
        preLoaderAnim();
    }, []);
    return (
        <div className="preloader">
            <div className="texts-container">
                <span>Architecture,</span>
                <span>Design,</span>
                <span>Construction</span>
            </div>
        </div>
    );
};

export default Preloader;
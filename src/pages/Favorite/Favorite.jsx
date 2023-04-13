import React from 'react';
import Helmet from "../../layout/Helmet";
import Table from "../../components/Table/Table";
import "../../styles/favorite.scss"
import {ToastContainer} from "react-toastify";

const Favorite = () => {
    return (
        <Helmet title="Favorite">
            <section className="favorite">
                <div className="container">
                    <Table/>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            </section>
        </Helmet>
    );
};

export default Favorite;
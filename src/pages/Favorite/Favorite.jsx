import React from 'react';
import Helmet from "../../layout/Helmet";
import Table from "../../components/Table/Table";
import "../../styles/favorite.scss"

const Favorite = () => {
    return (
        <Helmet title="Favorite">
            <section className="favorite">
                <div className="container">
                    <Table/>
                </div>
            </section>
        </Helmet>
    );
};

export default Favorite;
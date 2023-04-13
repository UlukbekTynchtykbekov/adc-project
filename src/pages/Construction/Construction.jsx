import React from 'react';
import Helmet from "../../layout/Helmet";
import '../../styles/construction.scss';
import ConstructionCard from "../../components/ConstructionCard/ConstructionCard";

const Construction = () => {
    return (
        <Helmet title="Construction">
            <section className="construction">
                <div className="container">
                    <h4 className="construction__title">ЧТО ВЫ ПОЛУЧИТЕ РАБОТАЯ С НАМИ</h4>
                    <ConstructionCard />
                </div>
            </section>
        </Helmet>
    );
};

export default Construction;
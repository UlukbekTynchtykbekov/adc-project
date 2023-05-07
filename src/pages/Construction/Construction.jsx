import React from 'react';
import Helmet from "../../layout/Helmet";
import '../../styles/construction.scss';
import ConstructionCard from "../../components/ConstructionCard/ConstructionCard";
import {useConstructionData} from "../../CustomHooks/useConstruction";

const Construction = () => {

    const {data, isLoading} = useConstructionData()

    return (
        <Helmet title="Construction">
            <section className="construction">
                <div className="container">
                    {isLoading && <div>Loading...</div>}
                    {data?.message && <div>{data?.message}</div>}
                    {
                        data?.data &&
                        <div className="construction__wrapper">
                            <h4 className="construction__title">ЧТО ВЫ ПОЛУЧИТЕ РАБОТАЯ С НАМИ</h4>
                            {
                                data?.data.map((el, idx) => (
                                    <ConstructionCard key={el._id}  el={el} idx={idx} />
                                ))
                            }
                        </div>
                    }
                    {
                        !isLoading && !data?.message && data?.data.length === 0 && <div>No DATA</div>
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default Construction;
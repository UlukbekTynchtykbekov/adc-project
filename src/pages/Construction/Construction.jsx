import React from 'react';
import Helmet from "../../layout/Helmet";
import ConstructionCard from "../../components/ConstructionCard/ConstructionCard";
import {useConstructionData} from "../../CustomHooks/useConstruction";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import '../../styles/construction.scss';

const Construction = () => {

    const {data, isLoading, isError, error} = useConstructionData()

    return (
        <Helmet title="Construction">
            <section className="construction">
                <div className="container">
                    {
                        isLoading &&  <Loader changeColor={true}/>
                    }
                    {
                        isError && <Error status={error?.status} page={error?.message} changeColor={true}/>
                    }
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
                        !isLoading && !isError && data?.data.length === 0 && <EmptyItems />
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default Construction;
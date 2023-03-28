import React from 'react';
import Accordion from "../../components/Accordion";
import Helmet from "../../layout/Helmet";
import '../../styles/services.scss'
import {useServicesData} from "../../CustomHooks/useServicesData";
import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import {useSuggestionsData} from "../../CustomHooks/useSuggestionsData";

const Services = () => {
    const {data: servicesData, isLoading: servicesIsLoading, isError: servicesIsError, error: servicesError} = useServicesData();
    const {data: suggestionsData, isLoading: suggestionsIsLoading, isError: suggestionsIsError, error: suggestionsError} = useSuggestionsData();

    return (
        <Helmet title="Services">
            <section className="services">
                <div className="container">
                    <div className="services__top">
                        <h4 className="services__title">НАШИ УСЛУГИ</h4>
                        <h3 className="services__suggestion">ПОЛУЧИТЕ  БЕСПЛАТНУЮ <br/>
                            КОНСУЛЬТАЦИЯ
                        </h3>
                    </div>
                    <Accordion data={servicesData?.data} isLoading={servicesIsLoading} isError={servicesIsError} error={servicesError}/>
                    <SuggestionCard data={suggestionsData?.data} isLoading={suggestionsIsLoading} isError={suggestionsIsError} error={suggestionsError}/>
                </div>
            </section>
        </Helmet>
    );
};

export default Services;
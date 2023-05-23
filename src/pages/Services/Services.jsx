import React from 'react';
import Accordion from "../../components/Accordion";
import Helmet from "../../layout/Helmet";
import {useServicesData} from "../../CustomHooks/useServicesData";
import {useSuggestionsData} from "../../CustomHooks/useSuggestionsData";
import SuggestionCardItems from "../../components/SuggestionCard/SuggestionCardItems";
import '../../styles/services.scss'
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";

const Services = () => {
    const {
        data: servicesData,
        isLoading: servicesIsLoading,
        isError
    } = useServicesData();
    const {
        data: suggestionsData,
        isLoading: suggestionsIsLoading,
        isError: suggestionsIsError,
    } = useSuggestionsData();

    return (
        <Helmet title="Services">
            <section className="services">
                <div className="container">
                    {
                        servicesIsLoading || suggestionsIsLoading ? <Loader changeColor={true}/> : null
                    }

                    {
                        isError || suggestionsIsError ? <Error page="Not found and some error" changeColor={true} /> : null
                    }
                    {
                        servicesData?.data && suggestionsData?.data && <>
                            <div className="services__top">
                                <h4 className="services__title">НАШИ УСЛУГИ</h4>
                                <h3 className="services__suggestion">ПОЛУЧИТЕ БЕСПЛАТНУЮ <br/>
                                    КОНСУЛЬТАЦИЯ
                                </h3>
                            </div>
                            <div className="accordions">
                                <div className="accordions__faq">
                                    {
                                        servicesData?.data.map((el, index) => (
                                            <Accordion key={el._id} el={el} index={index}/>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="bottom">
                                <h5 className="bottom__mainTitle">МЫ ПРЕДЛАГАЕМ</h5>
                                <div className="bottom__row">
                                    {
                                        suggestionsData?.data.map((el, index) => (
                                            <SuggestionCardItems key={el._id} item={el} index={index}/>
                                        ))

                                    }
                                </div>
                            </div>
                        </>
                    }

                    {
                       !servicesIsLoading && !servicesData?.data && !isError &&
                        !suggestionsIsLoading &&!suggestionsData?.data && suggestionsIsError && <EmptyItems changeColor={true} />
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default Services;
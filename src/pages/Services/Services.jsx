import React from 'react';
import Accordion from "../../components/Accordion";
import Helmet from "../../layout/Helmet";
import {useServicesData} from "../../CustomHooks/useServicesData";
import {useSuggestionsData} from "../../CustomHooks/useSuggestionsData";
import SuggestionCardItems from "../../components/SuggestionCard/SuggestionCardItems";
import '../../styles/services.scss'

const Services = () => {
    const {
        data: servicesData,
        isLoading: servicesIsLoading,
    } = useServicesData();
    const {
        data: suggestionsData,
        isLoading: suggestionsIsLoading,
    } = useSuggestionsData();

    return (
        <Helmet title="Services">
            <section className="services">
                <div className="container">
                    {
                        servicesIsLoading && suggestionsIsLoading && <div>Loading...</div>
                    }

                    {
                        servicesData?.message && suggestionsData?.message && <div>{servicesData?.message}</div>
                    }

                    <div className="services__top">
                        <h4 className="services__title">НАШИ УСЛУГИ</h4>
                        <h3 className="services__suggestion">ПОЛУЧИТЕ БЕСПЛАТНУЮ <br/>
                            КОНСУЛЬТАЦИЯ
                        </h3>
                    </div>

                    {
                        servicesData?.message && <div>{servicesData?.message}</div>
                    }
                    <div className="accordions">
                        <div className="accordions__faq">
                            {
                                servicesData?.data && servicesData?.data.map((el, index) => (
                                    <Accordion key={el._id} el={el} index={index}/>
                                ))
                            }
                            {
                                !servicesIsLoading && !servicesData && servicesData?.message && <div>NO DATA</div>
                            }
                        </div>
                    </div>
                    {
                        suggestionsData?.message && <div>{suggestionsData?.message}</div>
                    }
                    {
                        suggestionsData?.data &&
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
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default Services;
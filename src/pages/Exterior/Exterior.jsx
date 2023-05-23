import React, {useMemo} from 'react';
import useParallax from "../../CustomHooks/useParallaxHook";
import Helmet from "../../layout/Helmet";
import Common from "../../components/Common";
import bgImage from "../../static/img/exteriorbg.png";
import ShortDesc from "../../components/ShortDesc";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import CardItems from "../../components/CardItems";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";

const Exterior = () => {
    const {isVisible, bgParallaxStyle} = useParallax()
    const {data, isLoading, isError, error} = useProjectsData();

    const house = {
        title: "ВЫ МОЖЕТЕ НАЙТИ ВЕСЬ НА ПРОЕКТ",
        category: "design",
        imageType: "exterior",
        subtitle: "ЭКСТЕРЬЕР",
        shortTitle: "Дизайн коммерческих пространств",
        shortDesc: "Разработка дизайна мест общественного пользования жилых комлексов и бизнес -центров. Грамотно продуманный дизайн интерьера способен изменить качество вашей жизни в лучшую сторону"
    }

    const filteredProducts = useMemo(() => {
        let filteredProducts = [];

        if (data?.data) {
            filteredProducts = data?.data.filter((product) =>
                product.category.name.toLowerCase() === house.category.toLowerCase()
            );
        }

        return filteredProducts;
    }, [data?.data]);


    return (
        <Helmet title="Exterior">
            <Common house={house} bgImage={bgImage} isVisible={isVisible} bgParallaxStyle={bgParallaxStyle}/>
            <section className="short-desc" style={bgParallaxStyle}>
                <div className="container">
                    <ShortDesc house={house}/>
                    <div className="card">
                        <div className="row">
                            {
                                isLoading && <div className="card__result">
                                    <Loader />
                                </div>
                            }
                            {
                                isError && <div className="card__result">
                                    <Error status={error?.status} page={error?.message}/>
                                </div>
                            }
                            {
                                filteredProducts.length > 0 && filteredProducts.map(product => (
                                    <CardItems key={product._id} project={product} imageType={house.imageType}/>
                                ))
                            }
                            {
                                !isLoading && !isError && filteredProducts.length === 0 && <div className="card__result">
                                    <EmptyItems />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Exterior;
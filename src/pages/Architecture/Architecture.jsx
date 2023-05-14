import React, {useMemo, useState} from 'react';
import Common from "../../components/Common";
import Helmet from "../../layout/Helmet";
import bgImage from "../../static/img/architecture-bg.png"
import useParallax from "../../CustomHooks/useParallaxHook";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import CardItems from "../../components/CardItems";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import "../../styles/architecture.scss";

const Architecture = () => {
    const [room, setRoom] = useState("ВСЕ");
    const {handleScroll, scrollRef, isVisible, bgParallaxStyle} = useParallax();

    const {data, isLoading, isError, error} = useProjectsData();

    const house = {
        title: "ДВУХ ЭТАЖНЫЙ ДОМ СОВРЕМЕННОГО СТИЛЯ",
        subtitle: "300 МЕТР КВ",
        category: "architecture",
        imageType: "exterior",
    }

    const filteredProducts = useMemo(() => {
        let filteredProducts = [];

        if (data?.data) {
            if (room === "ВСЕ") {
                filteredProducts = data?.data.filter((product) =>
                    product.category.name.toLowerCase() === house.category.toLowerCase()
                );
            } else {
                filteredProducts = data?.data.filter((product) =>
                    product.category.name.toLowerCase() === house.category.toLowerCase() && product.room.quantity === +room
                );
            }
        }

        return filteredProducts;
    }, [data?.data, room]);

    return (
        <Helmet title="Architecture">
            <Common house={house} bgImage={bgImage} isVisible={isVisible} bgParallaxStyle={bgParallaxStyle}
                    handleScroll={handleScroll}/>
            <div className="architecture" style={bgParallaxStyle}>
                <div className="container">
                    <div ref={scrollRef} className="architecture__filter">
                        <ul className="architecture__list">
                            <li className="architecture__sort architecture__sort--all">
                                <p className="architecture__sort-item" onClick={() => setRoom("ВСЕ")}>ВСЕ</p>
                            </li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("1")}>1-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("2")}>2-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("3")}>3-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("4")}>4-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("5")}>5-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("6")}>6-ком</p></li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="row">
                            {
                                isLoading && <div className="card__result">
                                <Loader />
                            </div>
                            }
                            {
                                isError && <div className="card__result">
                                    <Error status={error?.status} page={error?.message} />
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
            </div>
        </Helmet>
    );
};

export default Architecture;
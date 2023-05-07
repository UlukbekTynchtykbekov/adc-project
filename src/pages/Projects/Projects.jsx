import React, {useMemo, useState} from 'react';
import Helmet from "../../layout/Helmet";
import Design from "../Design";
import "../../styles/projects.scss"
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import CardItems from "../../components/CardItems";

const Projects = () => {
    const [page, setPage] = useState("design")
    const [room, setRoom] = useState("ВСЕ");

    const {data, isLoading} = useProjectsData();

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
        <Helmet title="Projects">
            <section className="projects">
                <div className="container">
                    <div className="projects__top">
                        <ul className="category">
                            <li onClick={(e) => setPage("design")} className="category__list">
                                <h4 className={page === "design" ? "category__item active" : "category__item"}>ДИЗАЙН</h4>
                            </li>
                            <li onClick={(e) => setPage("architecture")} className="category__list">
                                <h4 className={page === "architecture" ? "category__item active" : "category__item"}>АРХИТЕКТУРА</h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <>
                {
                    page === "design" ?
                        <Design/> :
                        <div className="architecture projects__architecture">
                            <div className="container">
                                <div className="architecture__filter">
                                    <ul className="architecture__list">
                                        <li className="architecture__sort architecture__sort--all">
                                            <p className="architecture__sort-item sort-item"
                                               onClick={() => setRoom("ВСЕ")}>ВСЕ</p>
                                        </li>
                                        <li className="architecture__sort"><p
                                            className="architecture__sort-item sort-item"
                                            onClick={() => setRoom("1")}>1-ком</p></li>
                                        <li className="architecture__sort"><p
                                            className="architecture__sort-item sort-item"
                                            onClick={() => setRoom("2")}>2-ком</p></li>
                                        <li className="architecture__sort"><p
                                            className="architecture__sort-item sort-item"
                                            onClick={() => setRoom("3")}>3-ком</p></li>
                                        <li className="architecture__sort"><p
                                            className="architecture__sort-item sort-item"
                                            onClick={() => setRoom("4")}>4-ком</p></li>
                                        <li className="architecture__sort"><p
                                            className="architecture__sort-item sort-item"
                                            onClick={() => setRoom("5")}>5-ком</p></li>
                                        <li className="architecture__sort"><p
                                            className="architecture__sort-item sort-item"
                                            onClick={() => setRoom("6")}>6-ком</p></li>
                                    </ul>
                                </div>
                                <div className="card">
                                    <div className="row">
                                        {isLoading && <div>Loading...</div>}
                                        {data?.message && <div>{data?.message}</div>}
                                        {
                                            filteredProducts.length > 0 && filteredProducts.map(product => (
                                                <CardItems key={product._id} project={product} imageType={house.imageType}/>
                                            ))
                                        }
                                        {
                                            !isLoading && !data?.message && filteredProducts.length === 0 &&
                                            <div>NO DATA</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </>
        </Helmet>
    );
};
export default Projects;
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import {Link} from "react-router-dom";
import {useProjectInfo} from "../../CustomHooks/useProjectInfo";
import ProjectInfoCard from "../ProjectInfoCard/ProjectInfoCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import {useSelector} from "react-redux";
import "./project-info.scss"

const ProjectInfo = () => {
    const [searchItem, setSearchItem] = useState("");
    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);

    const {data: projectInfoData, isLoading: projectInfoDataLoading, isError, error} = useProjectInfo();


    const sortedAndFilteredProjectInfo = useMemo(() => {
        let filteredProjectInfo = [];

        if (projectInfoData?.data) {
            filteredProjectInfo = projectInfoData?.data.filter((info) =>
                info.project.name.toLowerCase().includes(searchItem.toLowerCase())
            );
        }

        return filteredProjectInfo;
    }, [projectInfoData?.data, searchItem]);

    useEffect(() => {
        if (elementRefs.current) {
            elementRefs.current.classList.toggle('close', openSidebar);
        }
    }, [openSidebar])

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div ref={elementRefs} className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Информация о продукте</h1>
                            <div className="table__filter">
                                <Search searchItem={searchItem} setSearchItem={setSearchItem}/>
                                <Link to="/admin/project-info/new">
                                    <button className="button product__add-btn">
                                        Добавить
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            {projectInfoDataLoading &&  <Loader />}
                            {isError && <Error status={error?.status} page={error?.message}/>}
                            {
                                sortedAndFilteredProjectInfo.length > 0 && <table className="table__main">
                                    <thead className="table__head">
                                    <tr className="table__category-list">
                                        <th className="table__category-name">Номер</th>
                                        <th className="table__category-name">Продукт</th>
                                        <th className="table__category-name">Инфо-заголовок</th>
                                        <th className="table__category-name">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table__field">
                                    {
                                        sortedAndFilteredProjectInfo.map((el, idx) => (
                                            <ProjectInfoCard key={el._id} el={el} idx={idx} />
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                            {
                                !projectInfoDataLoading && !isError && sortedAndFilteredProjectInfo.length === 0 &&  <EmptyItems />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectInfo;
import React from 'react';
import ProductCard from "./ProductCard";
import {useProjectsData} from "../../CustomHooks/useProjectsData";

const ProductList = ({searchItem, selected}) => {

    const {data, isLoading, isError, error} = useProjectsData();

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>{error?.message}</div>;
    }

    if (!data){
        return <div style={{color: "white"}}>No project</div>;
    }

    const projects = data?.data.filter(project => {
        if (selected === "дизайн") {
            return project.category.name === "design" && project.name.toLowerCase().includes(searchItem.toLowerCase().trim())
        } else if (selected === "архитектура") {
            return project.category.name === "architecture" && project.name.toLowerCase().includes(searchItem.toLowerCase().trim())
        } else {
            return project.name.toLowerCase().includes(searchItem.toLowerCase().trim())
        }
    })

    return (
        <>
            {
                projects.map(el => (
                    <ProductCard key={el._id} el={el}/>
                ))
            }
        </>
    );
};

export default ProductList;
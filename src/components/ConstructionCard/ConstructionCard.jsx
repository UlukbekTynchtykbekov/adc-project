import React from 'react';
import ConstructionCartItems from "../ConstructionCartItems/ConstructionCartItems";
import {useConstructionData} from "../../CustomHooks/useConstruction";

const ConstructionCard = () => {

    const {data, isLoading, isError, error} = useConstructionData()

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>Error</div>;
    }

    if (!data){
        return <div style={{color: "white"}}>No project</div>;
    }

    return (
        <>
            <ConstructionCartItems data={ data?.data } />
        </>
    );
};

export default ConstructionCard;
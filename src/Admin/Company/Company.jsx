import React from 'react';
import './company.scss'
import Sidebar from "../../components/Sidebar/Sidebar";

const Company = () => {
    return (
        <section className="company">
            <div className="row">
                <div className="col-3">
                    <Sidebar/>
                </div>
                <div className="col-9">
                    <div className="">

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Company;
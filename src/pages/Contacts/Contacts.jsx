import React from 'react';
import Helmet from "../../layout/Helmet";
import "../../styles/contacts.scss"
import Contact from "../../components/Contact";

const Contacts = () => {
    return (
        <Helmet title="Contacts">
            <section className="contacts">
                <div className="container">
                    <Contact />
                </div>
            </section>
        </Helmet>
    );
};

export default Contacts;
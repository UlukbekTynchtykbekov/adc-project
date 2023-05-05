import React from 'react';
import Helmet from "../../layout/Helmet";
import "../../styles/contacts.scss"
import Contact from "../../components/Contact";
import Footer from "../../layout/Footer";

const Contacts = () => {
    return (
        <Helmet title="Contacts">
            <section className="contacts">
                <div className="container">
                    <Contact />
                    <Footer />
                </div>
            </section>
        </Helmet>
    );
};

export default Contacts;
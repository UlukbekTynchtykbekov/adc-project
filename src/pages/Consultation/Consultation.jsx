import React, {useState} from 'react';
import '../../styles/consultation.scss'
import Helmet from "../../layout/Helmet";
import Application from "../../components/Application";
import Footer from "../../layout/Footer";

const Consultation = () => {

    return (
       <Helmet title="Consultation">
           <section className="consultation">
              <div className="container">
                  <div className="consultation__main">
                      <h3 className="consultation__description">Заявка на проект</h3>
                  </div>
                  <Application />
              </div>
           </section>
           <Footer />
       </Helmet>
    );
};

export default Consultation;
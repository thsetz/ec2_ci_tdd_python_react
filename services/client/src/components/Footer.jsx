import React from 'react';

//import './Footer.css';

const Footer = (props) => (
    <section className="section ">
        <div className="container">
            <div className="columns">
                <div className="column">
                    <img className="company_logo_left is-hidden-mobile" src="logo_transl.gif"  alt="logol-img"/>
                </div>
                <div className="column is-four-fifths">
                    <center> 
                        <p><span className="company_font_side" >Copyright EDV-Beratung Dr-Setz 1998-2019</span> </p> 
                    </center>
                </div>
                <div className="column">
                    <img className="company_logo_right is-hidden-mobile"  src="logo_transr.gif"  alt="logor-img"/>
                </div>
            </div>
        </div>
    </section> 

)

export default Footer;

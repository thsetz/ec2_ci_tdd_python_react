import React from 'react';

//import './Footer.css';

const Footer = (props) => (
  <footer  background="tan_paper.gif">
    <div className="container" >
    <table>
       <thead>
       <tr><td> <img src ="logo_transl.gif" style={{float: 'left', width: '3%'}} alt="footerlogo_left" /> </td> 
        <td>
          <center>
            <a href="/fix/impressum">Impressum</a>
            <a href="/fix/datenschutz">Datenschutz</a><br/>
            <span>Copyright 1998 - 2019 <a href="http://setz.de">Edv Beratung Dr. Setz</a>.</span>
          </center>
       </td>
       <td> <img src ="logo_transr.gif" style={{float:'right', width: '5%'}} alt="footerlogo_right" /> </td></tr>
       </thead>
    </table>
    </div>
  </footer>
)

export default Footer;

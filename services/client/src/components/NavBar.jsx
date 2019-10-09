import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  // eslint-disable-next-line
   // <nav className="navbar is-dark" role="navigation" aria-label="main navigation" background="tan_paper.gif"> 
  <nav  role="navigation" aria-label="main navigation" background="tan_paper.gif">
    <section className="container">
        <table>
          <tr><td> <img src ="logo_transl.gif" style={{"border-style":"none", "float":"left", "width":"6%" , alt:"EDV Beratung Dr.-Ing. Setz"}}/>  </td> 
             <td width="60%">
              <div className="navbar-brand">
                <h1 style={{ "height":"80px", "font-family":"verdana,helvetica", "font-size":"28px","color":"navy", textAlign:"left", fontWeight: 'bold' }}  className="navbar-item">{props.title}</h1>
                <span
                  className="nav-toggle navbar-burger"
                  onClick={() => {
                    let toggle = document.querySelector(".nav-toggle");
                    let menu = document.querySelector(".navbar-menu");
                    toggle.classList.toggle("is-active"); menu.classList.toggle("is-active");
                  }}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
             </div>
               </td>
               <td> 
                   <img src ="logo_transr.gif" style={{"border-style":"none", "float":"right", "width":"60%" , alt:"EDV Beratung Dr.-Ing. Setz"}}/> 
               </td> </tr>
       <tr><td>
              <div className="navbar-menu">
                <div className="navbar-start">
                  <Link to="/" className="navbar-item">Home</Link>
                  <Link to="/about" className="navbar-item">About</Link>
                  <Link to="/all-users" className="navbar-item">Users</Link>
                  {props.isAuthenticated &&
                    <Link to="/status" className="navbar-item">User Status</Link>
                  }
                  <a href="/swagger" className="navbar-item">Swagger</a>
                </div>
                <div className="navbar-end">
                  {!props.isAuthenticated &&
                    <div className="navbar-item">
                      <Link to="/register" className="button is-primary">Register</Link>
                      &nbsp;
                      <Link to="/login" className="button is-link">Log In</Link>
                    </div>
                  }
                  {props.isAuthenticated &&
                    <Link to="/logout" className="navbar-item">Log Out</Link>
                  }
                </div>
              </div>
      </td></tr>
      </table>
    </section>
  </nav>
)

export default NavBar;

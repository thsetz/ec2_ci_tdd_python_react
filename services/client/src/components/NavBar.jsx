import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  // eslint-disable-next-line
   // <nav className="navbar is-dark" role="navigation" aria-label="main navigation" background="tan_paper.gif"> 
  <nav  role="navigation" aria-label="main navigation" >
    <section className="container is-paddingless">
                   <div className="columns">
                        <div className="column">
                                <img className="company_logo_left is-hidden-mobile" src="logo_transl.gif" alt="logo_upper_left"/>
                        </div>
                        <div className="column is-four-fifths navbar-brand" >
                            <center><p className="navbar-item has-text-centered company_font_header" className="company_font_header">{props.title}<br/> Ihr Partner am Netz</p> </center>
                            <span
                                  className="nav-toggle navbar-burger"
                                  onClick={() => {
                                    let toggle = document.querySelector(".nav-toggle");
                                    let menu   = document.querySelector(".navbar-menu"); 
                                    toggle.classList.toggle("is-active"); menu.classList.toggle("is-active");
                                      }}> 
                                  <span></span>
                                  <span></span>
                                  <span></span>
                            </span>
                            <div className="navbar-menu">
                                <div className="navbar-start">
                                  <Link to="/"          className="navbar-item">Home</Link>
                                  <Link to="/about"     className="navbar-item">Über uns</Link>
                                  <Link to="/all-users" className="navbar-item">Users</Link>
                                  {props.isAuthenticated &&
                                    <Link to="/status" className="navbar-item">User Status</Link>
                                  }   
                                  <a href="/impressum"   className="navbar-item">Impressum</a>
                                  <a href="/datenschutz" className="navbar-item">Datenschutz</a>
                                  <a href="/swagger"     className="navbar-item">Swagger</a>
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

                        </div>
                        <div className="column">
                                <img className="company_logo_right is-hidden-mobile"  src="logo_transr.gif"  alt="logo_upper_right"/>
                        </div>
                   </div>

    </section>
  </nav>
)

export default NavBar;

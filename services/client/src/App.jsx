import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';
//import './debug.css';




import UsersList from './components/UsersList';
import About from './components/About';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import NavBar from './components/NavBar';
import Form from './components/forms/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';
import Message from './components/Message';
import Footer from './components/Footer';
import Exercises from './components/Exercises';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      title: 'EDV Beratung Dr.-Ing Setz',
      isAuthenticated: false,
      messageName: null,
      messageType: null,
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
  };
  UNSAFE_componentWillMount() {
    if (window.localStorage.getItem('authToken')) {
      this.setState({ isAuthenticated: true });
    };
  };
  componentDidMount() {
    this.getUsers();
  };
  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => { this.setState({ users: res.data.data.users }); })
    .catch((err) => { });
  };
  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  };
  loginUser(token) {
    window.localStorage.setItem('authToken', token);
    this.setState({ isAuthenticated: true });
    this.getUsers();
    this.createMessage('Welcome!', 'success');
  };
  createMessage(name='Sanity Check', type='success') {
    this.setState({
      messageName: name,
      messageType: type
    });
    setTimeout(() => {
      this.removeMessage();
    }, 3000);
  };
  removeMessage() {
    this.setState({
      messageName: null,
      messageType: null
    });
  };
  render() {
    return (
      <div className="hero-bg is-fullheight">
         {/* prototyp funktionierte ueber class -  hier wurde className genommen https://stackoverflow.com/questions/30968113/warning-unknown-dom-property-class-did-you-mean-classname      . */}
          <NavBar
            title={this.state.title}
            isAuthenticated={this.state.isAuthenticated}
          />
          <section className="section">
              <div className="container">
                {this.state.messageName && this.state.messageType && <Message messageName={this.state.messageName} messageType={this.state.messageType} removeMessage={this.removeMessage} /> }
                <div className="columns">
                  {/*  +++++++++++++++++++++++ MIDDLE LEFT  ++++++++++++++++++++++++++++++++++++ */}
                  <div className="column">
                                <font className="company_font_side" >Edv-Beratung</font> 
                                <br/>
                                <ul>
                                   <li> <a href="setz.de"               className="has-text-white ">Willkommen   </a></li>
                                   <li> <a href="/about"                className="has-text-white">Über uns     </a></li>
                                   <li> <a href="mailto:office@setz.de" className="has-text-white">Email-Kontakt</a></li>
                                </ul>
                                <br/>
                                <font className="company_font_side" >Restricted Access</font> 
                                <ul>
                                   <li> <a href="setz.de" className="has-text-white"> Allgemeiner Bereich </a></li>
                                </ul>

                  </div>
                  {/*  +++++++++++++++++++++++ MIDDLE MIDDLE ++++++++++++++++++++++++++++++++++++ */}
                  <div className="column is-half">
                    <br/>
                    <img className="image has-image-centered is-hidden-mobile" src="tastaturtrans.gif" style={{"width" : "40%"}} alt="img"/> 
                    <Switch>
                      <Route exact path='/'          render={() => ( <Exercises isAuthenticated={this.state.isAuthenticated} />)} />
                      <Route exact path='/all-users' render={() => ( <UsersList users={this.state.users} />)} />
                      <Route exact path='/about' component={About}/> 
                      <Route exact path='/impressum'   component={Impressum}/> 
                      <Route exact path='/datenschutz' component={Datenschutz}/> 
                      <Route exact path='/register' render={() => ( 
                                       <Form formType={'Register'} isAuthenticated={this.state.isAuthenticated} loginUser={this.loginUser} createMessage={this.createMessage} />
                      )} />
                      <Route exact path='/login' render={() => ( 
                                    <Form formType={'Login'} isAuthenticated={this.state.isAuthenticated} loginUser={this.loginUser} createMessage={this.createMessage} />
                      )} />
                      <Route exact path='/logout' render={() => ( <Logout     logoutUser={this.logoutUser} isAuthenticated={this.state.isAuthenticated} />)} />
                      <Route exact path='/status' render={() => ( <UserStatus isAuthenticated={this.state.isAuthenticated} />)} />
                    </Switch>
                  </div>
                  {/*  +++++++++++++++++++++++ MIDDLE RIGHT ++++++++++++++++++++++++++++++++++++ */}
                  <div className="column">
                      <ul>
                          <li> <font className="company_font_side" >Mitgliedschaften</font> </li>
                          <li> <a href="https://campus.acm.org/public/vcard/vcard.cfm?handle=thsetz" className="has-text-white">Association For Computing Machinery (ACM)</a></li>
                          <li> <a href="https://cast-forum.de/mitglieder/info/110" className="has-text-white">Competence Center for Applied Security Technology (CAST)</a></li>
                      </ul>
                      <br/>
                      <ul>
                          <li> <font className="company_font_side" >Weitere Bereiche</font> </li>
                          <li> <a href="https://whereby.com/setz.de" className="has-text-white">Konferenzraum</a></li>
                          <li> <a href="https://www.coursera.org/"   className="has-text-white">Coursera</a></li>
                          <li> <a href="https://www.semigator.de/"   className="has-text-white">Semigator</a></li>
                      </ul>
                  </div>

                </div>
              </div>
          </section>
          <Footer/>
      </div>
    )
  }
};

export default App;

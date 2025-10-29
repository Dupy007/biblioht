import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Pied extends Component{
  render(){
        return(
          <div>
                          
                  {/* <!-- copyright --> */}
                  <div className="copyright">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <p>Copyrights &copy; 2019 - <NavLink to="https://imransdesign.com/">Imran Hossain</NavLink>,  All Rights Reserved.</p>
                        </div>
                        <div className="col-lg-6 text-right col-md-12">
                          <div className="social-icons">
                            <ul>
                              <li><NavLink to="#" target="_blank"><i className="fab fa-facebook-f"></i></NavLink></li>
                              <li><NavLink to="#" target="_blank"><i className="fab fa-twitter"></i></NavLink></li>
                              <li><NavLink to="#" target="_blank"><i className="fab fa-instagram"></i></NavLink></li>
                              <li><NavLink to="#" target="_blank"><i className="fab fa-linkedin"></i></NavLink></li>
                              <li><NavLink to="#" target="_blank"><i className="fab fa-dribbble"></i></NavLink></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- end copyright --> */}
                  
          </div>
        );
  }
}

export default Pied;

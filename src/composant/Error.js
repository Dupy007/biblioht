import React, { Component } from 'react';
import Tete from './Tete';
import Pied from './Pied';
import { NavLink } from 'react-router-dom';

class Error extends Component{
  render(){
        return(
          <div>
    
                               {/* header  */}
                               <Tete/>                    
                    {/*   <!-- error section --> */}
                    <div className="full-height-section error-section">
                        <div className="full-height-tablecell">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 offset-lg-2 text-center">
                                        <div className="error-text">
                                            <i className="far fa-sad-cry"></i>
                                            <h1>Oops! Non trouvé.</h1>
                                            <p>La page que vous demandez n'a pas été retrouvée.</p>
                                            <NavLink to="/" className="boxed-btn">Retourné a la page d'acceuil</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  <!-- end error section --> */}
               {/* footer */}
               <Pied/>

          </div>
        );
  }
}

export default Error;

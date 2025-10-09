import React, { Component } from 'react';
import { NavLink,Redirect } from 'react-router-dom';
import jQuery from '../assets/js/jquery-3.4.1.js';
/* eslint no-undef: "off"*/

(function ($) {

    $(document).ready(function($){
    
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });

	
}(jQuery));

class Head extends Component{
	constructor(props) {
		super(props);
		this.state = {
			recherche: null
		};
	  }
	  myChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		if (nam === "recherche" ) {
			if (val ==="") {
				jQuery('.search-bar').html('<span className="wrong">'+nam+' ne peut être vide</span>');
			}else{
				jQuery('.wrong').hide();
			}
		  }
		this.setState({[nam]: val});
	  }
  render(){
        return(
          <div>
                	
	{/* <!--PreLoader--> */}
    {/* <div className="loader">
        <div className="loader-inner">
            <div className="circle"></div>
        </div>
    </div> */}
    {/* <!--PreLoader Ends--> */}
	
	{/* <!-- header --> */}
	<div className="top-header-area" id="sticker">
		<div className="container">
			<div className="row">
				<div className="col-lg-12 col-sm-12 text-center">
					<div className="main-menu-wrap">
						{/* <!-- logo --> */}
						<div className="site-logo">
						<li><NavLink to="/"> <img src={require("../assets/img/logo.jpg")} alt=""/> </NavLink></li>

								
							
						</div>
						{/* <!-- logo --> */}

						{/* <!-- menu start --> */}
						<nav className="main-menu  ">
							<ul>
								<li ><NavLink to="/InsertAuteur">Insertion Auteur</NavLink></li>
								<li ><NavLink to="/InsertEdition">Insertion Maison</NavLink></li>
								<li ><NavLink to="/InsertLivre">Insertion Livre</NavLink></li>
								
										<li><NavLink to="/liste">Utilisateur</NavLink></li>
										<li><NavLink to="/liste_type">Type de compte</NavLink></li>
										<li><NavLink to="/livre">Livre</NavLink></li>
									

								<li>
								<div className="header-icons">
									<NavLink to="/profile" className="mobile-hide search-bar-icon"><i className="fas fa-user"></i></NavLink>
									<a className="mobile-hide" onClick={() => this.logout()}><i className="fas fa-power-off"></i></a>
									<a className="mobile-hide search-bar-icon" hidden='hidden'><i className="fas fa-search"></i></a>
									</div>
								</li>
							</ul>
						</nav>
						<NavLink to="/profile" className="mobile-show search-bar-icon"><i className="fas fa-user"></i></NavLink>
						<br/><a className="mobile-show search-bar-icon" onClick={() => this.logout()}><i className="fas fa-power-off"></i></a>
						<a className="mobile-show search-bar-icon" hidden='hidden' ><i className="fas fa-search"></i></a>
						<div className="mobile-menu"></div>

						{/* <!-- menu end --> */}
					</div>
					<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<h1><span className="blue">Biblio</span><span className="red">ht</span></h1>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
	{/* <!-- end header --> */}

	{/* <!-- search area --> */}
	<div className="search-area">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<span className="close-btn"><i className="fas fa-window-close"></i></span>
					<div className="search-bar">
						<div className="search-bar-tablecell">
							<h3>Recherche pour:</h3>
							<input type="text" placeholder="Recherche" name='recherche' required='required' onChange={this.myChangeHandler} />
							<button type="submit" onClick={() => this.state.recherche ? <Redirect to={{pathname:'/Search',aboutProps:{cle:this.state.recherche} }} /> : alert("Veuillez renseigner le champs de recherche")} >Recherche <i className="fas fa-search"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* <!-- end search arewa --> */}
	
          </div>
        );
  }
}

export default Head;

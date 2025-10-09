import React, { Component } from 'react';
import Tete from './Tete';
import Pied from './Pied';
import jQuery from '../assets/js/jquery-3.4.1';
import Axios from "axios";


class Contact extends Component{
	  constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: '',
			phone: '',
			subject: '',
			message: '',
			dataSent: false,
			error: ''
		};
	  }

	  mySubmitHandler = (event) => {
		event.preventDefault();
		event.persist();
		let nom = this.state.nom;
		let email = this.state.email;
		let phone = this.state.phone;
		let subject = this.state.subject;
		let message = this.state.message;
		const API_PATH ="http://biblioht.net_php/add-contact.php"
		
		if ( nom==='' || email==='' || phone==='' || subject===''|| message==='') {
			alert("Veuillez renseigner tous les champs");
		}else{
		
			jQuery('#form_status').html('<span className="loading">Sending your message...</span>');
			jQuery('#fruitkha-contact').animate({opacity:0.3});
			jQuery('#fruitkha-contact').find('input,textarea,button').css('border','none').attr({'disabled':''});


			Axios.post(API_PATH,{
				nom:nom,
				email:email,
				phone:phone,
				subject:subject,
				message:message
			})
			.then(function ({data}) {
				if(data.success === 1){
					this.setState({
						dataSent: true
					})
					jQuery('#form_status').html('<span className="loading">Message envoyée avec succès </span>');
					jQuery('#fruitkha-contact').find('input,textarea').attr({value:''});
					jQuery('#fruitkha-contact').remove();
					event.target.reset();
				}
				else{
					alert(data.msg);
				}
			}.bind(this))
			.catch(function (error) {
			console.log(error);
			});

			}
		
		}
	  
	  myChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		let err = '';
		if (nam === "phone") {
		  if (val !=="" && !Number(val)) {
			jQuery('#form_status').html('<span className="wrong">Votre numero de telephone doit etre un chiffre</span>');
			
		  }else{
			jQuery('.wrong').hide();
		}
		  if (val.lenght<=4) {
			jQuery('#form_status').html('<span className="wrong">Votre numero de telephone doit avoir plus de quatre chiffres</span>');
			
		  }else{
			jQuery('.wrong').hide();
		}
		}
		if (nam === "nom" || nam === "email" || nam === "phone" || nam === "subject" || nam === "message") {
			if (val ==="") {
				jQuery('#form_status').html('<span className="wrong">'+nam+' ne peut etre vide</span>');
				
			}else{
				jQuery('.wrong').hide();
			}
		  }
		this.setState({errormessage: err});
		this.setState({[nam]: val});
	  }


  render(){
        return(
          <div>
				{/* header  */}
				<Tete/>   
			
	{/* <!-- contact form --> */}
	<div className="contact-from-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 mb-5 mb-lg-0">
					<div className="form-title">
						<h2>Avez vous des questions?</h2>
						<p>Contactez -nous au sujet des services</p>
					</div>
				 	<div id="form_status"></div>
					<div className="contact-form">
						<form type="POST" id="fruitkha-contact" onSubmit={this.mySubmitHandler}>
							<p>
								<input type="text" placeholder="Nom complet" name="nom" id="name" onChange={this.myChangeHandler}/>
								<input type="email" placeholder="Email" name="email" id="email" onChange={this.myChangeHandler}/>
							</p>
							<p>
								<input type="tel" placeholder="Phone" name="phone" id="phone" onChange={this.myChangeHandler}/>
								<input type="text" placeholder="Sujet" name="subject" id="subject" onChange={this.myChangeHandler}/>
							</p>
							<p><textarea name="message" id="message" cols="30" rows="10" placeholder="Message" onChange={this.myChangeHandler}></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" />
							<p><input type="submit" value="Submit"/></p>
							<div>
							{this.state.mailSent && <div>Merci de nous avoir contacter.</div>}
							</div>
						</form>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="contact-form-wrap">
						<div className="contact-form-box">
							<h4><i className="fas fa-map"></i> Notre Address</h4>
							<p>34/8, East Hukupara <br/> Port-Au-Prince <br/> HAITI</p>
						</div>
						<div className="contact-form-box">
							<h4><i className="fas fa-address-book"></i>Pour Contact</h4>
							<p>Phone: +509 48 18 4361 <br/> +509 33 29 8817 / +509 31 18 7695 <br/> Email: Contactbiblioht@gmail.com </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* <!-- end contact form --> */}

	{/* <!-- find our location --> */}
	<div className="find-location blue-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-12 text-center">
					<p> <i className="fas fa-map-marker-alt"></i> Trouver notre Location</p>
				</div>
			</div>
		</div>
	</div>
	{/* <!-- end find our location --> */}

	{/* <!-- google map section --> */}
	<div className="embed-responsive embed-responsive-21by9">
		<iframe src="https://goo.gl/maps/nzV9YwisX3qSi4aG8" width="600" height="450" frameborder="0"  allowfullscreen="" className="embed-responsive-item"></iframe>
	</div>
	{/* <!-- end google map section --> */}
    {/* <!-- featured section --> */}
	<div className="feature-bg">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="featured-text">
                      <h2 className="pb-3">FAQ</h2>
                      <div className="row">
                      <div className="col-lg-10 col-md-6 mb-4 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-shipping-fast"></i>
                            </div>
                            <div className="content">
                              <h3>Quels problèmes que cherchent à résoudre Biblioht ?  </h3>
                             <p> Biblioht veut résoudre deux problèmes majeurs :
							  le fait que des écrivains n’arrivent pas à publier parce qu’ils n’ont pas suffisamment d’argent, 
							  le fait que plusieurs consommateurs ne peuvent pas acheter des livres par rapport à leur pouvoir d’achat très faible. 
							  Sur la plateforme Biblioht les livres seront à des prix très abordables.  </p>
                             </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-4 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-shipping-fast"></i>
                            </div>
                            <div className="content">
                              <h3>Qui sont les partenaires de Biblioht ?  </h3>
                             <p> Les partenaires de biblioht sont : l’UTICE (Unité de Technologie de l’Information et de la Communication en Education) du MENFP 
							 (Ministère de l’Education Nationale et de la Formation Professionnelle), La FORF (Fondation Odette Roy Fombrun), EMO Haïti. </p>
                             </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-4 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-shipping-fast"></i>
                            </div>
                            <div className="content">
                              <h3>Quel genre de partenariat que vous recherchez ?  </h3>
                              <p>Nous sommes ouverts à tout partenariat qui permet l’avancement de Biblioht.</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-5 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-money-bill-alt"></i>
                            </div>
                            <div className="content">
                              <h3>Avec quelles méthodes de paiements se feront les échanges ?  </h3>
                              <p>Diverses méthodes de paiements seront utilisées comme : Moncash, Lajan Cash, certaines cartes de débit et de crédit internationales. </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-5 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-briefcase"></i>
                            </div>
                            <div className="content">
                              <h3>Qu’est-ce que le programme Biblioht pour école ? </h3>
                              <p>C’est un programme qui permettra aux élèves d’avoir un accès gratuit a un ensemble de livre qui sont compatible au programme du ministère de l’éducation Nationale et de la Formation Professionnelle afin que les élèves puis approfondir leur connaissance et élargir leur compréhension et leur culture sur des notions.</p>
                             </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="content">
                              <h3> Que peut-on faire sur Biblioht ? </h3>
                              <p>Sur Biblioht, on peut : acheter des livres d’auteurs Haïtiens et étrangers, consulter des livres gratuits, mettre en vente des livres.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end featured section --> */}

			{/* footer */}
			<Pied/>
          </div>
        );
  }
}

export default Contact;

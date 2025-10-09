import React, { Component } from 'react';
import Axios from 'axios';
import jQuery from '../assets/js/jquery-3.4.1.js';
import Head from './head.js';
import Foot from './foot.js';

class InsertEdition extends Component{
		constructor(props) {
			super(props);
			this.setState = this.setState.bind(this);
			this.state = {
				nom: "",
				adresse: '',
				ville: '',
				depart: '',
				pays: ''
			};
		  }
		  mySubmitHandlerEdition = (event) => {
			event.preventDefault();
			let nom = this.state.nom;
			let pays = this.state.pays;
			let ville = this.state.ville;
			let depart = this.state.depart;
			let adresse = this.state.adresse;
			const API_PATH_Adresse =this.baseURL+"/php/add-adresse.php"
			const API_PATH_Edition =this.baseURL+"/php/add-edition.php"
			const cc = this;

			if ( nom==='' || pays==='' || depart==='' || ville==='') {
				alert("Veuillez renseigner tous les champs");
			}else{
				jQuery('#form_status').html('<span className="loading">Envoi du formulaire...</span>');
				jQuery('#fruitkha-contact').animate({opacity:0.3},3000);
				jQuery('#fruitkha-contact').find('input,textarea,button').css('border','none').attr({'disabled':''});
			
				Axios.post(API_PATH_Adresse,{
					ville: ville,
					depart: depart,
					pays: pays
				})
				.then(function ({data}) {
					let ad = data.id;
					if(data.success === 1){
						cc.setState({ adresse : data.id });
						Axios.post(API_PATH_Edition,{
							nom: nom,
							adresse: data.id
						})
						.then(function ({data}) {
							if(data.success === 1){
								alert('success');
								window.location.reload();
							}
							else{
								alert(data.msg);
							}
						})
						.catch(function (error) {
						console.log(error);
						});					
					}
					else{
						alert(data.msg);
					}
				})
				.catch(function (error) {
				console.log(error);
				});
			}
		  }
		  myChangeHandlerEdition = (event) => {
			let nam = event.target.name;
			let val = event.target.value;
			
	
			if (nam === "nom" || nam === "pays" || nam === "ville" || nam === "depart") {
				if (val ==="") {
					jQuery('#form_status').html('<span className="wrong">'+nam+' ne peut être vide</span>');
					
				}else{
					jQuery('.wrong').hide();
				}
			  }
			this.setState({[nam]: val});
		  }
	

	
render(){
return(
	<div>
	   
	   <Head/>
		{/* <!-- edition form --> */}
		<div className="contact-from-section mt-150 mb-150">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 mb-5 mb-lg-0">
						<div className="form-title">
							<h2>Edition</h2>
						</div>
						 <div id="form_status"></div>
						<div className="contact-form">
							<form type="POST" id="fruitkha-contact" onSubmit={this.mySubmitHandlerEdition}>
								<p>
									<input type="text" placeholder="Nom maison..." name="nom" id="name" onChange={this.myChangeHandlerEdition}/>
								</p>
								<p>
									<input type="text" placeholder="Ville" name="ville" id="ville" onChange={this.myChangeHandlerEdition}/>
									<input type="text" placeholder="Departement" name="depart" id="pays" onChange={this.myChangeHandlerEdition}/>
									<input type="text" placeholder="Pays" name="pays" id="pays" onChange={this.myChangeHandlerEdition}/>
								</p>
								<input type="hidden" name="token" value="FsWga4&@f6aw" />
								<p><input type="submit" value="Envoyer"/></p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	
	
		{/* <!-- end edition form --> */}
	
		<Foot/>

			  </div>
			);
	  }
}
	

export default InsertEdition ;

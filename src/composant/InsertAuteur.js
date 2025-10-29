import React, { Component } from 'react';
import Axios from 'axios';
import jQuery from '../assets/js/jquery-3.4.1.js';
import Head from './head.js';
import Foot from './foot.js';
import { NavLink } from 'react-router-dom';

class InsertAuteur extends Component{
	constructor(props) {
		super(props);
		this.state = {
			nom: "",
			prenom: '',
			ville: '',
			depart: '',
			pays: '',
			adresse:''
		};
	  }
	  mySubmitHandlerAuteur = (event) => {
		event.preventDefault();
		let nom = this.state.nom;
		let prenom = this.state.prenom;
		let pays = this.state.pays;
		let ville = this.state.ville;
		let depart = this.state.depart;
		const API_PATH_Adresse =this.baseURL+"/php/add-adresse.php"
		const API_PATH_Auteur =this.baseURL+"/php/add-auteur.php"
		const cc = this;

		if ( nom==='' || prenom==='' || pays==='' || depart==='' || ville==='') {
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
					Axios.post(API_PATH_Auteur,{
						nom: nom,
						prenom: prenom,
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
	  myChangeHandlerAuteur = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		

		if (nam === "nom" || nam === "prenom" || nam === "pays" || nam === "ville" || nam === "depart") {
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
   
			{/* header  */}
				<Head/>   
			{/* <!-- auteur form --> */}
	<div class="contact-from-section mt-150 mb-150">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 mb-5 mb-lg-0">
					<div class="form-title">
						<h2>Auteur</h2>
					</div>
				 	<div id="form_status"></div>
					<div class="contact-form">
						<form type="POST" id="fruitkha-contact" onSubmit={this.mySubmitHandlerAuteur}>
							<p>
								<input type="text" placeholder="Prenom" name="prenom" id="ville" onChange={this.myChangeHandlerAuteur}/>
								<input type="text" placeholder="Nom" name="nom" id="departement" onChange={this.myChangeHandlerAuteur}/>
							</p>
							
							<p>
								<input type="text" placeholder="Ville" name="ville" id="ville" onChange={this.myChangeHandlerAuteur}/>
								<input type="text" placeholder="Departement" name="depart" id="pays" onChange={this.myChangeHandlerAuteur}/>
								<input type="text" placeholder="Pays" name="pays" id="pays" onChange={this.myChangeHandlerAuteur}/>
							</p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" />
							<p><input type="submit" value="Envoyer"/></p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	{/* <!-- end auteur form --> */}
			{/* footer */}
			<Foot/>

          </div>
        );
  }
	  }



export default  InsertAuteur ;

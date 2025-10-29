import React, { Component } from 'react';
import Axios from 'axios';
import jQuery from '../assets/js/jquery-3.4.1.js';
import Head from './head.js';
import Foot from './foot.js';
import {AppContext,Provider} from './Context';

class InsertLivre extends Component{
	constructor(props) {
		super(props);
		this.state = {
			nom: "",
			auteur: '',
			edition: null,
			desc: '',
			prix: '',
			age: '',
			page: '',
			type: '',
			livre: null,
			image: null,
			listAuteur:[],
			listEdition:[],
			post_found_A:true,
			post_found_E:true,
		};
	  }
	  postShowA = (show) => {
        this.setState({
            post_found_A:show
        })
    }
	postShowE = (show) => {
        this.setState({
            post_found_E:show
        })
    }

	  static contextType = AppContext;   

	  
	  fetchAuteur = () => {
		  fetch(this.baseURL+'/php/all-auteur.php')
		  .then(response => {
			  response.json().then(function(data) {
				  if(data.success === 1){
					  this.setState({
						  listAuteur:data.auteur.reverse()
					  });
					  
				  } else
				  	this.context.post_showA(false);
				              
			  }.bind(this));
		  })
		  .catch(error => {
			  console.log(error);
		  });
	  }

	  fetchEdition = () => {
		fetch(this.baseURL+'/php/all-edition.php')
		.then(response => {
			response.json().then(function(data) {
				if(data.success === 1){
					this.setState({
						listEdition:data.edition.reverse()
					});
					
				}else
					 this.context.post_showE(false);
				              
			}.bind(this));
		})
		.catch(error => {
			console.log(error);
		});
	}

	componentDidMount(){
		this.fetchAuteur();
		this.fetchEdition();
	}
	sendFile = (file) => {
		const uri = this.baseURL+"/php/upload.php";
		const xhr = new XMLHttpRequest();
		const fd = new FormData();
		
		xhr.open("POST", uri, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				alert(xhr.responseText); // handle response.
			}
		};
		fd.append('myFile', file);
		// Initiate a multipart/form-data upload
		xhr.send(fd)
		return xhr;
	}
	  mySubmitHandlerLivre = (event) => {
		event.preventDefault();
		let nom = this.state.nom;
		let auteur = this.state.auteur;
		let edition = this.state.edition;
		let desc = this.state.desc;
		let prix = this.state.prix;
		let age = this.state.age;
		let page = this.state.page;
		let type = this.state.type;
		let livre = this.state.livre;
		let image = this.state.image;

		const API_PATH_Livre =this.baseURL+"/php/add-livre.php"

		if ( nom==='' || auteur==='' || desc==='' || prix==='' || age==='' || page==='' || type==='' || livre===''  ) {
			console.log(nom,auteur,desc,edition,prix,age,page,type,livre,image);
			alert("Veuillez renseigner tous les champs");
		}else{
			console.log(nom,auteur,desc,edition,prix,age,page,type,livre,image,livre.tmp_name);
			jQuery('#form_status').html('<span className="loading">Envoi du formulaire...</span>');
			jQuery('#fruitkha-contact').animate({opacity:0.3},3000);
			jQuery('#fruitkha-contact').find('input,textarea,button').css('border','none').attr({'disabled':''});
			this.sendFile(livre);
			this.sendFile(image);
			Axios.post(API_PATH_Livre,{
				nom: nom,
				auteur: auteur,
				edition: edition,
				desc: desc,
				prix: prix,
				age: age,
				page: page,
				type: type,
				image: image.name,
				livre: livre.name
			})
			.then(function ({data}) {
				if(data.success === 1){
					event.target.reset();
					alert('Success');
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
	  myChangeHandlerLivre = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		
		if (nam === "nom" || nam === "auteur" || nam === "desc" || nam === "prix" || nam === "age" || nam === "image" || nam === "livre" || nam === "page" || nam === "type"  ) {
			if (val ==="") {
				jQuery('#form_status').html('<span className="wrong">'+nam+' ne peut être vide</span>');
			}else{
				jQuery('.wrong').hide();
			}
		
		  }
		this.setState({[nam]: val})
	  }
	  onFileChange = (event) => { 
		if(event.target.files){
			var files = event.target.files[0];
			}
	   this.setState({livre: files})
	  }
	  onFileChangeI = (event) => { 
		if(event.target.files){
			var files = event.target.files[0];
			}
	   this.setState({image: files})
	  }
		  fileData = () => { 
			if (this.state.livre) { 
			  return ( 
				<div> 
				  <h2>File Details:</h2> 
				  <p>File Name: {this.state.livre.name}</p> 
				  <p>File Type: {this.state.livre.type}</p> 
				  <p> 
					Last Modified:{" "} 
					{this.state.livre.lastModifiedDate.toDateString()} 
				  </p> 
				</div> 
			  ); 
			} else { 
			  return ( 
				<div> 
				</div> 
			  ); 
			} 
		  }; 
  
render(){
			const contextValue = {
				post_show_E:this.postShowE,
				post_show_A:this.postShowA
			}
			let allAuteur = this.state.listAuteur.map(({idAuteur,prenomAuteur,nomAuteur}, index) => {
				return idAuteur!=='' ? (
					<div>
						<select name='auteur' value={this.state.auteur} onChange={this.myChangeHandlerLivre} id='auteur' className="form-control form-control-lg col-md-6">
							<option value=''>Auteur</option>
							<option key={idAuteur} value={idAuteur}>{prenomAuteur+'  '+nomAuteur}</option>
						</select>
					</div>
				):(
					<div>
						Aucun auteur
					</div>
				);
			});
			
			let allEdition = this.state.listEdition.map(({idEdition,nomEdition}, index) => {
				return idEdition!=='' ? (
				<div>
					<select name='edition' id='edition' value={this.state.edition} onChange={this.myChangeHandlerLivre} className="form-control form-control-lg col-md-6">
						<option value=''>Maison d'edition</option>
						<option key={idEdition} value={idEdition}>{nomEdition}</option>
					</select>
				</div>
				):(
					<div>
						<p>Aucune maison d'edition</p>
					</div>
				);
			});
			let showAuteur,showEdition;
			if(this.state.post_found_A){
				showAuteur = (
					<div>
						{allAuteur}
					</div>
				);
			}
			else{
				showAuteur = (
					<div>
						<span>Aucun Auteur</span>
					</div>
					
				);
			}

			if(this.state.post_found_E){
				showEdition = (
					<div>
						{allEdition}
					</div>
				);
			}
			else{
				showEdition = (
					<div>
						<span> Aucune Maison editiom</span>
					</div>
				);
			}

			
        return(
			<Provider value={contextValue}>
          <div>
   
		  <Head/>
	{/* <!-- livre form --> */}
	<div className="contact-from-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 mb-5 mb-lg-0">
					<div className="form-title">
						<h2>Livre</h2>
					</div>
				 	<div id="form_status"></div>
					<div className="contact-form">
						<form type="POST" id="fruitkha-contact" onSubmit={this.mySubmitHandlerLivre}>
							<p>
								<input type="text" placeholder="Nom du livre" name="nom"  onChange={this.myChangeHandlerLivre}/>
								<input type="number" placeholder="Prix" name="prix"  onChange={this.myChangeHandlerLivre}/>
								<br/>Livre: <input type="file" name="livre" onChange={this.onFileChange} accept="doc/pdf, soc/docx" className="form-control-file" />
								<br/>Avatar: <input type="file" name="image" onChange={this.onFileChangeI} accept="image/png, image/jpeg, image/jpg" className="form-control-file" />
							</p>
							{/* {this.fileData()} */}
							<p>
								{showAuteur}
								{showEdition}
							</p>
							<p>
								<input type="number" placeholder="Age de lecture" name="age"  onChange={this.myChangeHandlerLivre}/>
								<input type="number" placeholder="Nbre de pages" name="page"  onChange={this.myChangeHandlerLivre}/>
								<select name='type' id='type' value={this.state.type} onChange={this.myChangeHandlerLivre} className="form-control form-control-lg col-md-6">
								<option value=''>Categorie livre</option>
								<option value='roman'>Roman</option>
								</select>
							</p>
							<p><textarea name="desc" id="message" cols="30" rows="10" placeholder="Description" onChange={this.myChangeHandlerLivre}></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" />
							<p><input type="submit" value="Submit"/></p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>



	{/* <!-- end auteur form --> */}
	<Foot/>

          </div>
		  </Provider>
        );
  }
	  }




export default  InsertLivre ;

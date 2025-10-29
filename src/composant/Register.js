import React, { Component } from 'react';
import jQuery from '../assets/js/jquery-3.4.1';
import Axios from "axios";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import {Session} from 'bc-react-session';

const _s = Session.getSession();
const session = Session.get('para');
const { payload } = Session.get('para');
const s = session.payload; 
class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			nom: "",
			prenom: '',
			statut: '',
			sexe: '',
			birth: "",
			email: '',
			phone: '',
			mdp: '',
			ville: '',
			depart: '',
			pays: '',
			adresse:'',
			id:''
		};
	  }

	  mySubmitHandler = (event) => {
		event.preventDefault();
		event.persist();
		let nom = this.state.nom;
		let email = this.state.email;
		let phone = this.state.phone;
		let prenom = this.state.prenom;
		let statut = this.state.statut;
		let sexe = this.state.sexe;
		let birth = this.state.birth;
		let mdp = this.state.mdp;
		let ville = this.state.ville;
		let depart = this.state.depart;
		let pays = this.state.pays;
		const cc = this;
		const API_PATH_Adresse =this.baseURL+"/php/add-adresse.php"
		const API_PATH_User    =this.baseURL+"/php/add-user.php"
		const API_PATH_Type    =this.baseURL+"/php/add-type.php"

		if ( nom==='' || email==='' || phone==='' || prenom===''||  sexe==='' || statut==='' || birth===''|| mdp==='' || ville==='' || depart==='' || pays==='' ) {
			alert("Veuillez renseigner tous les champs");
		}else{
			Axios.post(API_PATH_Adresse,{
				ville: ville,
				depart: depart,
				pays: pays
			})
			.then(function ({data}) {
				if(data.success === 1){
					cc.setState({adresse: data.id});
					Axios.post(API_PATH_User,{
						nom: nom,
						prenom: prenom,
						statut: statut,
						sexe: sexe,
						birth: birth,
						email: email,
						phone: phone,
						mdp: mdp,
						adresse: data.id
					})
					.then(function ({data}) {
						if(data.success === 1){
							cc.setState({id: data.id});
									console.log('adresse insert ID = '+data.id);
									Axios.post(API_PATH_Type,{
										id: data.id,
										prenom: prenom,
										email: email,
										mdp: mdp,
									})
									.then(function ({data}) {
										if(data.success === 1){
											alert('success')
											event.target.reset();
										}else if(data.success === 0){
											console.log('type user not insert ');
											
										}
										else{
											console.log('type user not insert Autre probleme');
											alert(data.msg);
										}
									})
									.catch(function (error) {
									console.log(error);
									});
							alert('success')
							
						}else if(data.success === 0){
							console.log('user not insert ');
							alert(data.msg);
				
						}
						else{
							console.log('user not insert Autre probleme ');
							alert(data.msg);
						}
					})
					.catch(function (error) {
					console.log(error);
					});
					
				}
				else{
					console.log('adresse not insert Pas de ID');
					alert(data.msg);
				}
			})
			.catch(function (error) {
			console.log(error);
			});
			}
		
		}
	  
	  myChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		let err = '';
		let liste = document.getElementById("statut");
		let statut = liste.options[liste.selectedIndex].text;
		if (nam === "mdp" ) {
		   if (val.lenght<8) {
			jQuery('#registerForm').html('<span classNameName="wrong">Votre mot de passe doit avoir plus de huit caractères</span>');
			
		  }else{
			jQuery('.wrong').hide();
		}
		}


		if (nam === "phone" ) {
		  if (val !="" && !Number(val)) {
			jQuery('#registerForm').html('<span classNameName="wrong">Votre '+nam+' doit etre un chiffre</span>');
			
		  }else{
			jQuery('.wrong').hide();
		}
		  if (val.lenght<2) {
			jQuery('#registerForm').html('<span classNameName="wrong">Votre '+nam+' doit avoir plus de deux chiffres</span>');
			
		  }else{
			jQuery('.wrong').hide();
		}
		}
		if (nam === "nom" || nam === "email" || nam === "phone" || nam === "prenom" || nam === "sexe" || nam === "mdp" || nam === "birth" || nam === "ville" || nam === "depart" || nam === "pays" || nam === "statut" ) {
			if (val ==="") {
				jQuery('#registerForm').html('<span classNameName="wrong">'+nam+' ne peut etre vide</span>');
				
			}else{
				jQuery('.wrong').hide();
			}
		  }  
		this.setState({errormessage: err});
		this.setState({[nam]: val,
						statut:statut});
	  }


  render(){
    return(
        <div>
        	
        <div class="container-login100 form_register">
        <form type="POST" id="myForm" onSubmit={this.mySubmitHandler}>
          <h1>Enregistrement:</h1>
          <div class='red error' id='registerForm'></div>
          {/* <!-- One "tab" for each step in the form: --> */}
          <div class="tab">Nom complet:
            <p><input placeholder="Prénom..." onChange={this.myChangeHandler}  name="prenom"/></p>
            <p><input placeholder="Nom..." onChange={this.myChangeHandler}  name="nom"/></p>
            <p>
                    <p>Sexe:</p>
                    <p class="form-check form-check-inline">
                        Femelle<input type='radio' class='form-check-input col-6' value='Femelle' onChange={this.myChangeHandler}  name='sexe'/>
                        Male<input type='radio' class='form-check-input col-6' value='Male' onChange={this.myChangeHandler}  name='sexe'/> 
                    </p>
                </p>
            </div>
          <div class="tab">Contact Info:
            <p><input placeholder="E-mail..." onChange={this.myChangeHandler}  name="email"/></p>
            <p><input placeholder="Telephone..." onChange={this.myChangeHandler}  name="phone"/></p>
            
                </div>
          <div class="tab">Date de naissance:
          <p><input type='date' name='birth' onChange={this.myChangeHandler} /></p>
          <p>
          <select id='statut' name='statut' class='form-control form-control-lg col-md-6 col-lg-12'>
            <option value='auteur'>Auteur</option>
            <option value='ecolier'>Ecolier</option>
            <option value='etudiant'>Etudiant</option>
            <option value='professionnel'>Professionnel</option>
              <option value='autre'>Autre</option>
          </select>
          </p>
          </div>
          <div class="tab">Adresse:
            <p><input placeholder="Ville" onChange={this.myChangeHandler}  name="ville"/></p>
            <p><input placeholder="Departement" onChange={this.myChangeHandler}  name="depart"/></p>
            <p><input placeholder="Pays" onChange={this.myChangeHandler}  name="pays"/></p>
          </div>
          <div class="tab">Login Info:
            <p><input value={this.state.email} onChange={this.myChangeHandler}  name="username" type="text" disabled='disabled' /></p>
            <p><input placeholder="Mot de passe..." onChange={this.myChangeHandler}  name="mdp" type="password"/></p>
          </div>
    
          <div class='sbtnio'>
            <div class='btnio'>
                  <button type="button" class="previous">Previous</button>
                  <button type="button" class="next">Next</button>
                <input type="submit" class="submit col-md-4" name='submit' value='Save' />
                {/* <button type="submit" class="submit">Save</button> */}
                
            </div>
          </div>
          {/* <!-- Circles which indicates the steps of the form: --> */}
          <div class='stepio'>
            <span class="step">1</span>
            <span class="step">2</span>
            <span class="step">3</span>
            <span class="step">4</span>
            <span class="step">5</span>
          </div>
        </form>
        
        </div>
        
        
    
        <div id="dropDownSelect1"></div>
        
            </div>

    );
  }
}

export default Register;

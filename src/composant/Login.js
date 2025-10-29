import React, { Component } from 'react';
import jQuery from '../assets/js/jquery-3.4.1';
import { NavLink,Redirect,Route } from 'react-router-dom';
import Axios from "axios";
import {AppContext} from './Context';
import App from '../App';


class Login extends Component{
    constructor(props) {
		super(props);
		this.state = {
			email: '',
			mdp: '',
			users:[],
			post_found_U:false,
			
			
		};
	  }

	  static contextType = AppContext;   
	  postShowU = (show) => {
			this.setState({
				post_found_U:show
			})
		}
	   fetchUsers = () => {
        fetch(this.baseURL+'/php/connect-user.php')
        .then(response => {
            response.json().then(function(data) {
                if(data.success === 1){
                    this.setState({
						users:data.users.reverse()
					});
					this.context.post_showU(true);
                }               
            }.bind(this));
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchUsers();
    }

	  mySubmitHandler = (event) => {
		event.preventDefault();
		let mdp = this.state.mdp;
		let email = this.state.email;
		const API_PATH =this.baseURL+"/php/connect-user.php"
		const cc = this
		if ( mdp==='' || email==='') {
			alert("Veuillez renseigner tous les champs");
		}else{
			console.log('Envoie des info');
			Axios.post(API_PATH,{
				email:email,
				mdp:mdp
			})
			.then(function ({data}) {
				if(data.success === 1){
					alert(data.msg);
					cc.setState({users: data.users.reverse()});
					event.target.reset();
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
	  myChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		let err = '';
		if (nam === "mdp" || nam === "email") {
			if (val ==="") {
				// jQuery('.container-login100').html('<span className="wrong">'+nam+' ne peut etre vide</span>');
				
			}else{
				jQuery('.wrong').hide();
			}
		  }
		this.setState({errormessage: err});
		this.setState({[nam]: val});
	  }


  render(){
	const contextValue = {
		post_show_U:this.postShowU,
	}
	let sess = this.state.users.map(({idUser,prenom,typeC}, index) => {
		return idUser ? (
			sessionStorage.setItem('biblioht_prenom',prenom),
			sessionStorage.setItem('biblioht_cpt',typeC),
			sessionStorage.setItem('biblioht_id',idUser),
			window.location = '/'
            
			

		):(
			sessionStorage.clear(),
			console.log("Session non cree")
		);
	});
	let ses;
	if(this.state.post_found_L){
		ses = (
				{sess}
		);
	}
	else{
		ses = (
			null
			
		);
	}
    return(
        <div>
        	{ses}
			<div class="container-login100">
		<div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
			<form class="login100-form validate-form" onSubmit={this.mySubmitHandler}>
				<span class="login100-form-title p-b-37">
					Connexion
				</span>

				<div class="wrap-input100 validate-input m-b-20" >
					<input class="input100" type="text" name="email" placeholder="Email" onChange={this.myChangeHandler}/>
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input m-b-25">
					<input class="input100" type="password" name="mdp" placeholder="Mot de passe" onChange={this.myChangeHandler}/>
					<span class="focus-input100"></span>
				</div>

				<div class="container-login100-form-btn">
                <input type='submit' value='Se connecter' class='login100-form-btn' onClick={() => sessionStorage.getItem('biblioht_id') ? <Redirect to='/App'/> : null }  />
                <span></span><NavLink to='./Register'>Creer un compte</NavLink>
				</div>

			

		

			
			</form>

			
		</div>
	</div>

        </div>

    );
  }
}

export default Login;

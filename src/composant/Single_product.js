import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Tete from './Tete';
import Pied from './Pied';
import Axios from "axios";
import {AppContext,Provider} from './Context';

class Single_product extends Component{
	constructor(props) {
		super(props);
		this.state = {
			  listLivre:[],
			  post_found_L:true,
			  listNew:[],
			  post_found_N:true
		};
	  }
	  postShowN = (show) => {
        this.setState({
            post_found_N:show
        })
    }

	  static contextType = AppContext;   

	  addPanier = (id) => {
		const cc = this;
	  Axios.post( this.baseURL+'/php/add-panier.php' ,{
		  id : sessionStorage.getItem('biblioht_id'),
		  idLivre : id
	  }).then(function ({data}) {
			  if(data.success === 1){
			  }else{
				  alert(data.msg)
			  } 
		}).catch(error => {
				console.log(error);
			});
		}
		fetchNew = () => {
			fetch(this.baseURL+'/php/new-livre.php')
			.then(response => {
				response.json().then(function(data) {
					if(data.success === 1){
						this.setState({
							listNew:data.livre.reverse()
						});
						
					}else{
						this.context.postShowN(false);
					} 
					
				}.bind(this));
			})
			.catch(error => {
				console.log(error);
			});
		}
	  
	  postShowL = (show) => {
        this.setState({
            post_found_L:show
        })
	  }
	  fetchLivre = () => {
		fetch(this.baseURL+'/php/all-livre.php')
		.then(response => {
			response.json().then(function(data) {
				if(data.success === 1){
					this.setState({
						listLivre:data.livre.reverse()
					});
					
				}else{
					this.context.postShowL(false);
				} 
				
			}.bind(this));
		})
		.catch(error => {
			console.log(error);
		});
	}
	 componentDidMount(){
		this.fetchLivre();
		this.fetchNew();

	}

  render(){
	const contextValue = {
		post_show_L:this.postShowL,
		post_show_N:this.postShowN
	}
	let allLivre = this.state.listLivre.map(({idLivre,nomLivre,nbrePage,nomAuteur,prenomAuteur,nomEdition,pathLivre,prixLivre,description,categorie,pathImage}, index) => {
		return idLivre === this.props.location.aboutProps.id ? (
			<div className="container">
			<h1 className="text-logo"><span className="glyphicon glyphicon-cutlery"></span> Titre du Livre : {nomLivre} <span className="glyphicon glyphicon-cutlery"></span></h1>
			
				<div className="row">
				   <div className="col-sm-6">
						<br/>
						<form>
							<div className="form-group">
							<label>Description:</label><p>{description}</p>
						  </div>
						  <div className="form-group">
							<label>Prix:</label><p>{prixLivre+' Gdes'}</p>
						  </div>
						  <div className="form-group">
							<label>Catégorie:</label><p><strong>{categorie}</strong></p>
						  </div>
						  <div className="form-group">
							<label>Auteur:</label><p><strong>{prenomAuteur+' '+nomAuteur}</strong></p>
						  </div>
						  <div className="form-group">
							<label>Edition:</label><p><strong>{nomEdition} </strong></p>
						  </div>
						  <div className="form-group">
							<label>Nombre de Pages:</label><p><strong>{nbrePage}</strong></p>
						  </div>
						  <div className="form-group" hidden='hidden'>
							<h4>Share:</h4>
								<ul className="product-share">
									<li><NavLink to=""><i className="fab fa-facebook-f"></i></NavLink></li>
									<li><NavLink to=""><i className="fab fa-twitter"></i></NavLink></li>
									<li><NavLink to=""><i className="fab fa-google-plus-g"></i></NavLink></li>
									<li><NavLink to=""><i className="fab fa-linkedin"></i></NavLink></li>
								</ul>
						  </div>
						</form>
						<br/>
						<div className="form-actions">
						  <a className="btn btn-primary" href="/"><span className="glyphicon glyphicon-arrow-left"></span> Retour</a>
						</div>
					</div> 
					<div className="col-sm-6 site">
						<div className="thumbnail">
							<img width="350" height="350" src={require('../data/'+pathImage)} alt={nomLivre}/>
							<div className="price"></div>
							  <div className="caption">
								<NavLink to="" onClick={() => this.addPanier(idLivre)} className="cart-btn"><i className="fas fa-shopping-cart"></i> Ajouter au panier</NavLink>
							  </div>
						</div>
					</div>
				</div>
			</div>
		):(
			<></>
		);
	});
	let newLivre = this.state.listNew.map(({idLivre,nomLivre,prixLivre,pathImage}, index) => {
		return index<3  ? (
		<div className="card" key={idLivre}>
            <NavLink to="./single_product" id={idLivre}><img width="350" height="350" src={require( '../data/'+pathImage ) } alt={nomLivre}/></NavLink>
            <div className="card-body">
                <div className="single-product-item">
                    <div className="product-image">
                    </div>
                    <h3>{nomLivre}</h3>
                    <p className="product-price">{prixLivre}</p>
                    <div className = "panier">
                        <NavLink to="" className="cart-btn" onClick={() => this.addPanier(idLivre)}><i className="fas fa-shopping-cart"></i> Ajouter au panier</NavLink>
                    </div>
                </div>
            </div>
        </div>
		):(
			<div>
				Aucun Livre disponible
			</div>
		);
	});
	let showLivre,showNew;
	if(this.state.post_found_L){
		showLivre = (
			<div>
				{allLivre}
			</div>
		);
	}
	else{
		showLivre = (
			<div>
				<span>Aucun Livre disponible </span>
			</div>
			
		);
	}
	if(this.state.post_found_N){
		showNew = (
			<div>
				{newLivre}
			</div>
		);
	}
	else{
		showNew = (
			<div>
				<span>Aucun nouveau livre disponible </span>
			</div>
			
		);
	}
        return(
			<Provider value={contextValue}>
          <div>
    <Tete/>
            
{/* <!-- single product --> */}

<div className="single-product mt-150 mb-150">
	{showLivre}
</div>
{/* <!-- end single product --> */}

{/* <!-- more products --> */}
<div className="more-products mb-150">
	<div className="container">
		<div className="row">
			<div className="col-lg-8 offset-lg-2 text-center">
				<div className="section-title">	
					<h3><span className="orange-text">Autres</span> Produits</h3>
				</div>
			</div>
		</div>
		<div className="card-group">
	
	{showNew}


</div>

	</div>
</div>
{/* <!-- end more products --> */}


<Pied/>

   
          </div>
		  </Provider>
        );
  }
}

export default Single_product;

import React, { Component } from 'react';
import Tete from './Tete';
import Pied from './Pied';
import { NavLink,Redirect } from 'react-router-dom';
import {AppContext,Provider} from './Context';
import Axios from "axios";

class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listLivre:[],
			listeLivre:[],
			listNew:[],
			post_found_L:true,
			post_found_N:true,
			post_found_T:true
		};
	  }

	postShowL = (show) => {
        this.setState({
            post_found_L:show
        })
	}
	postShowT = (show) => {
        this.setState({
            post_found_T:show
        })
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
				alert('Success')				  
			  }else{
				  alert(data.msg)
			  } 
		}).catch(error => {
				console.log(error);
			});
		}
	  fetchNew = () => {
		  const cc = this;
		Axios.post( this.baseURL+'/php/new-livre.php' ,{
			id:null
		}).then(function ({data}) {
				if(data.success === 1){
					cc.setState({
						listNew : data.livre.reverse()
					});
				}else{
					cc.context.postShowN(false);
				} 
	}).catch(error => {
			console.log(error);
		});
	}
	fetchAll = () => {
		let cc = this;
		Axios.post( this.baseURL+'/php/alling-livre.php' ,{
			id:sessionStorage.getItem('biblioht_id')
		}).then(function ({data}) {
				if(data.success === 1){
					cc.setState({
						listeLivre : data.livre.reverse()
					});
				}else{
					cc.context.postShowT(false);
				} 
			}).catch(error => {
					console.log(error);
				});
	}
	  fetchLivre = () => {
		  const cc = this
		Axios.post( this.baseURL+'/php/all-livre.php' ,{
			id:null
		}).then(function ({data}) {
			if(data.success === 1){
					  cc.setState({
						  listLivre : data.livre.reverse()
					  });
				  }else{
					  cc.context.postShowL(false);
				  } 
		  })
		  .catch(error => {
			  console.log(error);
		  });
	  }
	componentDidMount(){
		this.fetchLivre();
		this.fetchNew();
		this.fetchAll();
	}

  render(){
	const contextValue = {
		post_show_L:this.postShowL,
		post_show_N:this.postShowN,
		post_show_T:this.postShowT
	}
	let allLivre = this.state.listLivre.map(({idLivre,nomLivre,nomAuteur,pathLivre,prixlivre,pathImage}, index) => {
		return index<3  ? (
		<div className="card float" key={idLivre}>
            <NavLink to={{ pathname: "/single_product",aboutProps:{id:idLivre} }} ><img width="250" height="250" src={require( '../data/'+pathImage ) } alt={nomLivre}/></NavLink>
            <div className="card-body">
                <div className="single-product-item">
                    <div className="product-image">
                    </div>
                    <h3>{nomLivre}</h3>
                    <p className="product-price">{prixlivre}</p>
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

	let aLivre = this.state.listeLivre.map(({idLivre,nomLivre,prixlivre,pathImage,pathLivre,idUser}, index) => {
		return idUser === sessionStorage.getItem('biblioht_id') ? (
		<div className="card float" key={idLivre}>
            <NavLink to={{ pathname: "/single_product",aboutProps:{id:idLivre} }}><img width="350" height="350" src={require( '../data/'+pathImage ) } alt={nomLivre}/></NavLink>
            <div className="card-body">
                <div className="single-product-item">
                    <div className="product-image">
                    </div>
                    <h3>{nomLivre}</h3>
                    <p className="product-price">{prixlivre}</p>
                    <div className = "panier">
					<NavLink to={{ pathname: "/Read",aboutProps:{path:pathLivre} }} className="cart-btn">Lire ce livre</NavLink>
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
	let newLivre = this.state.listNew.map(({idLivre,nomLivre,nomAuteur,prenomAuteur,nomEdition,description,prixlivre,pathImage}, index) => {
		return index<3 ? (
			<NavLink to={{ pathname: "/single_product",aboutProps:{id:idLivre} }}>
			<div className="col-md-6 float" key={idLivre}>
					<div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
						<div className="col p-4 d-flex flex-column position-static">
							<strong className="d-inline-block mb-2 text-success">{nomLivre}</strong>
							<h3 className="mb-0">Auteur :{nomAuteur+' '+prenomAuteur}</h3>
							<div className="mb-1 text-muted">Edition: {nomEdition} </div>
							<h3 className="mb-0">{prixlivre}</h3>
							
						</div>
						<div className="col-auto d-none d-lg-block">
							<img className="bd-placeholder-img" width="200" height="250" src={require( '../data/'+pathImage ) } />
						</div>	
					</div>
    			</div>
				</NavLink>
		):(
			<div>
				Aucun nouveau livre disponible
			</div>
		);
	});
	

	let showLivre,showNew,showALivre;
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
	if(this.state.post_found_T){
		showALivre = (
		<div>
			{aLivre}
		</div>
		);
	}
	else{
		showALivre = (
			<div>
				<span>Vous n'avez aucun Livre disponible </span>
			</div>
			
		);
	}



        return(
			<Provider value={contextValue}>
          <div>
   {/* header  */}
   <Tete/>   
			{/* <!-- product section --> */}
<div className="product-section mt-150 mb-150">
<div className="container">
    
    <div className="row" hidden='hidden'>
        
        <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">
                <h3><span className="orange-text">A propos</span></h3>
                <p>Biblioht a pour principale mission de faire valoir la culture et l’éducation en proposant sur sa plateforme biblioht.net des milliers de livres numériques gratuits ou payants.
                Désirant faire un grand impact, Biblioht rend accessible l’achat de livres avec des prix très abordable et pour encourager la production intellectuelle permet aux écrivains de publier leur ouvrages sans dépenses élevées. 
                Dans le but d’atteindre les jeunes, Biblioht organise des concours d’écritures, de lecture ….</p>
                <p>Et offre des formations et conférence sur des sujets divers : littérature, entrepreneuriat, éducation, philosophie …</p>
            </div> 
        </div>
    </div>
    <div className="row">
        <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">	
                <h3><span className="orange-text">Nos</span> Livres </h3>
            </div>
        </div>
    </div>
    
    <div className="card-group floating">
        
        
        {showLivre}
  
  
    </div>
    
    
</div>
</div>
{/* <!-- end product section --> */}

{/* <!-- cart banner section --> */}
<section className="cart-banner pt-100 pb-100 floating">
<div className="container" hidden='hidden'>
    <div className="row clearfix">
        {/* <!--Image Column--> */}
        <div className="image-column col-lg-6">
            <div className="image">
                <div className="price-box">
                    <div className="inner-price">
                        <span className="price">
                            <strong>30%</strong> <br/> off
                        </span>
                    </div>
                </div>
                <img src="assets/img/a.jpg" alt=""/>
            </div>
        </div>
        {/* <!--Content Column--> */}
        <div className="content-column col-lg-6">
            <h3><span className="orange-text">Deal</span> du mois</h3>
            <h4>Hikan Strwaberry</h4>
            <div className="text">Quisquam minus maiores repudiandae nobis, minima saepe id, fugit ullam similique! Beatae, minima quisquam molestias facere ea. Perspiciatis unde omnis iste natus error sit voluptatem accusant</div>
            {/* <!--Countdown Timer--> */}
            <div className="time-counter"><div className="time-countdown clearfix" data-countdown="2020/2/01"><div className="counter-column"><div className="inner"><span className="count">00</span>Days</div></div> <div className="counter-column"><div className="inner"><span className="count">00</span>Hours</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Mins</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Secs</div></div></div></div>
            <NavLink to="cart.html" className="cart-btn mt-3"><i className="fas fa-shopping-cart"></i> Ajouter au panier</NavLink>
        </div>
    </div>
</div>
</section>
{/* <!-- end cart banner section --> */}


{/* <!-- latest news --> */}
<div className="latest-news pt-150 pb-150 floating">

<div className="container">

    <div className="row">
        <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">	
                <h3><span className="orange-text">Nos</span> Nouveaux Livres</h3>
            </div>
        </div>
    </div>
    
    
    <div className="row mb-2">
				
				
				{showNew}
				
			  
	</div>
    <div className="row">
        <div className="col-lg-12 text-center">
            <NavLink to="/News" className="boxed-btn">Plus de nouveaux livres </NavLink>
        </div>
    </div>
</div>
</div>
	{/* <!-- end latest news --> */}
			{/* <!-- product section --> */}
<div className="product-section mt-150 mb-150">
<div className="container">
    <div className="row">
        <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">	
                <h3><span className="orange-text">Mes</span> Livres</h3>
            </div>
        </div>
    </div>
    
    <div className="card-group floating">
        
        
        {showALivre}
  
  
    </div>
    
    
</div>
</div>
{/* <!-- end product section --> */}
			{/* footer */}
			<Pied/>
          </div>
		</Provider>
        );
  }
}

export default Home;

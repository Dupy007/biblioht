import React, { Component } from 'react';
import Tete from './Tete';
import Pied from './Pied';
import { NavLink } from 'react-router-dom';
import {AppContext,Provider} from './Context';
import Axios from "axios";

class Shop extends Component{
  constructor(props) {
		super(props);
		this.state = {
			listLivre:[],
			listeLivre:[],
			listNew:[],
			post_found_L:true,
			post_found_N:true,
			post_found_T:false
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
	  fetchType = (type) => {
		  const cc = this;
		Axios.post( this.baseURL+'/php/type-livre.php' ,{
			type:type
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
			id:1
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
			id:1
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
		this.fetchType();
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
              <NavLink to={{ pathname: "/single_product",aboutProps:{id:idLivre} }} ><img width="350" height="350" src={require( '../data/'+pathImage ) } alt={nomLivre}/></NavLink>
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
  
    let aLivre = this.state.listeLivre.map(({idLivre,nomLivre,avoir,idUser,panier,nomAuteur,pathLivre,prixlivre,pathImage}, index) => {
      return index<3  ? (
      <div className="card col-lg-6 col-md-6 float" key={idLivre}>
              <NavLink to={{ pathname: "/single_product",aboutProps:{id:idLivre} }} ><img width="350" height="350" src={require( '../data/'+pathImage ) } alt={nomLivre}/></NavLink>
              <div className="card-body">
                  <div className="single-product-item">
                      <div className="product-image">
                      </div>
                      <h3>{nomLivre}</h3>
                      <p className="product-price">{prixlivre}</p>
                      <div className = "panier">
            { idUser === sessionStorage.getItem('biblioht_id') ?(
              panier===true ?(
                (avoir===true)?(
                  <NavLink to={{pathname:'/Read',aboutProps:{id:idLivre} }} className="cart-btn"><i className="fas fa-shopping-cart"></i> Lire</NavLink>
                ):(
                  <NavLink to={{pathname:'/Check_out',aboutProps:{id:idLivre} }} className="cart-btn"><i className="fas fa-shopping-cart"></i> Payer</NavLink>
                )):(
                          <NavLink to="" className="cart-btn" onClick={() => this.addPanier(idLivre)}><i className="fas fa-shopping-cart"></i> Ajouter au panier</NavLink>
             ) ):(<></>) }
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
    
  
    let showLivre,showNew;
    if(this.state.post_found_T){
      showLivre = (
        <div>
          {aLivre}
        </div>
      );
    }else if(this.state.post_found_L){
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

            {/* header  */}
            <Tete/>   
	
            
	{/* <!-- products --> */}
	<div className="product-section mt-150 mb-150 floating">
<div className="container-fluid">
  <div className="row">
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sidebar-sticky pt-3">
	  <h1 className="h2"><span className="orange-text">Categories</span></h1>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active orange-text" href="" onClick={() => this.fetchType('Education')} >
              <span data-feather="home"></span>
              Education
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link orange-text" href="" onClick={() => this.fetchType('Bien_etre')}>
              <span data-feather="file"></span>
              Bien-etre
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link orange-text" href="" onClick={() => this.fetchType('Cuisine')}>
              <span data-feather="shopping-cart"></span>
              Cuisine
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link orange-text" href="" onClick={() => this.fetchType('Roman')}>
              <span data-feather="users"></span>
              Roman
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link orange-text" href="" onClick={() => this.fetchType('Science_fiction')}>
              <span data-feather="bar-chart-2"></span>
              Scince-Fiction
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link orange-text" href="" onClick={() => this.fetchType('BD_humour')}>
              <span data-feather="layers"></span>
              BD et Humour
            </a>
          </li>
		  <li className="nav-item">
            <a className="nav-link orange-text" href="" onClick={() => this.fetchType('Jeunesse')}>
              <span data-feather="layers"></span>
              Livre Jeunesse
            </a>
          </li>
		  <li className="nav-item">
            <a className="nav-link orange-text" href="" onClick={() => this.fetchType('Histoire')}>
              <span data-feather="layers"></span>
              Histoire
            </a>
          </li>
        
      </ul>

        
      </div>
    </nav>

    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 floating">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2"><span className="orange-text">Tous</span> les livres</h1>
		{/* <h3><span className="orange-text">Les meilleures</span> ventes </h3> */}
  </div>
{showLivre}
    </main>
  </div>
</div>

            </div>
			
		 


					
	
	{/* <!-- end products --> */}


            <Pied/>
          </div>
          </Provider>
        );
  }
}

export default Shop;

import React, { Component } from 'react';
import Tete from './Tete';
import Pied from './Pied';
import { NavLink } from 'react-router-dom';
import {AppContext,Provider} from './Context';
import Axios from "axios";

class Cart extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listpro:[],
			post_found_P:true
		};
	  }

	postShowP = (show) => {
        this.setState({
            post_found_P:show
        })
    }
	delPanier = (id) => {
		const cc = this;
	  Axios.post( this.baseURL+'/php/del-panier.php' ,{
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
	  static contextType = AppContext;   
	  fetchNew = () => {
				const cc = this;
			Axios.post( this.baseURL+'/php/all-panier.php' ,{
				id:sessionStorage.getItem('biblioht_id')
			}).then(function ({data}) {
					if(data.success === 1){
						cc.setState({
							listpro : data.livre.reverse()
						});
					}else{
						cc.context.postShowP(false);
					} 
		}).catch(error => {
				console.log(error);
			});
		}
	componentDidMount(){
		this.fetchNew();
	}


  render(){
	const contextValue = {
		post_show_P:this.postShowP
	}
	let tot =0
	let panierLivre = this.state.listpro.map(({idLivre,nomLivre,avoir,prixLivre,pathImage}, index) => {
		return avoir === '0'  ? (
			<tr className="table-body-row" key={idLivre}>
				<td className="product-remove"><NavLink to="" onClick={() => this.delPanier(idLivre)}><i className="far fa-window-close" ></i></NavLink></td>
				<td className="product-image"><img src={require('../data/'+pathImage)} alt=""/></td>
				<td className="product-name">{nomLivre}</td>
				<td className="product-price">{prixLivre+' Gdes'}</td>
			</tr>
		):(
			<div>
				Aucun produit dans le panier
			</div>
		);
	});
	let panierArgent = this.state.listpro.map(({idLivre,prixLivre}, index) => {
		return prixLivre ? (tot=tot+Number(prixLivre),
			<tbody>
				<tr className="total-data">
						<td><strong>Sous-total: </strong></td>
						<td>{tot + ' Gdes'}</td>
					</tr>
					<tr className="total-data">
						<td><strong>Taxes: </strong></td>
						<td>0 Gdes</td>
					</tr>
					<tr className="total-data">
						<td><strong>Total: </strong></td>
						<td>{tot + ' Gdes'}</td>
				</tr>
			</tbody>
		):(
			<div>
				Aucun produit dans le panier
			</div>
		);
	});

	let showPanier,showArgent;
	if(this.state.post_found_P){
		showPanier = (
			<div className="col-lg-8 col-md-12">
					<div className="cart-table-wrap">
						<table className="cart-table">
							<thead className="cart-table-head">
								<tr className="table-head-row">
									<th className="product-remove"></th>
									<th className="product-image">Image du produit</th>
									<th className="product-name">Nom</th>
									<th className="product-price">Prix</th>
								</tr>
							</thead>
							<tbody>
								{panierLivre}
							</tbody>
						</table>
					</div>
				</div>
		);
	}
	else{
		showPanier = (
			<div className="col-lg-8 col-md-12">
					<div className="cart-table-wrap">
						<table className="cart-table">
							<thead className="cart-table-head">
								Aucun livre dans le panier
							</thead>
							
						</table>
					</div>
				</div>
			
		);
	}

	if(this.state.post_found_P){
		showArgent = (
				<div className="col-lg-4">
					<div className="total-section">
						<table className="total-table">
							<thead className="total-table-head">
								<tr className="table-total-row">
									<th>Total</th>
									<th>Prix</th>
								</tr>
							</thead>
							
								{panierArgent}
							
						</table>
						<div className="cart-buttons">
							<NavLink to="/Check_out" className="boxed-btn black">Caisse</NavLink>
						</div>
					</div>

					<div className="coupon-section hidden" hidden='hidden'>
						<h3>Apply Coupon</h3>
						<div className="coupon-form-wrap">
							<form action="index.html">
								<p><input type="text" placeholder="Coupon"/></p>
								<p><input type="submit" value="Apply"/></p>
							</form>
						</div>
					</div>
				</div>
			
		);
	}
	else{
		showArgent = (
				<div className="col-lg-4">
					<div className="total-section">
						<table className="total-table">
							<thead className="total-table-head">
								<tr className="table-total-row">
									<th>Total</th>
									<th>Prix</th>
								</tr>
							</thead>
							<tbody>
								<tr className="total-data">
									<td><strong>Sous-total: </strong></td>
									<td>0 Gdes</td>
								</tr>
								<tr className="total-data">
									<td><strong>Taxes: </strong></td>
									<td>0 Gdes</td>
								</tr>
								<tr className="total-data">
									<td><strong>Total: </strong></td>
									<td>0 Gdes</td>
								</tr>
							</tbody>
						</table>
						
					</div>

				</div>
			
			
		);
	}
        return(
			<Provider value={contextValue}>
			<div>
{console.log(this.state.listpro)}
           {/* header  */}
		   <Tete/>   
	{/* <!-- cart --> */}
	<div className="cart-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				{showPanier}
				{showArgent}
			</div>
		</div>
	</div>
	{/* <!-- end cart --> */}
			{/* footer */}
			<Pied/>

          </div>
		  </Provider>
        );
  }
}

export default Cart;

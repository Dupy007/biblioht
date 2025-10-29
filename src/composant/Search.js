import React, { Component } from 'react';
import Tete from './Tete';
import Pied from './Pied';
import { NavLink } from 'react-router-dom';
import {AppContext,Provider} from './Context';
import Axios from "axios";

class Search extends Component{
	constructor(props) {
		super(props);
		this.state = {
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

	  fetchNew = () => {
		const cc = this;
	  Axios.post( this.baseURL+'/php/all-livre.php' ,{
		  cle : cc.props.location.aboutProps.cle
	  }
	  ).then(function ({data}) {
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
	componentDidMount(){
		this.fetchNew();
	}
  render(){
	const contextValue = {
		post_show_N:this.postShowN
	}
	const cle = this.props.location.aboutProps.cle
	let newLivre = this.state.listNew.map(({idLivre,nomLivre,nomAuteur,prenomAuteur,nomEdition,description,prixlivre,pathImage}, index) => {
		return nomLivre === cle ? (
				<div className="col-md-6 float" key={idLivre}>
				
					<div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
						<div className="col p-4 d-flex flex-column position-static">
							<strong className="d-inline-block mb-2 text-success">{nomLivre}</strong>
							<h3 className="mb-0">Auteur :{nomAuteur+' '+prenomAuteur}</h3>
							<div className="mb-1 text-muted">Edition: {nomEdition} </div>
							<h3 className="mb-0">{prixlivre}</h3>
							
						</div>
						<div className="col-auto d-none d-lg-block">
							<img width="200" height="250" src={require('../data/'+pathImage)} />
							{/* <svg className="bd-placeholder-img" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#000"/></svg> */}
						</div>	
					</div>
    			</div>
		):(
			<div>
			</div>
		);
	});

	let showNew;
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
				<span >Aucun nouveau livre disponible </span>
			</div>
			
		);
	}

    return(
		<Provider value={contextValue}>
        <div>
                {/* header  */}
                <Tete/>   
    
	{/* <!-- latest news --> */}
	<div className="latest-news mt-150 mb-150 floating">
		<div className="container">
			<div className="row mb-2">

				{showNew}
				
			</div>
		</div>
	</div>
	{/* <!-- end latest news --> */}

                {/* footer */}
                <Pied/>

        </div>
		</Provider>

    );
  }
}

export default Search;

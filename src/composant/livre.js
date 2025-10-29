import React,{Component} from 'react';
import {Provider} from './Context';
import Head from './head';
import Foot from './foot';
import Axios from 'axios';

class Livre extends Component {
    state = {
        post_found:true,
        livre:[]
    }


    postShow = (show) => {
        this.setState({
            post_found:show
        })
    }

    fetchLivres = () => {
        fetch(this.baseURL+'/php/all-livre.php')
        .then(response => {
            response.json().then(function(data) {
                if(data.success === 1){
                    this.setState({
                        livre:data.livre.reverse()
                    });
                } 
                else{
                    this.context.post_show(false);
                }               
            }.bind(this));
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchLivres();
    }

    handleDelete = (idLivre) => {
        let deleteLivre = this.state.livre.filter(livre => {
            return livre.idLivre !== idLivre;
        });
        
        Axios.post(this.baseURL+'/php/del-livre.php',{
            idLivre:idLivre
        })
        .then(({data}) => {
            if(data.success === 1){
                this.setState({
                    livre:deleteLivre
                });
            }
            else{
                alert(data.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    render(){
        const contextValue = {
            post_show:this.postShow
        }

        let allLivre = this.state.livre.map(({idLivre,nomLivre,prenomAuteur,nomAuteur,edition,pathLivre,pathImage,description,ageLecture,nbrePage,categorie,prixLivre,isEditing}, index) => {
                
            return isEditing === true ? (   
            <tr key={idLivre}>
                <td><input className="form-control" type="text" ref={(item) => this.pathLivre = item} defaultValue={pathLivre}/></td>
                <td><input className="form-control" type="email" ref={(item) => this.pathImage = item} defaultValue={pathImage}/></td>
                {/* <td>
                    <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(idUser)}>Save</button>
                    <button onClick={() => this.cancleEdit(idUser)} className="btn btn-light">Cancel</button>
                </td> */}
            </tr>
            ):
            ( 
                <tr key={idLivre}>
                    <td>{nomLivre}</td>
                    <td>{nomAuteur+' ' +prenomAuteur}</td>
                    <td>{edition}</td>
                    <td>{pathLivre}</td>
                    <td>{description}</td>
                    <td>{prixLivre}</td>
                    <td>{ageLecture}</td>
                    <td>{nbrePage}</td>
                    <td>{categorie}</td>
                    <td>{pathImage}</td>
                    <td>
                        <button className="btn btn-dark mr-2" onClick={() => this.editMode(idLivre)}>Edit</button>
                        <button onClick={() => this.handleDelete(idLivre)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });
        let showLivre;
        if(this.state.post_found){
            showLivre = (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nom du Livre</th>
                            <th>Auteur</th>
                            <th>Edition</th>
                            <th>Reference Livre</th>
                            <th>Description</th>
                            <th>Prix</th>
                            <th>Age de lecture</th>
                            <th>Nbre de page</th>
                            <th>Categorie</th>
                            <th>Reference Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allLivre}
                    </tbody>
                </table>
            );
        }
        else{
            showLivre = (
                <div className="alert alert-light" role="alert">
                    <h4 className="alert-heading">Aucun Livre trouvée!</h4>
                </div>
            );
        }

return (
            <Provider value={contextValue}>
            <Head/>
            <div className="container-fluid bg-light">
            <div className="container p-5">
                <div className="card shadow-sm">
                    <h1 className="card-header text-center text-uppercase text-muted">Liste Livres</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {showLivre}
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
            </div>
            <Foot/>
        </Provider>
        );
    }
}
export default Livre;
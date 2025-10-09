import React,{Component} from 'react';
import {Provider} from './Context';
import Head from './head';
import Foot from './foot';
import Axios from 'axios';

class Type extends Component {
    state = {
        post_found:true,
        Cpt:[]
    }


    postShow = (show) => {
        this.setState({
            post_found:show
        })
    }

    fetchCpt = () => {
        const cc = this;
      Axios.post( this.baseURL+'/php/all-cpt.php')
      .then(function ({data}) {
              if(data.success === 1){
                  cc.setState({
                      Cpt : data.users.reverse()
                  });
              }else{
                  cc.context.postShow(false);
              } 
  }).catch(error => {
          console.log(error);
      });
  }

    componentDidMount(){
        this.fetchCpt();
    }

    handleDelete = (idUser) => {
        let deleteCpt = this.state.livre.filter(cpt => {
            return cpt.idUser !== idUser;
        });
        
        Axios.post('http://localhost/Project/test/php-react-master/delete-cpt.php',{
            idUser:idUser
        })
        .then(({data}) => {
            if(data.success === 1){
                this.setState({
                    cpt:deleteCpt
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

        let allCpt = this.state.Cpt.map(({idUser,prenom,email,mdp,typeC,isEditing}, index) => {
                
            return isEditing === true ? (   
            <tr key={idUser}>
                <td>{prenom}</td>
                    <td>{email}</td>
                    <td>{mdp}</td>
                    <td>
                        <select id='statut' name='statut' class='form-control form-control-lg col-md-6 col-lg-12'>
                            <option value='auteur'>Auteur</option>
                            <option value='ecolier'>Ecolier</option>
                            <option value='etudiant'>Etudiant</option>
                            <option value='professionnel'>Professionnel</option>
                            <option value='autre'>Autre</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </td>
                    <td>
                    <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(idUser)}>Save</button>
                    <button onClick={() => this.cancleEdit(idUser)} className="btn btn-light">Cancel</button>
                </td>
            </tr>
            ):
            ( 
                <tr key={idUser}>
                    <td>{prenom}</td>
                    <td>{email}</td>
                    <td>{typeC}</td>
                    <td>
                        <button className="btn btn-dark mr-2" onClick={() => this.editMode(idUser)}>Edit</button>
                        <button onClick={() => this.handleDelete(idUser)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });
        let showCpt;
        if(this.state.post_found){
            showCpt = (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Type de compte</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCpt}
                    </tbody>
                </table>
            );
        }
        else{
            showCpt = (
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
                    <h1 className="card-header text-center text-uppercase text-muted">Liste Cpts</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {showCpt}
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
export default Type;
import React,{Component} from 'react';
import Users from './liste_membre';
// import AddUser from './AddUser';
import {Provider} from './Context';
import Head from './head';
import Foot from './foot';
class Liste extends Component {
    state = {
        post_found:true,
        new_user:false
    }

    postShow = (show) => {
        this.setState({
            post_found:show
        })
    }
    
    render(){
        const contextValue = {
            new_user:this.state.new_user,
            addNewUser:this.addNewUser,
            post_show:this.postShow
        }

        let showUsers;
        if(this.state.post_found){
            showUsers = (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Birthday</th>
                            <th>Adresse</th>
                            <th>Sexe</th>
                            <th>Statut</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Users/>
                    </tbody>
                </table>
            );
        }
        else{
            showUsers = (
                <div className="alert alert-light" role="alert">
                    <h4 className="alert-heading">Aucun User trouvée!</h4>
                    <hr/>
                    
                </div>
            );
        }

return (
            <Provider value={contextValue}>
            <Head/>
            <div className="container-fluid bg-light">
            <div className="container p-5">
                <div className="card shadow-sm">
                    <h1 className="card-header text-center text-uppercase text-muted">Liste utilisateurs</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {showUsers}
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
export default Liste;
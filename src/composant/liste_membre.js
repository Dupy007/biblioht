import React, {Component} from 'react';
// import Modal from 'react-modal';
import Axios from 'axios';
import {AppContext} from './Context';

class Users extends Component {
 
    static contextType = AppContext;   
        
        state = {
            users:[]
        }
        
        fetchUsers = () => {
            fetch(this.baseURL+'/php/all-users.php')
            .then(response => {
                response.json().then(function(data) {
                    if(data.success === 1){
                        this.setState({
                            users:data.users.reverse()
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
            this.fetchUsers();
        }
        handleUpdate = (id) => {
            Axios.post(this.baseURL+'/php/update-user.php',
            {
                id:id,
                user_name:this.name.value,
                user_email:this.email.value
            })
            .then(({data}) => {
                if(data.success === 1){
                    let users = this.state.users.map(user => {
                        if(user.id === id){
                            user.user_name = this.name.value;
                            user.user_email = this.email.value;
                            user.isEditing = false;
                            return user;
                        }
                        return user; 
                    });
                    this.setState({
                        users
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
    
        
        editMode = (id) => {
            let users = this.state.users.map(user => {
                if(user.id === id){
                    user.isEditing = true;
                    return user;
                }
                user.isEditing = false;
                return user;
                
            });
    
            this.setState({
                users
            });
           
        }
    
        cancleEdit = (id) => {
            let users = this.state.users.map(user => {
                if(user.id === id){
                    user.isEditing = false;
                    return user;
                }
                return user
                
            });
            this.setState({
                users
            });
        }
    
        handleDelete = (iduser) => {
            let deleteUser = this.state.users.filter(user => {
                return user.iduser !== iduser;
            });
            
            Axios.post(this.baseURL+'/php/delete-user.php',{
                iduser:iduser
            })
            .then(({data}) => {
                if(data.success === 1){
                    this.setState({
                        users:deleteUser
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
    
            let allUsers = this.state.users.map(({idUser,prenomUser,nomUser,sexeUser,birthUser,emailUser,statutUser,phone,ville,depart,pays,isEditing}, index) => {
                
                return isEditing === true ? (   
                <tr key={idUser}>
                    <td><input className="form-control" type="text" ref={(item) => this.prenomUser = item} defaultValue={prenomUser}/></td>
                    <td><input className="form-control" type="text" ref={(item) => this.nomUser = item} defaultValue={nomUser}/></td>
                    <td><input className="form-control" type="text" ref={(item) => this.phone = item} defaultValue={phone}/></td>
                    <td><input className="form-control" type="text" ref={(item) => this.ville = item} defaultValue={ville}/></td>
                    <td><input className="form-control" type="text" ref={(item) => this.depart = item} defaultValue={depart}/></td>
                    <td><input className="form-control" type="text" ref={(item) => this.pays = item} defaultValue={pays}/></td>
                    <td><input className="form-control" type="email" ref={(item) => this.email = item} defaultValue={emailUser}/></td>
                    <td>
                        <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(idUser)}>Save</button>
                        <button onClick={() => this.cancleEdit(idUser)} className="btn btn-light">Cancel</button>
                    </td>
                </tr>
                ):
                ( 
                    <tr key={idUser}>
                        <td>{nomUser}</td>
                        <td>{prenomUser}</td>
                        <td>{emailUser}</td>
                        <td>{birthUser}</td>
                        <td>{ville+' ' +depart+' '+pays}</td>
                        <td>{sexeUser}</td>
                        <td>{statutUser}</td>
                        <td>{phone}</td>
                        <td>
                            <button className="btn btn-dark mr-2" onClick={() => this.editMode(idUser)}>Edit</button>
                            <button onClick={() => this.handleDelete(idUser)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                );
            });
    
            
    
            return(
                <>
                {allUsers}
                </>
            );
            
        }

    

}export default  Users;
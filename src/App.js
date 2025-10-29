import React, { Component } from 'react';
import { BrowserRouter, Route, Switch , Redirect } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

// importation component
import Contact from './composant/Contact';
import Home from './composant/Home';
import About from './composant/About';
import Error from './composant/Error';
import Categorie from './composant/Shop';
import Check_out from './composant/Check_out';
import  InsertAuteur from './composant/InsertAuteur';
import InsertLivre from './composant/InsertLivre';
import InsertEdition from './composant/InsertEdition';
import Cart from './composant/Cart';
import Single_product from './composant/Single_product';
import Login from './composant/Login';
import Admin from './composant/admin';
import Register from './composant/Register';
import Users from './composant/liste_membre';
import News from './composant/News';
import Liste from './composant/liste';
import Livre from './composant/livre';

import Readviewerr from './composant/Read';
import Type from './composant/liste_type';
import Search from './composant/Search';
class App extends Component{

  constructor(props) {
	  super(props);
	  this.state = {
    prenom : sessionStorage.getItem('biblioht_prenom'),
    type : sessionStorage.getItem('biblioht_cpt')
  };
      this.baseURL = process.env.REACT_APP_BASE_URL;
  }



  render(){ 
    if(this.state.type==='admin'){
      return(
      <BrowserRouter>
        <div>
          <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/InsertAuteur" component={InsertAuteur}/>
              <Route path="/Type" component={Type}/>
              <Route path="/InsertLivre" component={InsertLivre}/>
              <Route path="/InsertEdition" component={InsertEdition}/>
              <Route path="/Users" component={Users}/>
              <Route path="/Liste" component={Liste}/>
              <Route path="/Livre" component={Livre}/>
              <Route path="/Liste_type" component={Type}/>
              <Route path="/Cart" component={Cart}/>
              <Route path="/Search" component={Search}/>
              <Route path="/Shop" component={Categorie}/>
              <Route path="/Single_product" component={Single_product}/>
              <Route path="/About" component={About}/>
              <Route path="/Contact" component={Contact}/>
              <Route path="/Check_out" component={Check_out}/>
              <Route path="/News" component={News}/>  
              <Route path="/Read" component={Readviewerr}/>  
              <Route component={Error}/>  
         </Switch>
      </div> 
    </BrowserRouter>
      );
    }else if(this.state.type === 'auteur'){
      return(
      <BrowserRouter>
        <div>
          <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/Cart" component={Cart}/>
              <Route path="/Single_product" component={Single_product}/>
              <Route path="/About" component={About}/>
              <Route path="/Contact" component={Contact}/>
              <Route path="/Check_out" component={Check_out}/>
              <Route path="/News" component={News}/>
              <Route path="/Read" component={Readviewerr}/>  
              <Route component={Error}/>  
         </Switch>
      </div> 
    </BrowserRouter>
      );
    }else if(this.state.type === 'etudiant'){
      return(
        <BrowserRouter>
        <div>
          <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/Cart" component={Cart}/>
              <Route path="/Single_product" component={Single_product}/>
              <Route path="/About" component={About}/>
              <Route path="/Contact" component={Contact}/>
              <Route path="/Check_out" component={Check_out}/>
              <Route path="/News" component={News}/>
              <Route path="/Read" component={Readviewerr}/>  
              <Route component={Error}/>  
         </Switch>
      </div> 
    </BrowserRouter>
      );
    }else if(this.state.type === 'user' ){
      return(
        <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/Cart" component={Cart}/>
            <Route path="/Shop" component={Categorie}/>
            <Route path="/Single_product" component={Single_product}/>
            <Route path="/About" component={About}/>
            <Route path="/Contact" component={Contact}/>
            <Route path="/Check_out" component={Check_out}/>
            <Route path="/News" component={News}/>              
            <Route path="/Read" component={Readviewerr}/>  
            <Route component={Error}/>  
         </Switch>
      </div> 
    </BrowserRouter>
      );
    }else if(this.state.type === null ){
        return(
          <BrowserRouter>
          <div>
            <Switch>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <Route path="/Admin" component={Admin}/>
            
            <Route path="/">
            {!this.state.type ? <Redirect to="/Login" /> || <Redirect to="/Register" /> : null}
            </Route>
            <Route component={Error}/>  
           </Switch>
        </div> 
      </BrowserRouter>
        );
    }
  }
}

export default App;

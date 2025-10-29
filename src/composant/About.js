import React, { Component } from 'react';
import Tete from './Tete';
import Pied from './Pied';
import { NavLink } from 'react-router-dom';

class About extends Component{
  render(){
    return(
        <div>

               {/* header  */}
               <Tete/>   
            {/* <!-- featured section --> */}
            <div className="feature-bg">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="featured-text">
                      <h2 className="pb-3">A propos de  <span className="blue">Biblio</span><span className='red'>ht</span> ?</h2>
                      <div className="row">
                      <div className="col-lg-10 col-md-6 mb-4 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-shipping-fast"></i>
                            </div>
                            <div className="content">
                              <h3>C’est quoi Biblioht ? </h3>
                             <p> Biblioht est une plateforme en ligne qui offre des livres numériques d’auteurs Haïtiens et étrangers gratuits et payants. </p>
                             </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-4 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-shipping-fast"></i>
                            </div>
                            <div className="content">
                              <h3>Pourquoi le nom biblioht ?  </h3>
                             <p> Le nom Biblioht est composé de biblio qui vient de bibliothèque et HT qui se prononce acheter (achat de livres numériques) et aussi HT est une marque d’Haïti afin que l’on sache que c’est un produit Haïtien. </p>
                             </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-4 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-shipping-fast"></i>
                            </div>
                            <div className="content">
                              <h3>Mission </h3>
                              <p>Biblioht a pour principale mission de faire valoir la culture et l’éducation en proposant sur sa plateforme biblioht.net des milliers de livres numériques gratuits ou payants.
                               Désirant faire un grand impact, Biblioht rend accessible l’achat de livres avec des prix très abordable et pour encourager la production intellectuelle permet aux écrivains de publier leur ouvrages sans dépenses élevées. 
                              Dans le but d’atteindre les jeunes, Biblioht organise des concours d’écritures, de lecture ….</p>
                             <p>Et offre des formations et conférence sur des sujets divers : littérature, entrepreneuriat, éducation, philosophie …</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-5 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-money-bill-alt"></i>
                            </div>
                            <div className="content">
                              <h3>Nos services </h3>
                              <p>Biblioht offre plusieurs services :</p>
                              <p> -	La mise en ventes de livres sur la plateforme</p>
                              <p>-	Consultation Marketing pour les livres en ventes </p>
                              <p>-	Edition de livre</p>
                              <p>-	Achat de livres via Moncash ou une carte de crédit ou de débit </p>
                              <p>-	Lecture en ligne de livres gratuits</p>
                              <p>-	Numérisation de documents </p>
                              <p>-	Publicités </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-6 mb-5 mb-md-5">
                          <div className="list-box d-flex">
                            <div className="list-icon">
                              <i className="fas fa-briefcase"></i>
                            </div>
                            <div className="content">
                              <h3>Apports et innovations</h3>
                              <p>Les services de BIBLIO HT apportent un renouveau dans la filière du livre en Haïti. Dans un monde en perpétuel évolution, cette filière était restée dans le cadre traditionnelle et n’a pas emboité le pas avec la technologie du numérique.</p>
                              <p>Avec BIBLIO HT, la jeunesse Haïtienne mais aussi les amants de la lecture pourront faire un usage beaucoup plus efficace des technologies de l’information et de la communication (TIC).</p>
                              <p>BIBLIO HT est la première plateforme Haïtienne permettant l’achat de livres numériques avec les méthodes de paiement locales (Mon cash, Lajan Cash, Cash Mobile). C’est aussi la première plateforme qui offre un service gratuit pour l’accès à plus de 2 000 livres pour tous les lycées d’Haïti.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end featured section --> */}

            {/* <!-- team section --> */}
            <div className="mt-150">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 offset-lg-2 text-center">
                    <div className="section-title">
                      <h3>Notre <span className="orange-text">Groupe</span></h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="single-team-item">
                      <div className="team-bg team-bg-1"></div>
                      <h4>Jimmy Doe <span>Farmer</span></h4>
                      <ul className="social-link-team">
                        <li><NavLink to="#" target="_blank"><i className="fab fa-facebook-f"></i></NavLink></li>
                        <li><NavLink to="#" target="_blank"><i className="fab fa-twitter"></i></NavLink></li>
                        <li><NavLink to="#" target="_blank"><i className="fab fa-instagram"></i></NavLink></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="single-team-item">
                      <div className="team-bg team-bg-2"></div>
                      <h4>Marry Doe <span>Farmer</span></h4>
                      <ul className="social-link-team">
                        <li><NavLink to="#" target="_blank"><i className="fab fa-facebook-f"></i></NavLink></li>
                        <li><NavLink to="#" target="_blank"><i className="fab fa-twitter"></i></NavLink></li>
                        <li><NavLink to="#" target="_blank"><i className="fab fa-instagram"></i></NavLink></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                    <div className="single-team-item">
                      <div className="team-bg team-bg-3"></div>
                      <h4>Simon Joe <span>Farmer</span></h4>
                      <ul className="social-link-team">
                        <li><NavLink to="#" target="_blank"><i className="fab fa-facebook-f"></i></NavLink></li>
                        <li><NavLink to="#" target="_blank"><i className="fab fa-twitter"></i></NavLink></li>
                        <li><NavLink to="#" target="_blank"><i className="fab fa-instagram"></i></NavLink></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end team section --> */}

            {/* <!-- testimonail-section --> */}
            <div className="testimonail-section mt-80 mb-150">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 offset-lg-1 text-center">
                    <div className="testimonial-sliders">
                      <div className="single-testimonial-slider">
                        <div className="client-avater">
                          <img src="assets/img/avaters/avatar1.png" alt=""/>
                        </div>
                        <div className="client-meta">
                          <h3>Saira Hakim <span>Local shop owner</span></h3>
                          <p className="testimonial-body">
                            " Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
                          </p>
                          <div className="last-icon">
                            <i className="fas fa-quote-right"></i>
                          </div>
                        </div>
                      </div>
                      <div className="single-testimonial-slider">
                        <div className="client-avater">
                          <img src="assets/img/avaters/avatar2.png" alt=""/>
                        </div>
                        <div className="client-meta">
                          <h3>David Niph <span>Local shop owner</span></h3>
                          <p className="testimonial-body">
                            " Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
                          </p>
                          <div className="last-icon">
                            <i className="fas fa-quote-right"></i>
                          </div>
                        </div>
                      </div>
                      <div className="single-testimonial-slider">
                        <div className="client-avater">
                          <img src="assets/img/avaters/avatar3.png" alt=""/>
                        </div>
                        <div className="client-meta">
                          <h3>Jacob Sikim <span>Local shop owner</span></h3>
                          <p className="testimonial-body">
                            " Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
                          </p>
                          <div className="last-icon">
                            <i className="fas fa-quote-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end testimonail-section --> */}
     
       {/* footer */}
      <Pied/>

        </div>

    );
  }
}

export default About;

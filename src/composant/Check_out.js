import React, { Component } from "react";
import Tete from "./Tete";
import Pied from "./Pied";
import { NavLink } from "react-router-dom";
import { AppContext, Provider } from "./Context";
import Axios from "axios";
import jQuery from "../assets/js/jquery-3.4.1.js";
// import { loadStripe } from "@stripe/stripe-js";
class Check_out extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listpro: [],
      post_found_P: true,
      nom: "",
      email: "",
      carte: "",
      phone: "",
      mm: "",
      yy: "",
      cvc: "",
      mc: false,
      m: false,
      livre: [],
    };
    // const Stripe = loadStripe("clé_publique");
  }
  pay = (prix) => {
    var moncash = require("nodejs-moncash-sdk");

    moncash.configure({
      mode: "sandbox", //sandbox or live
      client_id: "BBWKjlBLKMYqRNQ6sYvFo64FtaRLRR5BdHBBSmha49TM",
      client_secret: "BO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHBBSmha49TM",
    });

    var create_payment_json = {
      amount: prix,
      orderId: "123445564454542123",
    };

    var payment_creator = moncash.payment;
    payment_creator.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment_creator.redirect_uri(payment));
      }
    });

    moncash.capture.getByTransactionId(
      "1555945998145",
      function (error, capture) {
        if (error) {
          console.error(error);
        } else {
          console.log(capture);
        }
      },
    );

    moncash.capture.getByOrderId("1555952605", function (error, capture) {
      if (error) {
        console.error(error);
      } else {
        console.log(capture);
      }
    });
  };
  postShowP = (show) => {
    this.setState({
      post_found_P: show,
    });
  };
  moncash = (val) => {
    if (val) this.setState({ mc: true, m: false });
  };
  cartebleu = (val) => {
    if (val) this.setState({ m: true, mc: false });
  };
  mySubmitHandlerCash = (event) => {
    event.preventDefault();
    let phone = this.state.phone;
    const API_PATH_Auteur = this.baseURL+"/php/add-paiement.php";
    const cc = this;

    if (phone === "") {
      alert("Veuillez renseigner tous les champs");
    } else {
      jQuery(".form_control").animate({ opacity: 0.3 }, 3000);
    }
  };
  myChangeHandlerCash = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    if (nam === "phone") {
      if (val === "") {
        alert(nam + " ne peut etre vide");
      } else {
        console.log("fine");
      }
    }
    this.setState({ [nam]: val });
  };

  mySubmitHandlerCarte = (event) => {
    event.preventDefault();
    let nom = this.state.nom;
    let carte = this.state.carte;
    let email = this.state.email;
    let mm = this.state.mm;
    let yy = this.state.yy;
    let cvc = this.state.cvc;

    const API_PATH_Paiement = this.baseURL+"/php/add-paiement.php";
    const cc = this;

    if (
      nom === "" ||
      carte === "" ||
      email === "" ||
      cvc === "" ||
      mm === "" ||
      yy === ""
    ) {
      alert("Veuillez renseigner tous les champs");
    } else {
      jQuery(".form_control").animate({ opacity: 0.3 }, 3000);
      // Stripe.card.createToken(
      //   {
      //     number: carte,
      //     cvc: cvc,
      //     exp_month: mm,
      //     exp_year: yy,
      //   },
      //   function (status, response) {
      //     if (response.error) {
      //       // Ah une erreur !
      //       // On affiche les erreurs
      //       jQuery(".form_control").animate({ opacity: 1 }, 3000);
      //       // On réactive le bouton
      //     } else {
      //       // Le token a bien été créé
      //       var token = response.id; // On récupère le token
      //       // On crée un champs cachée qui contiendra notre token
      //       Axios.post(API_PATH_Paiement, {
      //         cle: token,
      //         id: sessionStorage.getItem("biblioht_id"),
      //         mode: "carte",
      //         email: email,
      //       })
      //         .then(function ({ data }) {
      //           let ad = data.id;
      //           if (data.success === 1) {
      //             alert("Success");
      //           } else {
      //             alert(data.msg);
      //           }
      //         })
      //         .catch(function (error) {
      //           console.log(error);
      //         });
      //     }
      //   },
      // );
    }
  };
  myChangeHandlerCarte = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    if (
      nam === "nom" ||
      nam === "carte" ||
      nam === "mm" ||
      nam === "yy" ||
      nam === "cvc" ||
      nam === "email"
    ) {
      if (val === "") {
        jQuery(".form_control").html(
          '<span className="wrong">' + nam + " ne peut être vide</span>",
        );
      } else {
        jQuery(".wrong").hide();
      }
    }
    this.setState({ [nam]: val });
  };

  payer = (val) => {
    let nom = this.state.nom;
    let carte = this.state.carte;
    let email = this.state.email;
    let mm = this.state.mm;
    let yy = this.state.yy;
    let cvc = this.state.cvc;
    let idLivre = this.state.livre;
    let cle = this.state.cle;

    const API_PATH_Paiement = this.baseURL+"/php/add-paiement.php";
    const cc = this;

    if (
      nom === "" ||
      carte === "" ||
      email === "" ||
      cvc === "" ||
      mm === "" ||
      yy === ""
    ) {
      alert("Veuillez renseigner tous les champs");
    } else {
      jQuery(".form_control").animate({ opacity: 0.3 }, 3000);

      Axios.post(this.baseURL+"/php/payment.php", {
        cle: cle,
        nom: nom,
        px: val * 100,
        email: email,
      })
        .then(function ({ data }) {
          if (data.success === 1) {
            Axios.post(this.baseURL+"/php/acheter.php", {
              id: sessionStorage.getItem("biblioht_id"),
              idLivre: idLivre,
            })
              .then(function ({ data }) {
                if (data.success === 1) {
                  alert("Success");
                } else {
                  alert(data.msg);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            alert(data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  static contextType = AppContext;

  fetchNew = () => {
    const cc = this;
    Axios.post(this.baseURL+"/php/all-panier.php", {
      id: sessionStorage.getItem("biblioht_id"),
    })
      .then(function ({ data }) {
        if (data.success === 1) {
          cc.setState({
            listpro: data.livre.reverse(),
          });
        } else {
          cc.context.postShowP(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchNew();
  }
  render() {
    const contextValue = {
      post_show_P: this.postShowP,
    };
    let tot = 0;
    let panierLivre = this.state.listpro.map(
      ({ idLivre, nomLivre, avoir, prixLivre }, index) => {
        return avoir === "0" ? (
          ((
            <tr>
              <td>{nomLivre}</td>
              <td>{prixLivre + " Gdes"}</td>
            </tr>
          ),
          this.setState({
            livre: idLivre,
          }))
        ) : (
          <div>Aucun produit dans le panier</div>
        );
      },
    );
    let panierArgent = this.state.listpro.map(({ prixLivre }, index) => {
      return prixLivre ? (
        ((tot = Number(tot) + Number(prixLivre)),
        (
          <tbody className="checkout-details">
            <tr>
              <td>Sous-total</td>
              <td>{tot + " Gdes"}</td>
            </tr>
            <tr>
              <td>Taxes</td>
              <td>0 Gdes</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{tot + " Gdes"}</td>
            </tr>
          </tbody>
        ))
      ) : (
        <div>Aucun produit dans le panier</div>
      );
    });

    let showPanier, showMC, showM;
    if (this.state.post_found_P) {
      showPanier = (
        <div className="col-lg-4">
          <div className="order-details-wrap">
            <table className="order-details">
              <thead>
                <tr>
                  <th>Votre liste d'achat</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody className="order-details-body">{panierLivre}</tbody>
              {panierArgent}
            </table>
            <NavLink
              to=""
              className="boxed-btn"
              onClick={() => this.payer(tot)}
            >
              Payer
            </NavLink>
          </div>
        </div>
      );
    } else {
      showPanier = <>Aucun produit a Payer</>;
    }
    if (this.state.mc) {
      showMC = (
        <form
          class="form"
          role="form"
          method="post"
          enctype="multipart/form-data"
          onSubmit={this.mySubmitHandlerCash}
        >
          <div class="form-group">
            <label for="name">Telephone:</label>
            <input
              type="text"
              className="form-control col-lg-4"
              id="name"
              name="phone"
              placeholder="Telephone"
              onChange={this.myChangeHandlerCash}
            />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-success">
              <span class="glyphicon glyphicon-pencil"></span> Ajouter
            </button>
          </div>
        </form>
      );
    } else {
      showMC = <></>;
    }
    if (this.state.m) {
      showM = (
        <div>
          <form
            class="form"
            action="insert.php"
            role="form"
            method="post"
            enctype="multipart/form-data"
            onSubmit={this.mySubmitHandlerCarte}
          >
            <div class="form-group">
              <label for="name">Nom:</label>
              <input
                type="text"
                class="form-control col-lg-4"
                id="name"
                name="nom"
                placeholder="Nom"
                onChange={this.myChangeHandlerCarte}
              />
            </div>
            <div class="form-group">
              <label for="name">Email</label>
              <input
                type="email"
                class="form-control col-lg-4"
                id="name"
                name="email"
                placeholder="Nom"
                onChange={this.myChangeHandlerCarte}
              />
            </div>
            <div class="form-group">
              <label for="name">VOTRE CODE DE CARTE BLEU:</label>
              <input
                type="text"
                class="form-control col-lg-4"
                id="name"
                name="carte"
                placeholder="Votre carte bleu"
                data-stripe="number"
                onChange={this.myChangeHandlerCarte}
              />
            </div>
            <div class="form-group">
              <label for="name">Mois expiration</label>
              <input
                type="text"
                class="form-control col-lg-2"
                id="name"
                name="mm"
                placeholder="MM"
                data-stripe="exp_month"
                onChange={this.myChangeHandlerCarte}
              />
            </div>
            <div class="form-group">
              <label for="name">Annee expiration</label>
              <input
                type="text"
                class="form-control col-lg-2"
                id="name"
                name="yy"
                placeholder="YY"
                data-stripe="exp_year"
              />
            </div>
            <div class="form-group">
              <label for="name">CVC</label>
              <input
                type="text"
                class="form-control col-lg-4"
                id="name"
                name="cvc"
                placeholder="CVC"
                data-stripe="cvc"
                onChange={this.myChangeHandlerCarte}
              />
            </div>
            <br />
            <div class="form-actions">
              <button type="submit" class="btn btn-success">
                <span class="glyphicon glyphicon-pencil"></span> Ajouter
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      showM = <></>;
    }

    return (
      <Provider value={contextValue}>
        <div>
          {/* header  */}
          {/* header  */}
          <Tete />
          {/* <!-- check out section --> */}
          <div className="checkout-section mt-150 mb-150">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="checkout-accordion-wrap">
                    <div className="accordion" id="accordionExample">
                      <div className="card single-accordion">
                        <div className="card-header" id="headingOne">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Adresse d'information
                            </button>
                          </h5>
                        </div>

                        <div
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="billing-address-form">
                              <form className="bill">
                                <p>
                                  <input type="email" placeholder="Email" />
                                </p>
                                <p>
                                  <input type="tel" placeholder="Phone" />
                                </p>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card single-accordion">
                        <div className="card-header" id="headingThree">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              Mode de paiement
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse"
                          aria-labelledby="headingThree"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="card-details">
                              <img
                                src={require("../assets/img/index.jpg")}
                                width="120"
                                height="70"
                                alt="Carte bleue"
                                onClick={() => this.cartebleu(true)}
                              />
                              <img
                                src={require("../assets/img/index.png")}
                                width="120"
                                height="70"
                                alt="Mon cash"
                                onClick={() => this.moncash(true)}
                              />
                            </div>
                            {showM}
                            {showMC}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {showPanier}
              </div>
            </div>
          </div>
          {/* <!-- end check out section --> */}
        </div>
      </Provider>
    );
  }
}

export default Check_out;

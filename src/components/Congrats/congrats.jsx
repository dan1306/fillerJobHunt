import React, { Component } from "react";
import "./Congrats.css";

class Offer extends Component {
  state = {
    offers: null,
    offerAccepted: false,
    id: null,
  };

  async componentDidMount() {
    let getOffers = await fetch(`/api/offer/getOffers/${this.props.huntId}`);
    getOffers = await getOffers.json();

    for (let i = 0; i < getOffers.length; i++) {
      if (getOffers[i]["Accepted"]) {
        await this.setState({
          offers: getOffers[i],
          offerAccepted: true,
          id: getOffers[i]["_id"],
        });
        break;
      }
    }
  }

  declineoffer = async (id) => {
    try {
      const data = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      };

      const fetchResponse = await fetch("/api/offer/declineOffer", data);
      if (fetchResponse.ok) {
        console.log(fetchResponse, "success");
        await this.setState({
          offers: null,
          offerAccepted: false,
        });
      } else {
        console.log(fetchResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="congratsDiv">
        {this.state.offerAccepted["Company"]}
        {this.state.offerAccepted ? (
          <div className="showCongrats">
            <h1 className="text-center"> 🎊Congratultaions🎊 </h1>
            <div className="congratsMessage">
              <p className="text-center">
                {" "}
                You Have Accepted A Job At{" "}
                <span className="bold">{this.state.offers["Company"]}</span> As
                A <span className="bold">{this.state.offers["JobTitle"]}</span>,
                Paying{" "}
                <span className="bold">
                  ${this.state.offers["PayPerYear"]}/Year{" "}
                </span>{" "}
                Starting{" "}
                <span className="bold">{this.state.offers["starDate"]}</span>
              </p>
            </div>

            <div className="text-center">
              <button
                className="btn btn-danger btn-space"
                onClick={() => {
                  this.declineoffer(this.state.id);
                }}
              >
                Decline Offer
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1> No Offer Has been Accepted Yet </h1>
          </>
        )}{" "}
      </div>
    );
  }
}

export default Offer;

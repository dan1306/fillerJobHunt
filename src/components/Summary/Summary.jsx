import React, { Component } from "react";
import "./Summary.css";

class Summary extends Component {
  state = {
    huntSummary: [],
    Interested: 0,
    applied: 0,
    Interviewing: 0,
    acceptedOffer: 0,
    offers: 0,
  };

  async componentDidMount() {
    let accepted = 0;
    let gethuntSummary = await fetch(`/api/summary/${this.props.huntId}`);
    gethuntSummary = await gethuntSummary.json();

    for (let i = 0; i < gethuntSummary["offer"].length; i++) {
      if (gethuntSummary["offer"][i]["Accepted"]) {
        accepted++;
      }
    }
    await this.setState({
      huntSummary: gethuntSummary,
      Interested: gethuntSummary["interested"].length,
      acceptedOffer: accepted,
      applied: gethuntSummary["applied"].length,
      Interviewing: gethuntSummary["interviewing"].length,
      offers: gethuntSummary["offer"].length,
    });
  }

  render() {
    return (
      <div className="App-header summaryGrid">
        <h3 className="summaryHeader"> Hunt Summary </h3>
        <table>
          <tr>
            <td>Shown Interest</td>
            <td>{this.state.Interested}</td>
          </tr>
          <tr>
            <td>Applied</td>
            <td>{this.state.applied}</td>
          </tr>
          <tr>
            <td>Interviewing</td>
            <td>{this.state.Interviewing}</td>
          </tr>
          <tr>
            <td>Offers</td>
            <td>{this.state.offers}</td>
          </tr>
          <tr>
            <td> Accepted Offer</td>
            <td>{this.state.acceptedOffer}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Summary;

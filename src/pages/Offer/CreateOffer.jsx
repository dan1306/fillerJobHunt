import React from "react";
import CreateOffer from "../../components/Offer/CreateOffer";

export default class CreateAnOffer extends React.Component {
  render() {
    return (
      <>
        {" "}
        <CreateOffer huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

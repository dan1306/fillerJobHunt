import React from "react";
import ViewOffers from "../../components/Offer/ViewOffers";

export default class ViewAllOffers extends React.Component {
  render() {
    return (
      <>
        <ViewOffers huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

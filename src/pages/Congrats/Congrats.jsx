import React from "react";
import Congrats from "../../components/Congrats/congrats";

export default class Congratultaions extends React.Component {
  render() {
    return (
      <>
        <Congrats  huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

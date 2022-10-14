import React, { Component } from "react";
import Summary from "../../components/Summary/Summary";

class Summarize extends Component {
  render() {
    return (
      <>
        <Summary huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

export default Summarize;

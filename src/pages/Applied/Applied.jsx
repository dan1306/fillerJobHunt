import React from "react";
import ViewApplied from "../../components/Applied/ViewApplied";

export default class viewApplication extends React.Component {
  render() {
    return (
      <>
        <ViewApplied huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

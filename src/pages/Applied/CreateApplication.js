import React from "react";
import CreateApplied from "../../components/Applied/CreateApplied";

export default class CreateApplication extends React.Component {
  render() {
    return (
      <>
        <CreateApplied huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

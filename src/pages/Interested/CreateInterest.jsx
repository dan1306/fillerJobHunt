import React from "react";
import CreateAnInterest from "../../components/InterestedJobs/CreateInterest";

export default class CreateApplication extends React.Component {
  render() {
    return (
      <>
        <CreateAnInterest huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

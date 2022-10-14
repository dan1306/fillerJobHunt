import React from "react";
import CreateInterview from "../../components/Interviewing/CreateInterview";

export default class CreateAnInterview extends React.Component {
  render() {
    return (
      <>
        <CreateInterview huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

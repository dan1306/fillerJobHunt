import React from "react";
import ViewJobOfInterests from "../../components/InterestedJobs/ViewInterests";

export default class ViewInterests extends React.Component {
  render() {
    return (
      <>
        <ViewJobOfInterests huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

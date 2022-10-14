import React from "react";
import ViewInterviews from "../../components/Interviewing/ViewInterviews";

export default class ViewAllInterviews extends React.Component {
  render() {
    return (
      <>
        <ViewInterviews huntId={this.props.huntId} userId={this.props.userId} />
      </>
    );
  }
}

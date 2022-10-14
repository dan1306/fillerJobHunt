import React from "react";
import CreateAJobHunt from "../../components/JobHunt/CreateHunt";

export default class viewApplication extends React.Component {
  render() {
    return (
      <>
        <CreateAJobHunt userId={this.props.userId} />
      </>
    );
  }
}

import React from "react";
import ViewJobHunt from "../../components/JobHunt/ViewHunts";

export default class viewHunts extends React.Component {
  render() {
    return (
      <>
        <ViewJobHunt
          handleChosenHunt={this.props.handleChosenHunt}
          userId={this.props.userId}
        />
      </>
    );
  }
}

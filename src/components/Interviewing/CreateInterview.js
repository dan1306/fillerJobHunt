import React, { Component } from "react";
import "./Interviewing.css";
import { Link } from "react-router-dom";

class CreateInterview extends Component {
  state = {
    Company: "",
    JobTitle: "",
    RoundOfInterview: "",
    InterviewDate: "",
    userId: this.props.userId,
    error: "",
    classColor: "",
    submitted: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const data = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Company: this.state.Company,
          JobTitle: this.state.JobTitle,
          RoundOfInterview: this.state.RoundOfInterview,
          InterviewDate: this.state.InterviewDate,
          userId: this.state.userId,
          id: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch("/api/interviewing/create", data);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
        await this.setState({
          error: `Fields can't be empty`,
          classColor: "error-message",
        });
      } else {
        console.log(fetchResponse);
        await this.setState({
          error: `Interview Added`,
          classColor: "sucess-message",
          submitted: true,
        });
      }
    } catch (err) {
      console.log( err);
    }
  };

  render() {
    return (
      <div className="pad">
        <div className="interviewDiv">
          <h1 className="text-center"> Create An Interview </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group spaceOut">
              <label>Company Name: </label>
              <input
                type="text"
                className="form-control"
                name="Company"
                value={this.state.Company}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group spaceOut">
              <label>Job Title:</label>
              <input
                type="text"
                className="form-control"
                name="JobTitle"
                value={this.state.JobTitle}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group spaceOut">
              <label>Round Of Interview:</label>
              <input
                type="text"
                className="form-control"
                name="RoundOfInterview"
                value={this.state.RoundOfInterview}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group spaceOut">
              <label>Interview Date:</label>
              <input
                type="date"
                className="form-control"
                name="InterviewDate"
                value={this.state.InterviewDate}
                onChange={this.handleChange}
                required
              />
            </div>
            {this.state.submitted ? (
              <div className="spaceOut">
                <Link to="/viewInterviews">
                  <button className="btn btn-success ">
                    Return To Interest List
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <button type="submit" class="btn btn-primary spaceOut">
                  Submit
                </button>
                <Link to="/viewInterviews">
                  <button class="btn btn-danger spaceOut">
                    Return To Inrerview List
                  </button>
                </Link>
              </div>
            )}
          </form>
          <div className="spaceout text-center">
            <h2 className={this.state.classColor}>&nbsp;{this.state.error}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInterview;

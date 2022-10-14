import React, { Component } from "react";
import "./Interviewing.css";

class Interviewing extends Component {
  state = {
    interviewing: [],
    editId: null,
    RoundOfInterview: "",
    InterviewDate: "",
    editIntState: null,
    error: "",
    classColor: "",
  };

  async componentDidMount() {
    let getInterviews = await fetch(
      `/api/interviewing/getInterviews/${this.props.huntId}`
    );
    getInterviews = await getInterviews.json();
    this.setState({ interviewing: getInterviews });
    console.log(this.state);
  }

  handleEdit = async (n) => {
    await this.setState({
      editId: this.state.interviewing[n]["_id"],
      RoundOfInterview: this.state.interviewing[n]["RoundOfInterview"],
      InterviewDate: this.state.interviewing[n]["InterviewDate"],
      editIntState: n,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.RoundOfInterview || !this.state.InterviewDate) {
      await this.setState({
        error: `Fields can't be empty`,
        classColor: "error-message",
      });
    }
    try {
      const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.editId,
          RoundOfInterview: this.state.RoundOfInterview,
          InterviewDate: this.state.InterviewDate,
        }),
      };

      const fetchResponse = await fetch("api/interviewing/edit", data);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
      } else {
        console.log(fetchResponse);
        let newArr = this.state.interviewing;
        newArr[this.state.editIntState]["InterviewDate"] =
          this.state.InterviewDate;
        newArr[this.state.editIntState]["RoundOfInterview"] =
          this.state.RoundOfInterview;
        await this.setState({
          editId: null,
          interviewing: newArr,
          classColor: null,
          error: "",
        });
      }
    } catch (err) {
      console.log("Create Interest error", err);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleDelete = async (n) => {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.interviewing[n]["_id"],
          huntId: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch("/api/interviewing/delete", options);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
      } else {
        console.log(fetchResponse);
        let newInterestArr = this.state.interviewing;
        newInterestArr.splice(n, 1);
        await this.setState({ interviewing: newInterestArr });
      }
    } catch (err) {
      console.log(err);
    }
  };

  back = async () => {
    this.setState({ editId: null, error: null });
  };

  render() {
    return (
      <>
        {this.state.editId ? (
          <div className="interviewDiv">
            <form>
              <div className="form-group spaceOut">
                <label>Round Of Interview: </label>
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
                <label>Interview Date </label>
                <input
                  type="date"
                  className="form-control"
                  name="InterviewDate"
                  value={this.state.InterviewDate}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                class="btn btn-primary spaceOut"
              >
                Submit
              </button>
              <button onClick={this.back} class="btn btn-danger spaceOut">
                Back To Interview List
              </button>
            </form>
            <div className="spaceout text-center">
              <h2 className={this.state.classColor}>
                &nbsp;{this.state.error}
              </h2>
            </div>
          </div>
        ) : (
          <>
            {this.state.interviewing.length > 0 ? (
              <div className="intervContainer">
                {this.state.interviewing.map((val, id) => {
                  return (
                    <div className="interDiv">
                      <h2>Company: {val.Company}</h2>

                      <h3>Job Title: {val.JobTitle}</h3>
                      <br />

                      <p>Interview Round: {val.RoundOfInterview}</p>

                      <p>Interview Date: {val.InterviewDate}</p>
                      <div className="moveRight">
                        <button
                          onClick={() => {
                            this.handleEdit(id);
                          }}
                          type="submit"
                          class="btn btn-primary spaceOut"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            this.handleDelete(id);
                          }}
                          type="submit"
                          class="btn btn-danger spaceOut"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="noInterviews">
                <h1>No Interviews To Show</h1>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default Interviewing;

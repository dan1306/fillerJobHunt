import React, { Component } from "react";
import "./JobHunt.css";
import { Link } from "react-router-dom";

class CreateHunt extends Component {
  state = {
    HuntName: "",
    userId: this.props.userId,
    classColor: "",
    error: "",
    submitted: false,
  };

  componentDidMount() {
    this.setState({ submitted: false });
  }

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
          HuntName: this.state.HuntName,
          userId: this.state.userId,
        }),
      };

      const fetchResponse = await fetch("/api/hunt/create", data);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
        await this.setState({
          error: "Check Input And Submit Again",
          classColor: "error-message",
        });
      } else {
        await this.setState({
          submitted: true,
          error: "Job Hunt Created",
          classColor: "sucess-message",
        });
        console.log(fetchResponse);
      }
    } catch (err) {
      console.log( err);
    }
  };

  render() {
    return (
      <div className="createDiv">
        <h1 className="text-center">Create A Job Hunt</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group spaceOut">
            <label>Give A Title to Your Hunt: </label>
            <input
              type="text"
              className="form-control"
              name="HuntName"
              value={this.state.HuntName}
              onChange={this.handleChange}
              required
            />
          </div>
          {
            <>
              {this.state.submitted ? (
                <div className="spaceOut">
                  <Link to="/viewHunts">
                    <button className="btn btn-success ">
                      Return To Job Hunt List
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <button type="submit" class="btn btn-primary spaceOut">
                    Submit
                  </button>
                  <Link to="/viewHunts">
                    <button className="btn btn-danger spaceOut">
                      Return To Hunt List
                    </button>
                  </Link>
                </>
              )}
            </>
          }
        </form>
        <div className="spaceout text-center">
          <h2 className={this.state.classColor}>&nbsp;{this.state.error}</h2>
        </div>
      </div>
    );
  }
}

export default CreateHunt;

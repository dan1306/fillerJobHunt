import React, { Component } from "react";
import "./JobHunt.css";

class VieweHunts extends Component {
  state = {
    huntList: [],
    userId: this.props.userId,
  };

  async componentDidMount() {
    try {
      let jwt = localStorage.getItem("token");
      console.log(jwt);

      let getHunts = await fetch("/api/hunt/gethunt", {
        headers: { Authorization: "Bearer " + jwt },
      });
      console.log(getHunts);
      getHunts = await getHunts.json();
      this.setState({ huntList: getHunts });
    } catch (err) {
      console.log(err);
    }
  }

  chosenHunt = async (n) => {
    let selId = this.state.huntList[n]._id;

    this.props.handleChosenHunt(selId);
  };

  handleDelete = async (n) => {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          huntId: this.state.huntList[n]["_id"],
        }),
      };

      const fetchResponse = await fetch("/api/hunt/deleteAll", options);

      if (!fetchResponse.ok) {
        console.log(fetchResponse);
      } else {
        console.log(fetchResponse);
        let newArr = this.state.huntList;
        newArr.splice(n, 1);
        await this.setState({ huntList: newArr });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        {this.state.huntList.length > 0 ? (
          <div className="padHuntDiv">
            {this.state.huntList.map((val, id) => {
              return (
                <div className="huntDiv">
                  <div>
                    <h3>Hunt Title: {val.HuntName}</h3>
                    <p>
                      Created On: {new Date(val.createdAt).toLocaleDateString()}{" "}
                    </p>
                  </div>
                  <div className="spaceTop">
                    <button
                      onClick={() => {
                        this.chosenHunt(id);
                      }}
                      class="btn btn-primary"
                    >
                      Choose
                    </button>

                    <button
                      onClick={() => {
                        this.handleDelete(id);
                      }}
                      class="btn btn-danger spaceBtn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="noHunts">
            <h1>No Job Hunt's To Show</h1>
          </div>
        )}
      </>
    );
  }
}

export default VieweHunts;

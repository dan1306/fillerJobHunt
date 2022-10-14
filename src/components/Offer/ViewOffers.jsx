import React, { Component } from "react";
import "./Offer.css";

class Offer extends Component {
  state = {
    Company: "",
    JobTitle: "",
    offers: [],
    editId: null,
    starDate: "",
    PayPerYear: "",
    editIntState: null,
    offerExpires: null,
    error: "",
    classColor: "",
    acceptedOffer: false,
    offerAcc: null,
  };

  async componentDidMount() {
    let getOffers = await fetch(`/api/offer/getOffers/${this.props.huntId}`);
    getOffers = await getOffers.json();
    getOffers.sort((a, b) => {
      return a.PayPerYear - b.PayPerYear;
    });
    await this.setState({ offers: getOffers, error: "" });
    console.log(this.state);

    for (let i = 0; i < this.state.offers.length; i++) {
      if (this.state.offers[i]["Accepted"]) {
        await this.setState({
          acceptedOffer: true,
          offerAcc: "An Offer Has Been Accepted",
        });
        break;
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleEdit = async (n) => {
    await this.setState({
      Company: this.state.offers[n]["Company"],
      JobTitle: this.state.offers[n]["JobTitle"],
      editId: this.state.offers[n]["_id"],
      starDate: this.state.offers[n]["starDate"],
      PayPerYear: this.state.offers[n]["PayPerYear"],
      offerExpires: this.state.offers[n]["offerExpires"],
      editIntState: n,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isNaN(this.state.starDate) ||
      !this.state.PayPerYear ||
      !this.state.offerExpires
    ) {
      await this.setState({
        error: `Fields can't be empty`,
        classColor: "error-message",
      });
    } else {
      try {
        const data = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.editId,
            starDate: this.state.starDate,
            PayPerYear: Number(this.state.PayPerYear),
            offerExpires: this.state.offerExpires,
          }),
        };

        const fetchResponse = await fetch("api/offer/edit", data);
        if (!fetchResponse.ok) {
          console.log(fetchResponse);
        } else {
          console.log(fetchResponse);
          let newArr = this.state.offers;
          newArr[this.state.editIntState]["starDate"] = this.state.starDate;
          newArr[this.state.editIntState]["PayPerYear"] = this.state.PayPerYear;
          newArr[this.state.editIntState]["offerExpires"] =
            this.state.offerExpires;
          newArr.sort((a, b) => {
            return a.PayPerYear - b.PayPerYear;
          });
          await this.setState({
            editId: null,
            offers: newArr,
            classColor: null,
            error: "",
          });
        }
      } catch (err) {
        console.log("Create Interest error", err);
      }
    }
  };

  acceptedOffer = async (n) => {
    console.log(this.state.offers[n]["_id"]);
    try {
      const data = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.offers[n]["_id"],
        }),
      };

      const fetchResponse = await fetch("api/offer/acceptOffer", data);

      if (fetchResponse.ok) {
        console.log(fetchResponse);
        let newArr = this.state.offers;
        newArr[n]["Accepted"] = true;
        newArr.sort((a, b) => {
          return a.PayPerYear - b.PayPerYear;
        });
        await this.setState({
          offers: newArr,
          acceptedOffer: true,
          offerAcc: "An Offer Has Been Accepted",
        });
      } else {
        console.log(fetchResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleDelete = async (n) => {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.offers[n]["_id"],
          huntId: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch("/api/offer/delete", options);
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
      } else {
        console.log(fetchResponse);
        let newOfferArr = this.state.offers;
        if (newOfferArr[n]["Accepted"]) {
          await this.setState({ acceptedOffer: false, offerAcc: null });
        }
        newOfferArr.splice(n, 1);
        await this.setState({ offers: newOfferArr });
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
            <h2 className="text-center">
              {this.state.Company}: {this.state.JobTitle}
            </h2>
            <form>
              <div className="form-group spaceOut">
                <label>Pay Per Year: </label>
                <input
                  type="number"
                  className="form-control"
                  name="PayPerYear"
                  value={this.state.PayPerYear}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group spaceOut">
                <label>Start Date: </label>
                <input
                  type="date"
                  className="form-control"
                  name="starDate"
                  value={this.state.starDate}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group spaceOut">
                <label>offer Expires: </label>
                <input
                  type="date"
                  className="form-control"
                  name="offerExpires"
                  value={this.state.offerExpires}
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
              <button
                onClick={this.back}
                class="btn btn-danger spaceOut"
              >
                Back To Offer List
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
            {this.state.offers.length > 0 ? (
              <div className="offerContainer">
                <h2 className="text-center accOffer"> {this.state.offerAcc}</h2>

                {this.state.offers.map((val, id) => {
                  return (
                    <div className="offerDiv">
                      <h1>
                        {val.JobTitle} At {val.Company}{" "}
                      </h1>
                      <br />
                      <h3>${val.PayPerYear} / Year</h3>
                      <br />
                      <p>Start Date: {val.starDate}</p>
                      <p>offer Expires On: {val.offerExpires}</p>

                      <div className="moveRight">
                        <>
                          {!this.state.acceptedOffer ? (
                            <button
                              onClick={() => {
                                this.acceptedOffer(id);
                              }}
                              type="submit"
                              class="btn btn-success spaceOut"
                            >
                              Accept
                            </button>
                          ) : (
                            <></>
                          )}
                        </>

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
              <div className="noOffers">
                <h1>No Offers To Show</h1>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default Offer;

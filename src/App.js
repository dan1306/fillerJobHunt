import "./App.css";
import React, { Component } from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import Summary from "./pages/Summary/Summary";
import Applied from "./pages/Applied/Applied";
import CreateApplication from "./pages/Applied/CreateApplication";
import Accepted from "./pages/Accepted/Accepted";
import Offer from "./pages/Offer/Offer";
import InterviewQuestions from "./pages/InterviewQuestions/InterviewQuestions";
import ViewInterests from "./pages/Interested/ViewInterests";
import CreateInterest from "./pages/Interested/CreateInterest";
import CreateOffer from "./pages/Offer/CreateOffer";
import VieweHunts from "./pages/Hunt/ViewHunts";
import CreateHunt from "./pages/Hunt/CreateHunt";
import CreateInterview from "./pages/Interviewing/CreateInterview";
import ViewInterviews from "./pages/Interviewing/ViewInterviews";
import Congrats from "./pages/Congrats/Congrats";

class App extends Component {
  state = {
    user: null,
    showLogin: true,
    huntChosen: false,
    huntId: null,
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
      } else {
        let user = payload.user;
        this.setState({ user });
      }
    }
  };

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData });
  };

  logout = async () => {
    await this.setState({ showLogin: true });
    await this.setState({ loggedIn: false });
    await this.setState({ huntChosen: false });
    await this.setState({ huntId: null });

    localStorage.removeItem("token");
    let user = null;
    this.setState({ user });
  };

  Signup = async () => {
    await this.setState({ showLogin: false });
  };

  LogIn = async () => {
    await this.setState({ showLogin: true });
  };

  handleChosenHunt = async (id) => {
    await this.setState({ huntId: id });
    await this.setState({ huntChosen: true });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          userState={this.state.user}
          logout={this.logout}
          Signup={this.Signup}
          LogIn={this.LogIn}
          huntChosen={this.state.huntChosen}
        />

        {this.state.user ? (
          <>
            {this.state.huntChosen ? (
              <Routes>
                <Route
                  path="/summary"
                  element={
                    <Summary
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />
                <Route
                  path="/viewInterests"
                  element={
                    <ViewInterests
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />
                <Route
                  path="/createInterest"
                  element={
                    <CreateInterest
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />
                <Route
                  path="/viewApplications"
                  element={
                    <Applied
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />
                <Route
                  path="/createApplication"
                  element={
                    <CreateApplication
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />
                <Route
                  path="/createInterview"
                  element={
                    <CreateInterview
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />
                <Route
                  path="/viewInterviews"
                  element={
                    <ViewInterviews
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />

                <Route path="/accepted" element={<Accepted />} />
                <Route
                  path="/viewOffers"
                  element={
                    <Offer
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />
                <Route
                  path="/CreateOffer"
                  element={
                    <CreateOffer
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />

                <Route
                  path="/Congrats"
                  element={
                    <Congrats
                      userId={this.state.user._id}
                      huntId={this.state.huntId}
                    />
                  }
                />

                <Route
                  path="/interviewQuestions"
                  element={<InterviewQuestions />}
                />

                <Route path="*" element={<Navigate to="/summary" replace />} />
              </Routes>
            ) : (
              <Routes>
                <Route
                  path="/viewHunts"
                  element={
                    <VieweHunts
                      userId={this.state.user._id}
                      handleChosenHunt={this.handleChosenHunt}
                    />
                  }
                />
                <Route
                  path="/createHunt"
                  element={<CreateHunt userId={this.state.user._id} />}
                />

                <Route
                  path="*"
                  element={<Navigate to="/viewHunts" replace />}
                />
              </Routes>
            )}
          </>
        ) : (
          <AuthPage
            showLogin={this.state.showLogin}
            setUserInState={this.setUserInState}
          />
        )}
      </div>
    );
  }
}

export default App;

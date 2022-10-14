import { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    const { userState, logout, Signup, LogIn, huntChosen } = this.props;
    return (
      <Navbar className="nav-color" expand="lg">
        <Container>
          <Navbar.Brand href="">Job Hunt</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userState ? (
              <>
                {huntChosen ? (
                  <Nav className="me-auto">
                    <NavDropdown title="Job Interests" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/viewInterests" className="rm-underline">
                          View Interests
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to="/createInterest" className="rm-underline">
                          Create Interest
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Applied" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/viewApplications" className="rm-underline">
                          View Applications
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to="/createApplication" className="rm-underline">
                          Create Application
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Interviewing" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/viewInterviews" className="rm-underline">
                          View Interviwing
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to="/createInterview" className="rm-underline">
                          Create An Interviewing
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Job Offers" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/viewOffers" className="rm-underline">
                          View Offers
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to="/createOffer" className="rm-underline">
                          Create An Offer
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Congrats" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/Congrats" className="rm-underline">
                          Accepted Offer
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to="/summary" className="rm-underline">
                          Summary
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link
                      href="#home"
                      onClick={async () => {
                        logout();
                      }}
                    >
                      LogOut
                    </Nav.Link>
                  </Nav>
                ) : (
                  <Nav className="me-auto">
                    <NavDropdown title="Hunt" id="basic-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to="/viewHunts" className="rm-underline">
                          View Hunts
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to="/createHunt" className="rm-underline">
                          Create Hunt
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link
                      onClick={async () => {
                        logout();
                      }}
                    >
                      LogOut
                    </Nav.Link>
                  </Nav>
                )}
              </>
            ) : (
              <Nav className="me-auto">
                <Nav.Link
                  onClick={async () => {
                    Signup();
                  }}
                >
                  Signup
                </Nav.Link>
                <Nav.Link
                  onClick={async () => {
                    LogIn();
                  }}
                >
                  LogIn
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./Interest.css";
import { Link } from "react-router-dom";

class ViewInterests extends Component {
  state = {
    interestedJobs: [],
    editId: null,
    editJobDesc: "",
    jobTtile: "",
    viewInterest: null,
    editIntState: null,
    error: "",
    classColor: "",
  };

  editor = null;

  async componentDidMount() {
    let getInterest = await fetch(
      `/api/interested/getInterests/${this.props.huntId}`
    );

    getInterest = await getInterest.json();
    await this.setState({ interestedJobs: getInterest, editId: null });
  }

  handleDelete = async (n) => {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.interestedJobs[n]["_id"],
          huntId: this.props.huntId,
        }),
      };

      const fetchResponse = await fetch(
        "/api/interested/deleteInterest",
        options
      );
      if (!fetchResponse.ok) {
        console.log(fetchResponse);
      } else {
        console.log(fetchResponse);
        let newInterestArr = this.state.interestedJobs;
        newInterestArr.splice(n, 1);
        await this.setState({ interestedJobs: newInterestArr });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleEdit = async (n) => {
    await this.setState({
      editId: this.state.interestedJobs[n]["_id"],
      editJobDesc: this.state.interestedJobs[n]["JobDescription"],
      jobTtile: this.state.interestedJobs[n]["JobTitle"],
      editIntState: n,
    });
  };

  descChange = (e, editor) => {
    this.setState({ editJobDesc: editor.getData() });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.editJobDesc) {
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
            JobDescription: this.state.editJobDesc,
          }),
        };

        const fetchResponse = await fetch("/api/interested/editJobDesc", data);
        if (!fetchResponse.ok) {
          console.log(fetchResponse);
        } else {
          console.log(fetchResponse);
          let newArr = this.state.interestedJobs;
          newArr[this.state.editIntState]["JobDescription"] =
            this.state.editJobDesc;
          await this.setState({
            editId: null,
            interestedJobs: newArr,
            error: "",
            classColor: null,
          });
        }
      } catch (err) {
        console.log("Create Interest error", err);
      }
    }
  };

  handleView = async (n) => {
    if (!this.state.viewInterest) {
      this.setState({ viewInterest: this.state.interestedJobs[n] });
    } else {
      this.setState({ viewInterest: null });
    }
  };

  back = async () => {
    this.setState({ editId: null, error: null });
  };

  render() {
    return (
      <>
        {this.state.editId ? (
          <div className="ckBorder">
            <h1 className="job-title">{this.state.jobTtile}</h1>

            <form>
              <div className="form-group spaceOut">
                <label>Job Description: </label>
                <div className="editor">
                  <CKEditor
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);

                      // Insert the toolbar before the editable area.
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        );

                      this.editor = editor;
                    }}
                    onError={(error, { willEditorRestart }) => {
                      // If the editor is restarted, the toolbar element will be created once again.
                      // The `onReady` callback will be called again and the new toolbar will be added.
                      // This is why you need to remove the older toolbar.
                      if (willEditorRestart) {
                        this.editor.ui.view.toolbar.element.remove();
                      }
                    }}
                    onChange={this.descChange}
                    editor={DecoupledEditor}
                    data={this.state.editJobDesc}
                    config={
                      {
                        /* the editor configuration */
                      }
                    }
                  />
                </div>
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                class="btn btn-primary spaceOut"
              >
                Submit
              </button>
              <Link to="/viewInterests">
                <button onClick={this.back} className="btn btn-danger spaceOut">
                  Return To Interest List
                </button>
              </Link>
            </form>
            <div className="spaceout text-center">
              <h2 className={this.state.classColor}>
                &nbsp;{this.state.error}
              </h2>
            </div>
          </div>
        ) : (
          <div>
            {
              <>
                {!this.state.viewInterest ? (
                  <>
                    {this.state.interestedJobs.length > 0 ? (
                      <div className="intContainer row ">
                        {this.state.interestedJobs.map((val, id) => {
                          return (
                            <div className="interestdivs col-lg-4 col-md-6 col-sm-12">
                              <h1 className="text-center">{val.JobTitle}</h1>
                              <div className="text-center">
                                <p>
                                  Created On:{" "}
                                  {new Date(val.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-center">
                                <button
                                  className="btn btn-danger spaceout  btn-space"
                                  onClick={() => {
                                    this.handleDelete(id);
                                  }}
                                >
                                  Delete
                                </button>

                                <button
                                  className="btn btn-primary spaceout  btn-space"
                                  onClick={() => {
                                    this.handleEdit(id);
                                  }}
                                >
                                  Edit
                                </button>

                                <button
                                  className="btn btn-success btn-space"
                                  onClick={() => {
                                    this.handleView(id);
                                  }}
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="noInterest">
                        <h1> No Job Interests To Show</h1>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="pad">
                    <div className="viewJobInterest ">
                      <h1 className="job-title">
                        {this.state.viewInterest.JobTitle}
                      </h1>

                      <div className="jobDesc">
                        {ReactHtmlParser(
                          this.state.viewInterest.JobDescription
                        )}
                      </div>
                      <div className="text-center">
                        <button
                          className="btn btn-success spaceout"
                          onClick={() => {
                            this.handleView();
                          }}
                        >
                          Return To Interest List
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            }
          </div>
        )}
      </>
    );
  }
}

export default ViewInterests;
